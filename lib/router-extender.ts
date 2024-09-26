import type { RouteLocationNormalized, Router } from 'vue-router'
import type { Services } from './services'
import Exception from './exception'
import Logger from './logger'

async function queue(arr: any, services: Services, from: RouteLocationNormalized, to: RouteLocationNormalized, next: Function) {
    const result = []
    for (const p of arr) {
        result.push(await p(services, from, to, next))
    }
    return result
}

export default (router: Router, services: Services, onError: Function) => {
    router.beforeEach((to, from, next) => {
        // console.log(to)
        Logger('before each')
        if (to.name) {
            if (typeof to.meta.guards !== 'undefined') {
                queue(to.meta.guards, services, from, to, next).then(() => {
                    Logger('[router]passed all guards')
                    next()
                }).catch((e) => {
                    Logger('[router]failed pass guard')
                    if (e instanceof Exception) {
                        onError(e)
                    } else {
                        onError(new Exception('failed pass guard', 403))
                    }
                })
            } else {
                next()
            }
        } else {
            onError(new Exception('Not Found', 404))
        }
    })
}
