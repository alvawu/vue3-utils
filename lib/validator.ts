class Validator {
    /**
     * @description 是否是空对象
     * @param {*} obj 
     * @returns 
     */
    isEmptyObject (obj:any) {
        /* eslint-disable no-unused-vars */
        // See https://github.com/eslint/eslint/issues/6125
        for (let name in obj) {
            return name === null
        }
        return true
    }

    /**
     * @description 是否数字
     * @param {*} val
     * @returns 
     */
    isNumeric (val:any) {
        let parsed = parseInt(val)
        return parsed === 0 || parsed
    }

    /**
     * @description 是否是字符串
     * @param {*} val
     * @returns 
     */
    isString (val:any) {
        return typeof val === 'string'
    }

    /**
     * @description 是否是对象
     * @param {*} val
     * @returns 
     */
    isObject (val:any) {
        return val != null && typeof val === 'object' && Array.isArray(val) === false
    }

    /**
     * @description 是否是数组
     * @param {*} val
     * @returns 
     */
    isArray (val:any) {
        return Object.prototype.toString.call(val) === '[object Array]'
    }

    /**
     * @description 是否手机号码
     * @param {String} str 手机号码
     * @returns 
     */
    isMobile (str:string) : boolean {
        // return true
        return /^1[3,4,5,6,7,8,9]\d{9}$/.test(str)
    }

    /**
     * @description 是否英文及中文
     * @param {String} str 字符串
     * @returns 
     */
    isAlphabetChinese (str:string)  : boolean{
        return /^[\u4e00-\u9fa5_a-zA-Z]+$/.test(str)
    }

    /**
     * @description 是否英文、中文及数字
     * @param {String} str 字符串
     * @returns 
     */
    isAlphabetNumberChinese(str:string)  : boolean {
        return /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/.test(str)
    }

    /**
     * @description 是否是身份证
     * @param {String} str 字符串
     * @returns 
     */
    isIDCard (str:string): boolean  {
        let city = {
            11: '北京',
            12: '天津',
            13: '河北',
            14: '山西',
            15: '内蒙古',
            21: '辽宁',
            22: '吉林',
            23: '黑龙江 ',
            31: '上海',
            32: '江苏',
            33: '浙江',
            34: '安徽',
            35: '福建',
            36: '江西',
            37: '山东',
            41: '河南',
            42: '湖北 ',
            43: '湖南',
            44: '广东',
            45: '广西',
            46: '海南',
            50: '重庆',
            51: '四川',
            52: '贵州',
            53: '云南',
            54: '西藏 ',
            61: '陕西',
            62: '甘肃',
            63: '青海',
            64: '宁夏',
            65: '新疆',
            71: '台湾',
            81: '香港',
            82: '澳门',
            91: '国外 '
        }
        let pass = true

        if (!str || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(str)) {
            // 身份证号格式错误
            pass = false
        } else if (!Object.prototype.hasOwnProperty.call(city, str.substr(0, 2))) {
            // 地址编码错误
            pass = false
        } else {
            // 18位身份证需要验证最后一位校验位
            if (str.length === 18) {
                let strArr:string[] = str.split('')
                // ∑(ai×Wi)(mod 11)
                // 加权因子
                let factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
                // 校验位
                let parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2]
                let sum = 0
                let ai = 0
                let wi = 0
                for (let i = 0; i < 17; i++) {
                    ai = Number(strArr[i])
                    wi = factor[i]
                    sum += ai * wi
                }
                let last = parity[sum % 11].toString()
                let checkCode = strArr[17].toString()
                if (last !== checkCode) {
                    // 校验位错误
                    pass = false
                }
            }
        }
        return pass
    }

    /**
     * @description 是否是中国大陆地区车牌
     * @param {String} vehicleNumber 字符串
     * @returns 
     */
    isVehicleNumber (vehicleNumber: string) : boolean {
        var xreg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DABCEFGHJK]$)|([DABCEFGHJK][A-HJ-NP-Z0-9][0-9]{4}$))/  // 2021年新能源车牌不止有DF
        var creg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/

        if (vehicleNumber.length === 7) {
            return creg.test(vehicleNumber)
        } else if (vehicleNumber.length === 8) {
            return xreg.test(vehicleNumber)
        } else {
            return false
        }
    }

    /**
     * @description 是否是固定电话，正确格式为：XXXX-XXXXXXX，XXXX-XXXXXXXX，XXX-XXXXXXX，XXX-XXXXXXXX，XXXXXXX，XXXXXXXX
     * @param {String} str 字符串
     * @returns 
     */
    isTel (str: string) : boolean {
        return /^(\(\d{3,4}\)|\d{3,4}-)?\d{7,8}$/.test(str)
    }

    /**
     * @description 是否是电子邮箱
     * @param {String} str 字符串
     * @returns 
     */
    isEmail (str: string) : boolean {
        return /^[a-zA-Z0-9\._-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(str)
    }

    /**
     * @description 是否URL
     * @param url 
     * @returns 
     */
    isURL (url:string) { // 验证url
        let strRegex = ['^((https|http|ftp|rtsp|mms)?://)',
            "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?", // ftp的user@
            '(([0-9]{1,3}\.){3}[0-9]{1,3}', // IP形式的URL- 199.194.52.184
            '|', // 允许IP和DOMAIN（域名）
            "([0-9a-z_!~*'()-]+\.)*", // 域名- www.
            '([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\.', // 二级域名
            '[a-z]{2,6})', // first level domain- .com or .museum
            '(:[0-9]{1,4})?', // 端口- :80
            '((/?)|', // a slash isn't required if there is no file name
            "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$"
        ].join('')
        let re = new RegExp(strRegex)
        return re.test(url)
    }

    /**
     * 验证密码强度
     * @param str
     */
    authPasswd  (str: string) {
        let rank = 0
        const strength = ['pw-empty', 'pw-weak', 'pw-medium', 'pw-fine', 'pw-good']

        if (str.length >= 8) {
            if (/[a-z]+/.test(str)) {
                rank++
            }
            
            if (/[A-Z]+/.test(str)) {
                rank++
            }

            if (/[0-9]+/.test(str)) {
                rank++
            }

            // eslint-disable-next-line no-useless-escape
            if (/[@\$!%*?&#~]+/.test(str)) {
                rank++
            }
        }

        return strength[rank]
    }

    isIOS (ua?: string) {
        let testUA = ua || navigator.userAgent
        return !!testUA.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) && testUA.indexOf('wechatdevtools') === -1
    }
}

const validator = new Validator()
export default validator
