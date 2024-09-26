import dayjs from 'dayjs'

/**
 * 一个用于获取日期的实用类
 */
class Datetime {
    /**
     * 获取今天日期, 格式为YYYY-MM-DD
     * @returns 
     */
    static today () {
        return dayjs().format('YYYY-MM-DD')
    }

    /**
     * 格式化日期
     * @param dateStr 日期字符串
     * @param format 日期格式，如YYYY-MM-DD
     * @returns 
     */
    static format(dateStr: string, format: string) {
        return dayjs(dateStr).format(format)
    }
}

export default Datetime