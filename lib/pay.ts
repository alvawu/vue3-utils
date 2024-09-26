import Env from './env'
import Exception from './exception'
import StringUtil from './string-util'
import Util from './util'
import type { Router } from 'vue-router'
import type { PayOptions, RouteInfo } from '../@types'

/**
 * 微信支付
 */
class Pay {
    private static __instance: Pay | null = null

    private constructor() {}

    /**
     * 单例模式
     */
    public static instance() {
        if (Pay.__instance === null) {
            Pay.__instance = new Pay()
        }
        return Pay.__instance
    }

    /**
     * 获取路由信息
     * @param router vue router对象
     * @param name 路由名称
     * @returns 
     */
    public getRoute(router: Router, name: string) {
        return router.getRoutes().filter((route) => {
            if (route.name === name) {
                return route
            }
        })
    }

    /**
     * 发起支付
     * @param router vue router对象
     * @param options 支付配置
     */
    public invoke(router: Router, options: PayOptions) {
        if (typeof options.paramMap === 'undefined') {
            throw new Exception('请传入paramMap并确保正确')
        }
        if (typeof options.successRoute === 'undefined') {
            throw new Exception('请传入successRoute并确保正确')
        }
        if (typeof options.failRoute === 'undefined') {
            throw new Exception('请传入failRoute并确保正确')
        }
        const paramMap = options.paramMap
        const successRoute = this.getRoute(router, options.successRoute.name)[0]
        let successPath = ''
        const failRoute = this.getRoute(router, options.failRoute.name)[0]
        let failPath = ''
        successPath = successRoute.path
        if (typeof options.successRoute.params !== 'undefined') {
            for (const key in options.successRoute.params) {
                if (Object.prototype.hasOwnProperty.call(options.successRoute.params, key)) {
                    successPath = successPath.replace(new RegExp(':' + key, 'g'), options.successRoute.params[key])
                }
            }
        }

        if (typeof options.successRoute.query !== 'undefined') {
            const query:string[] = []
            for (const key in options.successRoute.query) {
                if (Object.prototype.hasOwnProperty.call(options.successRoute.query, key)) {
                    query.push(key + '=' + options.successRoute.query[key])
                }
            }
            successPath += '?' + query.join('&')
        }

        failPath = failRoute.path
        if (typeof options.failRoute.params !== 'undefined') {
            for (const key in options.failRoute.params) {
                if (Object.prototype.hasOwnProperty.call(options.failRoute.params, key)) {
                    failPath = failPath.replace(new RegExp(':' + key, 'g'), options.failRoute.params[key])
                }
            }
        }

        if (typeof options.failRoute.query !== 'undefined') {
            const query:string[] = []
            for (const key in options.failRoute.query) {
                if (Object.prototype.hasOwnProperty.call(options.failRoute.query, key)) {
                    query.push(key + '=' + options.failRoute.query[key])
                }
            }
            failPath += '?' + query.join('&')
        }

        const payParams = encodeURIComponent(paramMap)
        let backUrl = Util.currentUrl()
        backUrl = Util.delQueStr(backUrl, 'code') // 剔除code参数
        backUrl = Util.delQueStr(backUrl, 'state') // 剔除state参数
        backUrl = Util.delQueStr(backUrl, 'no_loading') // 剔除no_loadingno_loading参数
        while (StringUtil.endWith(backUrl, '/')) {
            backUrl = backUrl.substring(0, backUrl.length - 1)
        }

        const payLink =
            Env.get('PAY_GATEWAY') + '?params=' + payParams + '&successUrl=' + encodeURIComponent(backUrl + '/#' + successPath) + '&failUrl=' + encodeURIComponent(backUrl + '/#' + failPath)
        // console.log(payLink)
        location.href = payLink
    }
}
export default Pay
