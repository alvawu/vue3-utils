import Exception from './exception'
import type { CacheItem } from '../@types'

/**
 * 设置缓存
 * @param key 缓存key名
 * @param data 缓存内容
 * @param expire 缓存有效期，毫秒
 */
const set = (key: string, data: any, expire: number) => {
    const now = new Date().getTime()
    if (!key) {
        throw new Exception('missing argument key', 400)
    }

    if (typeof data === 'undefined') {
        throw new Exception('invalid argument data', 400)
    }

    if (typeof expire === 'undefined') {
        throw new Exception('invalid argument expire', 400)
    }

    const item: CacheItem = {
        data: data,
        lifetime: now + expire
    }
    localStorage[key] = JSON.stringify(item)
}

/**
 * 读取缓存
 * @param key 缓存key名
 * @returns 
 */
const get = (key: string) => {
    const now = new Date().getTime()
    let ret = null
    if (!key) {
        throw new Exception('missing argument key', 400)
    }
    if (typeof localStorage[key] !== 'undefined') {
        const item: CacheItem = JSON.parse(localStorage[key])
        if (!item) {
            throw new Exception('cache existed, but format is invalid')
        }
        if (item.lifetime > 0 && item.lifetime > now) {
            ret = item.data
        }
    }
    return ret
}

/**
 * 删除缓存
 * @param key 缓存key名
 */
const remove = (key: string) => {
    if (!key) {
        throw new Exception('missing argument key', 400)
    }
    localStorage.removeItem(key)
}

export default { set, get, remove }
