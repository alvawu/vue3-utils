import parse from 'url-parse'
import type { Services } from './services'
import type { DeviceResolution, MyTreeNode, StringOrNumber, WeixinBridgeObject } from '../@types'
import xss from 'xss'
import type { IFilterXSSOptions } from 'xss'
// import sortBy from 'lodash/sortBy'
import rfdc from 'rfdc'
import Env from './env'
import Exception from './exception'

const myWindow = window as any
const clone = rfdc()

/**
 * 一个实用工具集对象，也是实用频率最高的一个API。使用前，需要import。
 */
class Util {
    /**
     * 检查函数或对象是否undefined，直到不undefined才返回
     * @params function cb 检查方法
     * @params Number intv 检查间隔（毫秒）
     * @params Number maxTimes 最大检查次数
     */
    untill(cb: Function, intv = 10, maxTimes = 100) {
        return new Promise((resolve, reject) => {
            let times = 0
            const checker = (cb: Function) => {
                times++
                if (typeof cb() === 'undefined') {
                    if (times <= maxTimes) {
                        setTimeout(() => {
                            checker(cb)
                        }, intv)
                    } else {
                        reject(false)
                    }
                } else {
                    resolve(true)
                }
            }
            checker(cb)
        })
    }

    /**
     * @description 是否微信客户端(排除企业微信客户端)
     * @returns 
     */
    isWeixinClient = function () {
        let ua = navigator.userAgent.toLowerCase()
        return (ua.indexOf('micromessenger') !== -1 && ua.indexOf('wxwork') === -1)
    }

    /**
     * @description 设置页面title
     * @param {String} title title内容
     */
    setTitle(title: string) {
        document.title = title
    }

    /**
     * 克隆对象
     * @param obj 需要克隆的对象
     */
    clone(obj: any) {
        return clone(obj)
    }

    /**
     * 异步脚本加载Promise
     * @param url 
     */
    promiseScriptLoader(url: string) {
        return new Promise(function (resolve, reject) {
            const script = document.createElement("script")
            script.type = "text/javascript"
            script.src = url
            script.async = true
            script.addEventListener("load", resolve)
            script.addEventListener("error", reject)
            document.body.appendChild(script)
        })
    }

    /**
     * 延迟执行Promise
     * @param msec 
     */
    sleep(msec: number) {
        msec = msec || 0
        return new Promise((resolve) => {
            setTimeout(resolve, msec)
        })
    }

    /**
     * @description 获取url的参数
     * @param {String} name 参数名
     * @param {String} url url
     * @returns
     */
    getQueryString(name: string, url?: string) {
        const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
        url = url || window.location.search
        const r = url.substring(1).match(reg)
        if (r != null) return r[2]
        return null
    }

    /**
     * 当前页面url
     */
    currentUrl() {
        return window.location.href.replace(window.location.hash, '')
    }

    /**
     * 当前host+路径
     */
    currentPath() {
        return window.location.origin + window.location.pathname
    }

    /**
     * 删除url里指定的参数
     * @param url URL
     * @param ref 参数名
     */
    delQueStr(url: string, ref: string) {
        let str = ''

        let i

        if (url.indexOf('?') !== -1) {
            str = url.substring(url.indexOf('?') + 1)
        } else {
            return url
        }
        let arr: string[] = []
        let returnurl = ''
        if (str.indexOf('&') !== -1) {
            arr = str.split('&')
            for (i in arr) {
                if (arr[i].split('=')[0] !== ref) {
                    returnurl = returnurl + arr[i].split('=')[0] + '=' + arr[i].split('=')[1] + '&'
                }
            }
            return url.substring(0, url.indexOf('?')) + '?' + returnurl.substring(0, returnurl.length - 1)
        } else {
            arr = str.split('=')
            if (arr[0] === ref) {
                return url.substring(0, url.indexOf('?'))
            } else {
                return url
            }
        }
    }

    /**
     * 设置url指定参数的值
     * @param url URL
     * @param ref 参数名
     * @param value 参数值
     */
    setQueStr(url: string, ref: string, value: string | number) {
        const parsedUrl = parse(url)
        if (parsedUrl) {
            let newQuery
            if (parsedUrl.query) {
                const params: string[] = parsedUrl.query.substr(1).split('&')
                let match = false
                newQuery = []

                params.forEach(function (param) {
                    const paramArr = param.split('=')
                    if (paramArr[0] === ref) {
                        match = true
                        newQuery.push(ref + '=' + value)
                    } else {
                        newQuery.push(paramArr[0] + '=' + paramArr[1])
                    }
                })
                if (!match) {
                    newQuery.push(ref + '=' + value)
                }

                newQuery = newQuery.join('&')
            } else {
                newQuery = ref + '=' + value
            }
            return parsedUrl.origin + parsedUrl.pathname + '?' + newQuery + parsedUrl.hash
        } else {
            return ''
        }
    }

