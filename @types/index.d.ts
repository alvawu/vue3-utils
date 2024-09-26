import { ResponseType } from 'axios'
import { RouteLocationNormalized } from 'vue-router'
import { Services } from '../lib/services'
declare module 'promise-script-loader'

/** string | number */
type StringOrNumber = string | number

/**
 * 缓存项
 */
interface CacheItem {
    /** 缓存项有效期，毫秒 */ 
    lifetime: number
    /** 缓存项内容 */ 
    data: any
}

/**
 * service invoke方法中headers的配置项
 */
interface ServicesHeader {
    /**
      * 指定该接口的参数以何种格式传递给后端，支持传入json, form以及query。
      * json：转发时会以post+json形式发起请求（默认）
      * form：转发时会以post+form形式发起请求
      * query: 转发时会以get+querystring形式发起请求
      */
    proxydatatype?: string
    /**
     * 其它自定义header
     */
    [key: string]: string | undefined
}

/**
 * service invoke方法的配置项
 */
interface ServicesOptions {
    /** 接口url，如果传入绝对路径，则以传入的url发起请求，如果传入相对路径，则会在url前拼接“services/”前缀 */ 
    url: string
    /** 接口参数 */
    data: object
    /** 接口服务名，如果接口所属服务与clientId不一致，则需要指定 */
    service?: string
    /** 请求报文体的content-type，默认application/json; charset=UTF-8 */
    contentType?: string
    /** 请求方式，支持get / post */
    type?: string
    /** 请求头 */
    headers?: ServicesHeader
    /** `withCredentials` indicates whether or not cross-site Access-Control requests should be made using credentials */
    withCredentials?: boolean
    /** 返回类型，可选blob和json，默认json */
    resType?: ResponseType
    /** 缓存结果时间，小于等于0则不缓存 */
    cache?: number
}

/**
 * 移动端的返回结构
 */
interface SystemRet<T> {
    /** 结果状态码，200是成功 */
    status: number
    /** 结果信息 */
    msg: string
    /** 结果数据 */
    data: T
}

/**
 * PC端的返回结构
 */
interface PCSystemRet<T> {
    /** 结果状态码，1是成功 */
    status: number
    /** 结果信息 */
    message: string
    /** 结果数据 */
    data: T
}

/**
 * 微信jssdk的wx对象，具体可以参考微信开放平台的文档中，关于jssdk部分的描述
 */
interface WeixinBridgeObject {
    config: Function
    ready: Function
    error: Function
    checkJsApi: Function
    updateAppMessageShareData: Function
    updateTimelineShareData: Function
    onMenuShareTimeline: Function
    onMenuShareAppMessage: Function
    onMenuShareQQ: Function
    onMenuShareWeibo: Function
    onMenuShareQZone: Function
    chooseImage: Function
    previewImage: Function
    uploadImage: Function
    downloadImage: Function
    getLocalImgData: Function
    startRecord: Function
    stopRecord: Function
    onVoiceRecordEnd: Function
    playVoice: Function
    pauseVoice: Function
    stopVoice: Function
    onVoicePlayEnd: Function
    uploadVoice: Function
    downloadVoice: Function
    translateVoice: Function
    getNetworkType: Function
    openLocation: Function
    getLocation: Function
    startSearchBeacons: Function
    stopSearchBeacons: Function
    onSearchBeacons: Function
    closeWindow: Function
    hideMenuItems: Function
    showMenuItems: Function
    hideAllNonBaseMenuItem: Function
    showAllNonBaseMenuItem: Function
    scanQRCode: Function
    openProductSpecificView: Function
    chooseCard: Function
    addCard: Function
    openCard: Function
    chooseWXPay: Function
    openAddress: Function
}

/** 字典枚举项 */
interface DictItem {
    /** 字典枚举项的key */
    key: StringOrNumber
    /** 字典枚举项的value */
    value: StringOrNumber
}

/** 字典 */
interface Dict {
    /** 字典名 */
    name: string
    /** 字典枚举项列表 */
    enums: DictItem[]
}

/** 环境变量 */
interface Env {
    /** 环境变量名 */
    name: string
    /** 环境变量值 */
    value: StringOrNumber
}

/** 树形节点 */
interface MyTreeNode<T> {
    /** 节点的key */
    key: StringOrNumber
    /** 父节点key */
    pKey: StringOrNumber
    /** 节点文字 */
    title: string
    /** 是否叶子结点 */
    isLeaf: boolean
    /** 是否显示 */
    visible: number
    /** 节点路径，以key1/key2/key3格式组装 */
    path: string
    /** 节点数据 */
    data: T
    /** 子节点列表 */
    children: MyTreeNode<T>[]
    /** 是否禁用 */
    disabled: boolean
}

/** 路由信息 */
interface RouteInfo {
    /** 路由名 */
    name: string
    /** 路由路径 */
    path: string
    /** 路由参数 */
    params: any
    /** 路由querystring */
    query: any
}

/** 微信图片水印 */
interface WXImageWatermark {
    /** 水印横坐标，从图片左上角开始，按从左到右计算 */
    x: number
    /** 水印纵坐标，从图片左上角开始，按从上到下计算 */
    y: number
    /** 水印文字大小 */
    fontSize: number
    /** 水印文字内容 */
    text: string
}

/** 微信图片 */
interface WXImage {
    /** 微信图片的服务器资源id，由微信端的JSSDK uploadImage接口返回 */
    serverId: string
    /** 微信图片水印列表 */
    watermarks: WXImageWatermark[]
    /** 是否是地址加密 */
    isPrivate: number
    /** 图片项目名 */
    project: string
    /** 路径名 */
    pathname: string
    /** 文件名 */
    filename: string
}

/** 图片服务器返回结构 */
interface ImageRet {
    /** 图片上传接口返回状态 */
    state: string
    /** 图片名 */
    title: string
    /** 图片大小 */
    size: string
    /** 图片URL，可能是真实地址，也可能是加密的地址（isPrivate=1） */
    url: string
}

/** 微信jssdk chooseImage的返回结构 */
interface WXChooseRes {
    /** 调用结果信息 */
    errMsg: string
    /** 图片本地资源id列表 */
    localIds: string[]
}

/** 微信jssdk uploadImage的返回结构 */
interface WXUploadRes {
    /** 调用结果信息 */
    errMsg: string
    /** 图片服务器资源id */
    serverId: string
}

/** 计时API的打点对象 */
interface TimingStage {
    /** 打点名 */
    name: string
    /** 打点时间 */
    time: string
    /** 距离上一次打点的耗时 */
    cost: number
    /** 距离初始化的耗时 */
    costFromStart: number
    /** 额外参数 */
    extra: any
}

/** 用户跟踪对象 */
interface TrackObject {
    /** 初始化跟踪信息 */
    init: Function
    /** 触发事件收集数据 */
    trigger: Function
}

/** 路由守卫的函数类型 */
type RouterGuard = (
    /** service对象，用于路由守卫中需要调用接口的场景 */
    services: Services,
    /** 上一路由 */
    from: RouteLocationNormalized,
    /** 下一路由 */
    to: RouteLocationNormalized,
    /** 路由守卫通过后，调用触发路由继续 */
    next: Function
) => Promise<boolean>

/**
 * 微信支付invoke方法的配置项
 */
interface PayOptions {
    /** 支付参数 */
    paramMap: string
    /** 支付成功的回跳路由 */
    successRoute: RouteInfo
    /** 支付失败或取消的回跳路由 */
    failRoute: RouteInfo
}

interface DeviceResolution {
    width: StringOrNumber
    height: StringOrNumber
}