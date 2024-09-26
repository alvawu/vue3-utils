/**
 * 异常类，继承自Error类
 */
class Exception extends Error {
    /** 异常信息 */
    public message: string
    /** 异常代码 */
    public code: number

    constructor(message: string, code: number = -1) {
        super(message)
        this.message = message
        this.code = code
    }

    /** 设置异常代码 */
    setCode(code: number) {
        this.code = code
    }

    /** 获取异常代码 */
    getCode() {
        return this.code
    }

    /** 设置异常信息 */
    setMessage(message: string) {
        this.message = message
    }

    /** 获取异常信息 */
    getMessage() {
        return this.message
    }
}

export default Exception