    /**
     * 构造或发起oauth跳转
     * @param path 回跳路径
     * @param returnUrl 是否返回url，true则不自动发起重定向
     * @param hideLoading 是否在回跳后显示loading
     */
    oauth(path: string, returnUrl: boolean, hideLoading: boolean) {
        let url = ''
        const oauthGatewayUrl = Env.get('OAUTH_URL')
        const appId = Env.get('APP_ID')
        if (path.indexOf('http') !== 0) {
            let currentUrl = this.currentUrl()
            currentUrl = this.delQueStr(currentUrl, 'code') // 剔除code参数
            currentUrl = this.delQueStr(currentUrl, 'state') // 剔除state参数
            currentUrl = this.delQueStr(currentUrl, 'no_loading') // 剔除state参数
            if (hideLoading) {
                currentUrl = this.setQueStr(currentUrl, 'no_loading', 1)
            }
            url = encodeURIComponent(currentUrl + path)
        } else {
            url = encodeURIComponent(path)
        }

        if (oauthGatewayUrl.indexOf('oauth.html') !== -1) {
            url = encodeURIComponent(btoa(url))
        }
        const oauthUrl = oauthGatewayUrl + '?appid=' + appId + '&redirect_uri=' + url + '&response_type=code&scope=snsapi_userinfo&state=stamp_oauth#wechat_redirect'
        if (returnUrl) {
            return oauthUrl
        } else {
            location.href = oauthUrl
        }
    }

