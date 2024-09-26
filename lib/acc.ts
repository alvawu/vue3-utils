import type { StringOrNumber } from '../@types'
/**
 * 精确结算API
 */
class Acc {
    /**
     * 加法
     * @param a 
     * @param b 
     * @returns 
     */
    static add(a: StringOrNumber, b: StringOrNumber): number {
        let c, d, e
        try {
            c = a.toString().split('.')[1].length
        } catch (f) {
            c = 0
        }
        try {
            d = b.toString().split('.')[1].length
        } catch (f) {
            d = 0
        }
        e = Math.pow(10, Math.max(c, d))
        return (this.mul(a, e) + this.mul(b, e)) / e
    }

    /**
     * 减法
     * @param a 
     * @param b 
     * @returns 
     */
    static sub(a: StringOrNumber, b: StringOrNumber): number {
        let c, d, e
        try {
            c = a.toString().split('.')[1].length
        } catch (f) {
            c = 0
        }
        try {
            d = b.toString().split('.')[1].length
        } catch (f) {
            d = 0
        }
        e = Math.pow(10, Math.max(c, d))
        return (this.mul(a, e) - this.mul(b, e)) / e
    }

    /**
     * 乘法
     * @param a 
     * @param b 
     * @returns 
     */
    static mul(a: StringOrNumber, b: StringOrNumber): number {
        let c = 0
        let d = a.toString()
        let e = b.toString()
        try {
            c += d.split('.')[1].length
        } catch (f) { }
        try {
            c += e.split('.')[1].length
        } catch (f) { }
        return (
            (Number(d.replace('.', '')) * Number(e.replace('.', ''))) /
            Math.pow(10, c)
        )
    }

    /**
     * 除法
     * @param a 
     * @param b 
     * @returns 
     */
    static div(a: StringOrNumber, b: StringOrNumber): number {
        let c
        let d
        let e = 0
        let f = 0
        try {
            e = a.toString().split('.')[1].length
        } catch (g) { }
        try {
            f = b.toString().split('.')[1].length
        } catch (g) { }
        c = Number(a.toString().replace('.', ''))
        d = Number(b.toString().replace('.', ''))
        return this.mul(c / d, Math.pow(10, f - e))
    }
}

export default Acc