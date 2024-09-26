import Util from './util'
import Exception from './exception'
import type { Services } from './services'
import type { WXImage, ImageRet, SystemRet, WeixinBridgeObject, WXChooseRes, WXUploadRes } from '../@types'

/**
 * 一个用于上传微信图片的实用工具类
 */
class ImageUtil {
    /** services对象 */
    private services: Services
    /** wx对象 */
    private wx: WeixinBridgeObject

    public constructor(services: Services, wx: WeixinBridgeObject) {
        this.services = services
        this.wx = wx
    }

    /**
     * 选择微信图片
     * @param count 最大数量
     * @returns 
     */
    chooseImage(params: { count: number, sizeType?: string[], sourceType?: string[] }) {
        return new Promise<string[]>((resolve, reject) => {
            this.wx.chooseImage({
                count: params.count, // 默认9
                sizeType: params.sizeType ?? ['original'], // 可以指定是原图还是压缩图，默认二者都有
                sourceType: params.sourceType ?? ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                success: (chooseRes: WXChooseRes) => {
                    if (chooseRes.errMsg === 'chooseImage:ok') {
                        var localIds = chooseRes.localIds // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                        resolve(localIds)
                    } else {
                        reject(new Exception('选择图片失败: ' + chooseRes.errMsg, 400))
                    }
                },
                cancel: (chooseRes: WXChooseRes) => {
                    reject(new Exception('选择图片失败: ' + chooseRes.errMsg, 402))
                }
            })
        })
    }

    /**
     * 上传图片到微信服务器
     * @param localIds 本地资源id，列表
     * @param onProgress 进度回调
     * @returns 
     */
    uploadImageToWX(params: { localIds: string[], onProgress?: (index: number, localId: string, result: boolean) => void, isShowProgressTips: number }) {
        const __onProgress = typeof params.onProgress === 'function' ? params.onProgress : (index: number, localId: string, result: boolean) => { }
        return new Promise<string[]>((resolve, reject) => {
            const tasks: Promise<string>[] = []
            params.localIds.forEach((localId: string, index) => {
                tasks.push(new Promise((resolve, reject) => {
                    this.wx.uploadImage({
                        localId: localId, // 需要上传的图片的本地ID，由chooseImage接口获得
                        isShowProgressTips: params.isShowProgressTips ?? 1, // 默认为1，显示进度提示
                        success: (res: WXUploadRes) => {
                            if (res.errMsg === 'uploadImage:ok') {
                                __onProgress(index, localId, true)
                                resolve(res.serverId) // 返回图片的服务器端ID
                            } else {
                                __onProgress(index, localId, false)
                                reject(new Exception('上传微信服务器失败：' + res.errMsg, 400))
                            }
                        }
                    })
                }))
            })

            Promise.all(tasks).then((serverIds) => {
                resolve(serverIds)
            }).catch((e) => {
                reject(e)
            })
        })
    }

    /**
     * 上传图片到图片服务器
     * @param pics 微信服务器资源id，列表
     * @param onProgress 进度回调
     * @param url 上传地址
     * @returns 
     */
    uploadImageToServer(params: { pics: WXImage[], onProgress?: (index: number, pic: WXImage, result: boolean) => void, url?: string, convert?: boolean }) {
        const __onProgress = typeof params.onProgress === 'function' ? params.onProgress : (index: number, pic: WXImage, result: boolean) => { }
        return new Promise<ImageRet[]>((resolve, reject) => {
            const tasks: Promise<ImageRet>[] = []
            params.pics.forEach((pic, index) => {
                tasks.push(new Promise<ImageRet>((resolve, reject) => {
                    this.services.invoke({
                        url: params.url ?? 'wx/media/upload',
                        data: {
                            mediaId: pic.serverId,
                            watermarks: pic.watermarks,
                            isPrivate: pic.isPrivate,
                            filename: pic.filename,
                            pathname: pic.pathname,
                            project: pic.project,
                            convert: params.convert ?? true
                        }
                    }).then((res) => {
                        __onProgress(index, pic, true)
                        resolve((res as SystemRet<any>).data)
                    }).catch((e) => {
                        __onProgress(index, pic, false)
                        reject(new Exception('上传图片服务器失败', 400))
                    })
                }))
            })
            Promise.all(tasks).then((res: ImageRet[]) => {
                resolve(res)
            }).catch((e) => {
                console.error('上传图片服务器失败:JSSDK')
                reject(e)
            })
        })
    }
}
export default ImageUtil