    /**
     * jssdk
     * @param services 
     * @param apiList 是否返回url，true则不自动发起重定向
     */
    private __jssdkLoaded = 0
    jssdk(services: Services, apiList: string[]): Promise<WeixinBridgeObject> {
        return new Promise((resolve, reject) => {
            const doConfig = () => {
                const url = this.currentUrl()
                console.log('doConfig')
                services
                    .invoke({
                        url: 'wx/jssdk/config',
                        type: 'get',
                        data: {
                            url: btoa(btoa(url))
                        }
                    })
                    .then((res: any) => {
                        const config = {
                            // beta: true,
                            debug: false,
                            // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                            appId: res.data.appId,
                            // 必填，公众号的唯一标识
                            timestamp: res.data.timestamp,
                            // 必填，生成签名的时间戳
                            nonceStr: res.data.noncestr || res.data.nonceStr,
                            // 必填，生成签名的随机串
                            signature: res.data.signature,
                            // 必填，签名，见附录1
                            jsApiList: apiList // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                        }
                        // console.log(config)
                        myWindow.wx.config(config)
                        myWindow.wx.ready(function () {
                            console.log('jssdk ready')
                            resolve(myWindow.wx)
                        })
                        myWindow.wx.error(function (error: any) {
                            console.log('jssdk error')
                            console.log(error)
                            reject(false)
                        })
                    })
            }
            if (this.__jssdkLoaded !== 1) {
                this.promiseScriptLoader(Env.get('JSSDK_URL'))
                    .then(() => {
                        this.__jssdkLoaded = 1
                        doConfig()
                    })
                    .catch(() => {
                        this.__jssdkLoaded = -1
                        console.error('JSSDK URL load failed')
                        reject(false)
                    })
            } else {
                doConfig()
            }
        })
    }

    // listToTree(arr: any[], id:string, pid: string, filter: Function, topPid?: string|number): MenuItem[] {
    //     let fRootId:string|number
    //     if (topPid === undefined) {
    //         // 先找出pId对应不上的
    //         arr.forEach(element => {
    //             let parentId = element[pid]
    //             // console.log(parentId)
    //             let found = false
    //             arr.forEach(element2 => {
    //                 if (!found && element2[id] === parentId) {
    //                     // console.log(parentId)
    //                     found = true
    //                 }
    //             })
    //             if (!found) {
    //                 fRootId = parentId
    //             }
    //         })
    //     } else {
    //         fRootId = topPid
    //     }

    //     let res:MenuItem[] = []
    //     arr.forEach((item) => {
    //         const menuItem = new MenuItem(item[id], item[pid], item.menuName, item.jsUrl, item.htmlUrl, item.icon, item.menuType, item.visible, item)
    //         res.push(menuItem)
    //     })
    //     res.forEach((menuItem) => {
    //         const parentId = menuItem.parentId
    //         menuItem.isLeaf = true
    //         // element.icon = 'iconfont icon-tag'
    //         menuItem.__path = menuItem.__path || menuItem.id + '-'
    //         if (parentId !== fRootId) {
    //             res.forEach((menuItemInner) => {
    //                 if (menuItemInner.id === parentId) { // 当内层循环的ID== 外层循环的parendId时，（说明有children），需要往该内层id里建个children并push对应的数组；
    //                     if (filter(menuItem)) {
    //                         // console.log(menuItem)
    //                         if (!menuItemInner.children) {
    //                             menuItemInner.children = []
    //                         }
    //                         // menuItem.parent = ele // 反指向
    //                         menuItem.__path = (menuItemInner.__path || '') + menuItem.__path
    //                         menuItemInner.addChild(menuItem)
    //                     }
    //                 }
    //             })
    //         }
    //     })
    //     return res.filter(ele => (ele.parentId === fRootId && (ele.visible === undefined || ele.visible === 1))) // 这一步是过滤，按树展开，将多余的数组剔除；
    // }

    /**
     * 列表转树结构
     * @param arr 列表
     * @param id id属性名
     * @param pId 父id属性名
     * @param title 文字属性名
     * @param visible 是否显示属性名
     * @param filter 过滤方法
     * @param topPid 顶级id
     */
    listToTree<T>(arr: T[], id: string, pId: string, title: string, visible: string, filter: Function, topPid?: StringOrNumber): MyTreeNode<T>[] {
        let fRootId: StringOrNumber

        if (topPid === undefined) {
            // 先找出pId对应不上的
            arr.forEach(element => {
                type ObjectKey = keyof typeof element
                let parentId = element[pId as ObjectKey] + ''
                // console.log(parentId)
                let found = false
                arr.forEach(element2 => {
                    let id2 = element2[id as ObjectKey] + ''
                    if (!found && id2 === parentId) {
                        // console.log(parentId)
                        found = true
                    }
                })
                if (!found) {
                    fRootId = parentId
                }
            })
        } else {
            fRootId = topPid
        }

        let res: MyTreeNode<T>[] = []
        arr.forEach((item) => {
            type ObjectKey = keyof typeof item
            const treeNode = {
                key: item[id as ObjectKey] + '',
                pKey: item[pId as ObjectKey] + '',
                title: item[title as ObjectKey] + '',
                isLeaf: true,
                visible: Number(item[visible as ObjectKey]),
                disabled: false,
                path: '',
                children: [],
                data: item
            }
            res.push(treeNode)
        })
        res.forEach((treeNode) => {
            const parentId = treeNode.pKey
            // element.icon = 'iconfont icon-tag'
            treeNode.path = treeNode.path || treeNode.key + '-'
            if (parentId !== fRootId) {
                res.forEach((treeNodeInner) => {
                    if (treeNodeInner.key === parentId) { // 当内层循环的ID== 外层循环的parendId时，（说明有children），需要往该内层id里建个children并push对应的数组；
                        if (filter(treeNode)) {
                            // console.log(menuItem)
                            if (!treeNodeInner.children) {
                                treeNodeInner.children = []
                            }
                            // menuItem.parent = ele // 反指向
                            treeNode.path = (treeNodeInner.path || '') + treeNode.path
                            treeNodeInner.children.push(treeNode)
                            treeNodeInner.isLeaf = false
                        }
                    }
                })
            }
        })
        return res.filter(ele => (ele.pKey === fRootId && (ele.visible === undefined || ele.visible === 1))) // 这一步是过滤，按树展开，将多余的数组剔除；
    }

    /**
     * 首字母大写
     * @param {String} str 需要转换的字符串
     */
    ucwords(str: string): string {
        str = str.toLowerCase()
        return str.substring(0, 1).toUpperCase() + str.substring(1)
    }

    /**
     * url格式转pascal格式，即abc/def/ghi => Abc[glue]Def[glue]Ghi
     * @param {String} url
     * @param {String} glue
     */
    urlToPascalCase(url: string, glue: string = '-'): string {
        const pascal: string[] = []
        url.split('/').forEach((part) => {
            if (part !== '') {
                pascal.push(this.ucwords(part))
            }
        })
        return pascal.join(glue)
    }

    /**
     * 查询参数对象转成url
     * @param obj 参数对象
     */
    objToUrl<T>(obj: T): string[] {
        let url: string[] = []
        let key: keyof T
        for (key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                url.push((key as string) + '=' + obj[key])
            }
        }
        return url
    }

