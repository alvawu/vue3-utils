import type { TimingStage } from "../@types"
import dayjs from 'dayjs'

/**
 * 时间评估实用工具类，用于评估代码块的执行时间
 */
class Timing {
    /** Timing实例列表 */
    private static __instances:Timing[] = []
    /** Timing标识名 */
    private name = ''
    /** Timing启动时间 */
    private startTime = 0
    /** Timing最后打点时间 */
    private lastTickTime = 0
    /** Timing打点列表 */
    private stageList: TimingStage[] = []

    private constructor(name: string) {
        this.name = name
        const now = this.now()
        this.startTime = now
        this.lastTickTime = now
    }

    /**
     * 实例化方法
     * @param name Timing标识名
     * @returns 
     */
    public static instance(name: string):Timing {
        let instance:Timing
        const instanceRet = Timing.__instances.filter((instance) => {
            if (instance.name === name) {
                return true
            }
        })
        if (instanceRet.length > 0) {
            instance = instanceRet[0]
        } else {
            instance = new Timing(name)
            Timing.__instances.push(instance)
        }
        return instance
    }

    /**
     * 获取当前时间戳
     * @returns 
     */
    public now () {
        return (new Date).getTime()
    }

    /**
     * 打点
     * @param stage 打点名
     * @param extra 扩展数据
     */
    public tick (stage: string, extra?:any) {
        const now = this.now()
        this.stageList.push({
            name: stage,
            time: dayjs(now).format('HH:mm:ss.SSS'),
            cost: now - this.lastTickTime,
            costFromStart: now - this.startTime,
            extra: extra
        })
        
        this.lastTickTime = now
    }

    /** 在console输出报告 */
    public report () {
        console.group('Timing Report For: ' + this.name)
        console.table(this.stageList)
        console.groupEnd()
    }
}

export default Timing