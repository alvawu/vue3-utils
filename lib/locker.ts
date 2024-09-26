import Logger from './logger'

/**
 * 返回锁定
 */
class XBack {
    locked = false
    counter = 0
    state: string = 'x - back'
    element!: HTMLSpanElement

    record (state: string) {
        Logger('record')
        history.pushState(state, '', location.href)
    }

    onPopState(event: any) {
        Logger('pop')
        event.state === this.state && this.fire()
        // this.record(this.state)
        history.pushState(this.state, '', location.href)
    }

    fire () {
        Logger('fire')
        // let event = document.createEvent('Events')
        // event.initEvent(this.state, false, false)
        const event:Event = new Event('x - back')
        // document.addEventListener("sendMsg",print)
        // document.dispatchEvent(sendEvent)
        // function print() {
        // console.log("内容色情低俗")
        // }
        // const event = new Event("sendMsg")
        // (this.element as HTMLElement)?.dispatchEvent(event)
    }

    listen (listener: EventListenerOrEventListenerObject) {
        Logger('listen')
        this.element.addEventListener(this.state, listener, false )
    }

    init () {
        Logger('init')
        this.element = document.createElement('span')
        window.addEventListener('popstate', this.onPopState)
        history.pushState(this.state, '', location.href)
        // this.record(this.state)
    }
}

/**
 * 锁定操作类
 */
class Locker {
    private _lockScorll = false
    private _lockBack = false
    private static __instance:Locker|null = null
    private _XBack: XBack | null = null

    private constructor () {
        document.addEventListener('touchmove', (event) => {
            // 判断条件,条件成立才阻止背景页面滚动,其他情况不会再影响到页面滚动
            if (this._lockScorll === true) {
                event.preventDefault()
            }
        },  { passive: false })
    }
    
    /**
     * 单例模式
     */
    public static instance () {
        if (Locker.__instance === null) {
            Locker.__instance = new Locker
        }
        return Locker.__instance
    }

    /**
     * @description 锁定滚动
     * @returns 
     */
    lockScroll () {
        Logger('lockScroll')
        this._lockScorll = true
    }

    /**
     * @description 解除锁定滚动
     * @returns 
     */
    releaseScroll () {
        Logger('releaseScroll')
        this._lockScorll = false
    }

    /**
     * @description 锁定返回
     */
    lockBack () {
        Logger('lockBack')
        if (!this._lockBack) {
            this._XBack = new XBack()

            this._XBack.init()
            this._XBack.listen(function () {})
            this._lockBack = true
        }
    }

    /**
     * @description 解除锁定返回
     * @returns 
     */
    releaseBack(pop?: boolean) {
        Logger('releaseBack')
        if (this._XBack !== null) {
            window.removeEventListener('popstate', this._XBack.onPopState)
        }
        if (pop) {
            history.go(-1)
        }
        this._lockBack = false
    }
}

export default Locker