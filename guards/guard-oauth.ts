import Cache from '../lib/cache'
import Util from '../lib/util'
import Exception from '../lib/exception'
import Env from '../lib/env'
import Logger from '../lib/logger'
import type { Services } from '../lib/services'
import type { RouteLocationNormalized } from 'vue-router'
import type { RouterGuard } from '../@types'

/**
 * 用于检查是否在微信授权成功
 * @param services 
 * @param from 
 * @param to 
 * @returns 
 */
const GuardOauth: RouterGuard = function (services: Services, from: RouteLocationNormalized, to: RouteLocationNormalized) {
    return new Promise((resolve, reject) => {
        const code = Util.getQueryString('code')
        const interuptAutoOauth = Env.get('INTERUPT_AUTO_OAUTH')
        if (code && !Cache.get('token')) {
            // 有授权码，但是尚未获得tokenId，将授权码换取token
            Logger('start wx oauth')
            services
                .invoke({
                    url: 'wx/auth/token',
                    type: 'get',
                    data: {
                        code: code,
                        clientId: Env.get('CLIENT_ID')
                    }
                })
                .then((authRes: any) => {
                    Logger('success wx oauth')
                    if (authRes && authRes.data && authRes.data.tokenId && authRes.data.tokenId) {
                        Cache.set('token', authRes.data.tokenId, authRes.data.expiresIn * 1000)
                        resolve(true)
                    } else {
                        if (interuptAutoOauth !== '1') {
                            Util.oauth('#' + to.fullPath, false, true)
                        }
                        reject(new Exception('oauth失败|' + to.fullPath, 403))
                    }
                })
                .catch((e) => {
                    reject(e)
                })
        } else if (!Cache.get('token') && !code) {
            if (interuptAutoOauth !== '1') {
                Util.oauth('#' + to.fullPath, false, true)
            }
            reject(new Exception('oauth失败|' + to.fullPath, 403))
        } else {
            resolve(true)
        }
    })
}
export default GuardOauth
