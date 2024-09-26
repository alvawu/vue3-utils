import type { StringOrNumber } from "../@types"

class StringUtil {
    /**
     * @description 数值格式化
     * @param {StringOrNumber} number 数字
     * @param {Number} digits 小数点后几位
     * @param {Boolean} round 是否四舍五入
     * @returns 
     */
    static numberFormat (oldNumber:StringOrNumber, digit = 2, round = true) {
        let number:StringOrNumber = parseFloat(oldNumber + '')
        number = number * Math.pow(10, digit)
        number = round ? Math.round(number) : Math.floor(number)
        number = number / Math.pow(10, digit)
        return number
    }

    /**
     * @description 金额格式化
     * @param {String|Number} value 金额
     * @param {Number} digits 小数点后几位
     * @param {String} symbol 金额货币符号
     * @param {String} division 千位分隔符
     * @returns 
     */
    static priceFormat (oldValue: StringOrNumber, digits = 2, symbol = '', division = '') {
        let value:StringOrNumber = parseFloat(oldValue + '')
        value = value || 0

        if (value < 0) {
            value = -value
            value = '-' + symbol + value.toFixed(digits)
        } else {
            value = symbol + value.toFixed(digits)
        }
        
        if (division) {
            value = value.replace(/\d(?=(?:\d{3})+\b)/g,'$&' + division)
        }

        return value
    }

    /**
     * 是否以指定字符串开始
     * @param {String} str 
     * @param {String} search 
     * @returns 
     */
    static startWith (str:string, search:string) {
        let reg = new RegExp('^' + search)
        return reg.test(str)
    }

    /**
     * 是否以指定字符串结尾
     * @param {String} str 
     * @param {String} search 
     * @returns 
     */
    static endWith (str:string, search:string) {
        let reg = new RegExp(search + '$')
        return reg.test(str)
    }

    /**
     * @description 金额转汉字大写
     * @param {StringOrNumber} currencyDigits 
     * @returns 
     */
    static convertCurrency (currencyDigits: StringOrNumber) {
        // Constants:
        let MAXIMUM_NUMBER = 99999999999.99
        // Predefine the radix characters and currency symbols for output:
        let CN_ZERO = '零'
        let CN_ONE = '壹'
        let CN_TWO = '贰'
        let CN_THREE = '叁'
        let CN_FOUR = '肆'
        let CN_FIVE = '伍'
        let CN_SIX = '陆'
        let CN_SEVEN = '柒'
        let CN_EIGHT = '捌'
        let CN_NINE = '玖'
        let CN_TEN = '拾'
        let CN_HUNDRED = '佰'
        let CN_THOUSAND = '仟'
        let CN_TEN_THOUSAND = '万'
        let CN_HUNDRED_MILLION = '亿'
        let CN_SYMBOL = ''
        let CN_DOLLAR = '元'
        let CN_TEN_CENT = '角'
        let CN_CENT = '分'
        let CN_INTEGER = '整'

        // Variables:
        let integral // Represent integral part of digit number.
        let decimal // Represent decimal part of digit number.
        let outputCharacters // The output result.
        let parts
        let digits, radices, bigRadices, decimals
        let zeroCount
        let i, p, d
        let quotient, modulus

        // Validate input string:
        currencyDigits = currencyDigits + ''
        if (currencyDigits === '') {
            // alert('请输入小写金额！')
            return ''
        }
        if (currencyDigits.match(/[^,.\d]/) != null) {
            // alert('小写金额含有无效字符！')
            return '小写金额含有无效字符'
        }
        if ((currencyDigits).match(/^((\d{1,3}(,\d{3})*(.((\d{3},)*\d{1,3}))?)|(\d+(.\d+)?))$/) == null) {
            // alert('小写金额的格式不正确！')
            return '小写金额的格式不正确！'
        }

        // Normalize the format of input digits:
        currencyDigits = currencyDigits.replace(/,/g, '') // Remove comma delimiters.
        currencyDigits = currencyDigits.replace(/^0+/, '') // Trim zeros at the beginning.
        // Assert the number is not greater than the maximum number.
        if (Number(currencyDigits) > MAXIMUM_NUMBER) {
            // alert('金额过大，应小于1000亿元！')
            return '金额过大，应小于1000亿元！'
        }

        // Process the coversion from currency digits to characters:
        // Separate integral and decimal parts before processing coversion:
        parts = currencyDigits.split('.')
        if (parts.length > 1) {
            integral = parts[0]
            decimal = parts[1]
            // Cut down redundant decimal digits that are after the second.
            decimal = decimal.substr(0, 2)
        } else {
            integral = parts[0]
            decimal = ''
        }
        // Prepare the characters corresponding to the digits:
        digits = [CN_ZERO, CN_ONE, CN_TWO, CN_THREE, CN_FOUR, CN_FIVE, CN_SIX, CN_SEVEN, CN_EIGHT, CN_NINE]
        radices = ['', CN_TEN, CN_HUNDRED, CN_THOUSAND]
        bigRadices = ['', CN_TEN_THOUSAND, CN_HUNDRED_MILLION]
        decimals = [CN_TEN_CENT, CN_CENT]
        // Start processing:
        outputCharacters = ''
        // Process integral part if it is larger than 0:
        if (Number(integral) > 0) {
            zeroCount = 0
            for (i = 0; i < integral.length; i++) {
                p = integral.length - i - 1
                d = integral.substr(i, 1)
                quotient = p / 4
                modulus = p % 4
                if (d === '0') {
                    zeroCount++
                } else {
                    if (zeroCount > 0) {
                        outputCharacters += digits[0]
                    }
                    zeroCount = 0
                    outputCharacters += digits[Number(d)] + radices[modulus]
                }
                if (modulus === 0 && zeroCount < 4) {
                    outputCharacters += bigRadices[quotient]
                    zeroCount = 0
                }
            }
            outputCharacters += CN_DOLLAR
        }
        // Process decimal part if there is:
        if (decimal !== '') {
            for (i = 0; i < decimal.length; i++) {
                d = decimal.substr(i, 1)
                if (d !== '0') {
                    outputCharacters += digits[Number(d)] + decimals[i]
                }
            }
        }
        // Confirm and return the final output string:
        if (outputCharacters === '') {
            outputCharacters = CN_ZERO + CN_DOLLAR
        }
        if (decimal === '') {
            outputCharacters += CN_INTEGER
        }
        outputCharacters = CN_SYMBOL + outputCharacters
        return outputCharacters
    }
}

// const stringUtil = new StringUtil()
export default StringUtil