import type { Services } from '../lib/services'
import Env from '../lib/env'
import Logger from '../lib/logger'
import type { RouterGuard } from '../@types'

let hasAuthServerToken = false
/**
 * 用于检查是否在用户中心授权成功
 * @param services 
 * @returns 
 */
const GuardAuthServer: RouterGuard = function (services: Services) {
    return new Promise((resolve, reject) => {
        if (hasAuthServerToken) {
            resolve(true)
        } else {
            Logger('start auth server oauth')
            services
                .invoke({
                    url: 'wx/proxy/oauth/token',
                    service: Env.get('AUTH_SERVER_ID'),
                    data: {
                        username: '',
                        mobile: '',
                        moduleId: Env.get('MODULE_ID')
                    }
                })
                .then(() => {
                    Logger('success auth server oauth')
                    hasAuthServerToken = true
                    resolve(true)
                })
                .catch((e) => {
                    reject(e)
                })
        }
    })
}
export default GuardAuthServer
