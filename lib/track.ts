
import Util from './util'
import type { TrackObject } from '../@types'
import Env from './env'
const myWindow = window as any

/**
 * 用户行为跟踪
 */
class Track {
    private static __trackLoaded = 0

    private static __userInfo = {
        loginId: 'guest',
        userId: 'guest',
        username: 'guest',
        depId: 'guest-department',
        depName: 'guest-department'

    }

    static init(trackUrl?: string): Promise<TrackObject> {
        return new Promise((resolve, reject) => {
            if (this.__trackLoaded !== 1) {
                Util.promiseScriptLoader(trackUrl || Env.get('TRACK_URL'))
                    .then(() => {
                        this.__trackLoaded = 1
                        resolve(myWindow.Tracking)
                    })
                    .catch((e) => {
                        console.error(e)
                        this.__trackLoaded = -1
                        console.error('TRACK URL load failed:' + Env.get('TRACK_URL'))
                        reject(false)
                    })
            } else {
                resolve(myWindow.Tracking)
            }
        })
    }

    static setUser(depId: string, depName: string, loginId: string, userId: string, username: string) {
        this.__userInfo.depId = depId
        this.__userInfo.depName = depName
        this.__userInfo.loginId = loginId
        this.__userInfo.userId = userId
        this.__userInfo.username = username
    }

    static hasUser() {
        return this.__userInfo.userId !== 'guest'
    }

    static trigger(event: string, eventData: any[]) {
        if (this.__trackLoaded === 1 && typeof myWindow.Tracking !== 'undefined') {
            myWindow.Tracking.trigger(event, [this.__userInfo.depId, this.__userInfo.depName, this.__userInfo.loginId, this.__userInfo.userId, this.__userInfo.username].join('|'), eventData)
        }
    }
}

export default Track