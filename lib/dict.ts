import type { Dict, DictItem, StringOrNumber } from '../@types'
import { ref } from 'vue'
import Logger from './logger'

const dicts = ref<Dict[]>([])

/**
 * 获取字典的枚举值value
 * @param dictName 字典名
 * @param key 字典枚举项key
 * @returns 
 */
const dict = (dictName: string, key: StringOrNumber) => {
    let ret: StringOrNumber = ''
    let dict = getDict(dictName)
    dict.forEach((dictItem) => {
        if (dictItem.key === key) {
            ret = dictItem.value
        }
    })
    Logger('[dict-get] [' + dictName + '] ' + key + ': ' + JSON.stringify(ret))
    return ret
}

/**
 * 获取字典枚举项列表，常用于输出字典选项列表
 * @param dictName 字典名
 * @returns 
 */
const getDict = (dictName: string):DictItem[] => {
    let ret:DictItem[] = []
    dicts.value.forEach((dict) => {
        if (dict.name === dictName) {
            ret = dict.enums
        }
    })
    return ret
}

/**
 * 增加字典
 * @param dict 字典对象
 */
const addDict = (dict: Dict) => {
    let existed = false
    dicts.value.forEach((d, index) => {
        if(d.name === dict.name) {
            existed = true
            dicts.value[index] = dict
        }
    })
    if (!existed) {
        dicts.value.push(dict)
    }
    Logger('[dict-add]' + JSON.stringify(dict))
}

export { dict, addDict, getDict }
