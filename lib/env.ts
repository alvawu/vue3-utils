import type { Env, StringOrNumber } from '../@types'
import { ref } from 'vue'

const envs = ref<Env[]>([])

/**
 * 获取环境变量
 * @param name 获取环境变量名
 * @param defaultValue 默认值，若环境变量不存在，则返回该值
 * @returns 
 */
const get = (name: string, defaultValue: string = '') => {
    let ret: StringOrNumber = defaultValue
    envs.value.forEach((env) => {
        if (env.name === name) {
            ret = env.value
        }
    })
    return ret
}

/**
 * 设置环境变量
 * @param name 环境变量名
 * @param value 环境变量值
 */
const set = (name: string, value: StringOrNumber) => {
    let existed = false
    envs.value.forEach((env, index) => {
        if(env.name === name) {
            existed = true
            envs.value[index].value = value
        }
    })
    if (!existed) {
        envs.value.push({
            name: name,
            value: value
        })
    }
}

export default { get, set }