    /**
     * 重定向到指定url
     * @param url 目标地址
     */
    redirect(url: string) {
        let link = document.createElement('a')
        link.href = url
        link.style.display = 'none'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    /**
     * 按接口批量设置属性值
     * @param target
     * @param source
     * @param filter
     */
    assignAttrs<T>(target: T, source: T, filter?: Function) {
        let key: keyof T
        for (key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
                let value = source[key]
                if (typeof filter === 'function') {
                    value === filter(key, value)
                }
                target[key] = value
            }
        }
    }

    /**
     * xss 过滤
     * @param str 
     * @param options 
     * @returns 
     */
    xss(str: string, options: IFilterXSSOptions | undefined) {
        return xss(str, options)
    }

    /**
     * 随机整数
     * @param min 
     * @param max 
     * @returns 
     */
    randomInt(min: number, max: number) {
        const range = max - min
        if (range <= 0) {
            throw new Exception('max must be larger than min')
        }
        var requestBytes = Math.ceil(Math.log2(range) / 8)
        if (!requestBytes) { // No randomness required
            return min
        }
        var maxNum = Math.pow(256, requestBytes)
        var ar = new Uint8Array(requestBytes)

        while (true) {
            window.crypto.getRandomValues(ar)

            var val = 0
            for (var i = 0; i < requestBytes; i++) {
                val = (val << 8) + ar[i]
            }

            if (val < maxNum - maxNum % range) {
                return min + (val % range)
            }
        }
    }

    /**
     * 导出csv
     * @param data 
     * @param fileName 
     * @returns 
     */
    exportCSV (data: any[], fileName:string) {
        let csvContent = "data:text/csv;charset=utf-8,"
        data.forEach((row) => {
            csvContent += row.join(",") + "\n"
        })
    
        const encodedUri = encodeURI(csvContent)
        const link = document.createElement("a")
        link.setAttribute("href", encodedUri)
        link.setAttribute("download", fileName)
        document.body.appendChild(link)
        link.click()
    }

    /**
     * 获取设备宽高
     * @returns 
     */
    getDeviceResolution () : DeviceResolution {
        const width = window.screen.width || window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
        const height = window.screen.height || window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight

        return {
            width: width,
            height: height
        }
    }

    /**
     * 从列表中查到对应条件的元素
     * @param data
     * @param attr
     * @param value 
     * @returns 
     */
    findItem <T> (data: T[], attr: keyof T, value: any) {
        return data.filter((item) => {
            return item[attr] === value
        })
    }

    /**
     * 字节数转成友好的单位
     * @param bytes 字节数
     * @param decimals 精度
     * @returns 
     */
    readableSize (bytes: number, decimals = 1) {
        const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
        if (bytes === 0) {
            return '0B'
        }
        const i = Math.floor(Math.log(bytes) / Math.log(1024))
        if (i === 0) {
            return bytes + sizes[i]
        }
        return (bytes / Math.pow(1024, i)).toFixed(decimals) + sizes[i]
    }

    
    /**
     * 利用canvas进行图片压缩裁剪
     * @param src 图片路径, url或者base64
     * @param maxWidth 最大宽度
     * @param maxHeight 最大高度
     * @param outputFormat 输出格式
     * @param quality 压缩质量
     * @returns 
     */
    compress(src: string, maxWidth: number, maxHeight: number, outputFormat: string = 'image/png', quality: number = 0.7) {
        return new Promise((resolve, reject) => {
            const image = new Image()
            image.src = src
            image.onload = () => {
                let width = image.width
                let height = image.height

                if (width > maxWidth) {
                    height *= maxWidth / width
                    width = maxWidth
                }

                if (height > maxHeight) {
                    width *= maxHeight / height
                    height = maxHeight
                }

                const canvas = document.createElement('canvas')
                canvas.width = width
                canvas.height = height
                const ctx = canvas.getContext('2d')
                ctx?.drawImage(image, 0, 0, width, height)

                const newDataUrl = canvas.toDataURL(outputFormat, quality)
                resolve(newDataUrl)
            }
            image.onerror = (e) => {
                console.error(e)
                reject(new Exception('图片压缩异常'))
            }
        })
    }
}

const util = new Util()
export default util
