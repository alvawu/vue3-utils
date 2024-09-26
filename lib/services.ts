import axios from 'axios'
import type { AxiosError, AxiosRequestConfig } from 'axios'
import Cookie from 'js-cookie'
import Cache from './cache'
import Exception from './exception'
import type { ServicesOptions } from '../@types'
import fileDownload from 'js-file-download'
import merge from 'merge'
import md5 from 'md5'
import parser from 'content-disposition-parser'
import Env from './env'

axios.interceptors.request.use(function (config) {
    const tokenName = Env.get('TOKEN_NAME', 'token') as string
    const csrfToken = Cookie.get('XSRF-TOKEN')
    if (csrfToken) {
        config.headers['X-XSRF-TOKEN'] = csrfToken
    }

    const token = Cache.get('token')
    if (token) {
        config.headers[tokenName] = token
    }
    return config
})

class Services {
    /**
     * 正常的status返回值(Mobile)
     */
    static NORMAL_STATUS = 200
    /**
     * 正常的status返回值(PC)
     */
    static WEB_NORMAL_STATUS = 1

    private basicSettings = {
        headers: {},
        HTTPExceptionRegisted: false,
        HTTPExceptionHandler: (e: AxiosError): boolean => {
            return false
        },

        beforeRequestHandler: (settings: AxiosRequestConfig) => {}
    }

    /**
     * 设置基础配置
     * @param type 配置标识
     * @param value 配置值
     */
    setBasicSetting(type: string, value: any) {
        switch (type) {
            case 'headers':
                this.basicSettings.headers = value
                break

            case 'beforeRequestHandler':
                this.basicSettings.beforeRequestHandler = value
                break

            case 'httpExceptionHandler':
                this.basicSettings.HTTPExceptionRegisted = true
                this.basicSettings.HTTPExceptionHandler = value
                break

            default:
                break
        }
    }

    // /**
    //  * http 异常处理
    //  * @param error
    //  */
    // private HTTPExceptionHandler: Function = (error?: AxiosError) => {
    //     return false
    // }

    // /**
    //  * http 异常处理注册
    //  */
    // HTTPExceptionRegisted: boolean = false
    // registerHTTPExceptionHandler(handler: Function) {
    //     this.HTTPExceptionRegisted = true
    //     this.HTTPExceptionHandler = handler
    // }

    /**
     * 执行调用
     * @param options
     */
    invoke(options: ServicesOptions) {
        const url = options.url
        const data = options.data
        const type = options.type ?? 'post'
        const service = options.service ?? ''
        const resType = options.resType ?? 'json'
        const headers = options.headers ?? {}
        const cache = typeof options.cache === 'undefined' ? false : options.cache
        const basicHeaders = JSON.parse(JSON.stringify(this.basicSettings.headers))

        const settings: AxiosRequestConfig = {}
        settings.url = url.indexOf('/') === 0 ? url : 'services/' + url
        settings.method = type.toLowerCase()
        settings.params = {}
        settings.headers = merge.recursive(basicHeaders, headers)
        settings.responseType = resType

        if (typeof settings.headers !== 'undefined') {
            if (typeof settings.headers?.['Content-Type'] === 'undefined') {
                settings.headers['Content-Type'] = 'application/json; charset=UTF-8'
            }

            if (service) {
                settings.headers.service = service
            }
        }

        if (data) {
            if (settings.method === 'post') {
                settings.data = data
            } else {
                settings.params = data
            }
        } else {
            if (settings.method === 'post') {
                settings.data = {}
            }
        }

        return new Promise((resolve, reject) => {
            try {
                const cacheKey = 'axios_' + md5([settings.url, settings.method, JSON.stringify(settings.data), JSON.stringify(settings.params)].join('-'))
                const body = Cache.get(cacheKey)
                if (cache !== false && body) {
                    resolve(body)
                }
                this.basicSettings.beforeRequestHandler(settings)
                axios(settings)
                    .then((ret) => {
                        if (ret.headers['content-type'].indexOf('json') !== -1) {
                            const resBody = ret.data
                            if (cache && (resBody.status === Services.NORMAL_STATUS || resBody.status === Services.WEB_NORMAL_STATUS)) {
                                Cache.set(cacheKey, resBody, cache)
                            } else if (resBody.status === 403 || resBody.status === 402) {
                                Cache.remove('token')
                            }
                            resolve(resBody)
                        } else {
                            const parsed:any = parser(ret.headers['content-disposition'])
                            let fileName = parsed.filename || '未命名文件'
                            if (fileName.indexOf('%') === 0) {
                                fileName = decodeURIComponent(fileName)
                            }
                            fileDownload(ret.data, fileName)
                            resolve(true)
                        }
                        
                    })
                    .catch((e: AxiosError) => {
                        if (e.response?.status) {
                            if (this.basicSettings.HTTPExceptionRegisted && !this.basicSettings.HTTPExceptionHandler(e)) {
                                reject(new Exception('HTTP Error: ' + e.message, e.response?.status + 1000))
                            }
                        } else {
                            reject(new Exception(e.message, -1))
                        }
                    })
            } catch (e) {
                reject(new Exception('axios未知错误' + JSON.stringify(e)))
            }
        })
    }
}

export { Services }
