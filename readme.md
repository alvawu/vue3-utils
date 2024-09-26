- [概述](#概述)
- [如何使用](#如何使用)
  - [安装](#安装)
  - [引入](#引入)
- [base库使用的环境变量列表](#base库使用的环境变量列表)
- [API](#api)
  - [type \& interface \& class](#type--interface--class)
    - [Exception 异常类](#exception-异常类)
    - [CacheItem 缓存项](#cacheitem-缓存项)
    - [ServicesHeader 调用接口headers选项](#servicesheader-调用接口headers选项)
    - [ServicesOptions 调用接口选项](#servicesoptions-调用接口选项)
    - [SystemRet 通用返回结构（移动端）](#systemret-通用返回结构移动端)
    - [PCSystemRet 通用返回结构（PC端）](#pcsystemret-通用返回结构pc端)
    - [WeixinBridgeObject 微信jssdk的wx对象](#weixinbridgeobject-微信jssdk的wx对象)
    - [DictItem 数据字典枚举项](#dictitem-数据字典枚举项)
    - [Dict 数据字典](#dict-数据字典)
    - [Env 环境变量](#env-环境变量)
    - [MyTreeNode\<T\> 树形节点](#mytreenodet-树形节点)
    - [RouteInfo 路由信息](#routeinfo-路由信息)
    - [WXImageWatermark 微信图片水印](#wximagewatermark-微信图片水印)
    - [WXImage 微信图片](#wximage-微信图片)
    - [ImageRet 图片服务器返回结构](#imageret-图片服务器返回结构)
    - [WXChooseRes 微信图片选择结果](#wxchooseres-微信图片选择结果)
    - [WXUploadRes 微信图片上传结果](#wxuploadres-微信图片上传结果)
    - [TimingStage Timing打点](#timingstage-timing打点)
    - [RouterGuard 路由守卫类型](#routerguard-路由守卫类型)
  - [Util 实用工具](#util-实用工具)
    - [untill 异步状态检查](#untill-异步状态检查)
    - [isWeixinClient 判断是否微信客户端](#isweixinclient-判断是否微信客户端)
    - [setTitle 设置页面title内容](#settitle-设置页面title内容)
    - [clone 克隆对象](#clone-克隆对象)
    - [promiseScriptLoader 异步加载外部script](#promisescriptloader-异步加载外部script)
    - [sleep 延迟执行](#sleep-延迟执行)
    - [getQueryString 获取url参数](#getquerystring-获取url参数)
    - [currentUrl 获取当前url](#currenturl-获取当前url)
    - [currentPath 获取当前路径](#currentpath-获取当前路径)
    - [setQueStr 设置uri参数](#setquestr-设置uri参数)
    - [delQueStr 删除uri参数](#delquestr-删除uri参数)
    - [oauth 公众号/企业微信授权](#oauth-公众号企业微信授权)
    - [jssdk jssdk实例化](#jssdk-jssdk实例化)
    - [listToTree](#listtotree)
    - [ucwords](#ucwords)
    - [urlToPascalCase](#urltopascalcase)
    - [objToUrl](#objtourl)
    - [redirect](#redirect)
    - [assignAttrs](#assignattrs)
    - [xss](#xss)
    - [randomInt](#randomint)
    - [exportCSV](#exportcsv)
    - [getDeviceResolution](#getdeviceresolution)
    - [findItem](#finditem)
  - [Acc](#acc)
    - [add, sub, mul, div](#add-sub-mul-div)
  - [Cache](#cache)
    - [set](#set)
    - [get](#get)
    - [remove](#remove)
  - [Datetime](#datetime)
    - [today](#today)
    - [format](#format)
  - [Dict](#dict)
    - [dict](#dict-1)
    - [getDict](#getdict)
    - [addDict](#adddict)
  - [Env](#env)
    - [set](#set-1)
    - [get](#get-1)
  - [ImageUtil](#imageutil)
    - [构造方法](#构造方法)
    - [chooseImage](#chooseimage)
    - [uploadImageToWX](#uploadimagetowx)
    - [uploadImageToServer](#uploadimagetoserver)
  - [Locker](#locker)
    - [lockBack, releaseBack, lockScroll, releaseScroll](#lockback-releaseback-lockscroll-releasescroll)
  - [Pay](#pay)
    - [invoke](#invoke)
  - [Services](#services)
    - [invoke](#invoke-1)
    - [setBasicSetting](#setbasicsetting)
  - [RouterExtender](#routerextender)
  - [StringUtil](#stringutil)
    - [numberFormat](#numberformat)
    - [priceFormat](#priceformat)
    - [startWith](#startwith)
    - [endWith](#endwith)
    - [convertCurrency](#convertcurrency)
  - [Timing](#timing)
    - [instance](#instance)
    - [tick](#tick)
    - [report](#report)
  - [Validator](#validator)
    - [isEmptyObject](#isemptyobject)
    - [isNumeric](#isnumeric)
    - [isString](#isstring)
    - [isObject](#isobject)
    - [isArray](#isarray)
    - [isMobile](#ismobile)
    - [isTel](#istel)
    - [isAlphabetChinese](#isalphabetchinese)
    - [isAlphabetNumberChinese](#isalphabetnumberchinese)
    - [isIDCard](#isidcard)
    - [isVehicleNumber](#isvehiclenumber)
    - [isEmail](#isemail)
    - [isURL](#isurl)
    - [authPasswd](#authpasswd)

# 概述
vue3-utils库是使用typescript开发，面向vue3，定位是一个轻量级，平台无关（PC、Mobile皆可使用），UI库无关（不集成具体UI库）的通用库。包含了请求封装，数据验证，缓存操作，基础接口定义（interface），实用工具以及微信相关验证及jssdk封装等等。目的是减少项目中重复定义的通用逻辑，并提供路由守卫的顺序校验控制。
<br />

# 如何使用
## 安装
```sh
npm install vue3-utils@latest --save-dev
```
注意：该库仅发布到公司内网的私服中，如开发机在外部网络将无法安装，因此安装时需要指定仓库地址。
## 引入
```javascript
import { Util, Cache } from 'vue3-utils' // 例子中的 Util 和 Cache 为 vue3-utils 导出的成员
```
<br />

# base库使用的环境变量列表
|变量名|说明|
|:---|:---|
|JSSDK_API|JSSDK API列表，多个以半角“,”隔开|
|DEBUG|是否开启debug，enabled / disabled|
|CLIENT_ID|客户端id，用于调用网关时使用|
|PAY_GATEWAY|支付调起页地址|
|TOKEN_NAME|header中传递token用的名字，默认是“token”|
|TRACK_URL|用户跟踪JSSDK地址|
|APP_ID|企业微信id或者微信公众号id|
|JSSDK_URL|微信JSSDK的js地址|
|MODULE_ID|用于认证中心oauth服务的模块id|
|AUTH_SERVER_ID|认证中心的服务ID|
<br />

# API
此章节主要描述各导出成员的提供的功能。注意：任何标注为Promise化方法的实例代码，默认只写回调方式，如需await / async可以自行改写，此文档不再赘述
## type & interface & class
描述库中定义的type、interface和class

### Exception 异常类
class，继承自Error类，用于定义自定义异常使用。库中大部分异常均抛出此实例。一般结合try-catch使用。
#### 成员变量 <!-- omit in toc --> 
|变量名|类型|权限|默认值|说明|
|:---|:---:|:---:|:---:|:---|
|message|string|public|-|异常信息|
|code|number|public|-|异常代码|
#### 方法 <!-- omit in toc --> 
##### 构造方法 <!-- omit in toc --> 
实例化异常
###### 方法参数 <!-- omit in toc --> 
|参数名|类型|必须|默认值|说明|
|:---|:---:|:---:|:---:|:---|
|message|string|是|-|异常信息|
|code|number|否|-1|异常代码|
###### 返回 <!-- omit in toc --> 
Exception 实例

###### 示例代码 <!-- omit in toc --> 
```javascript
import { Exception } from 'vue3-utils'
const e = new Exception('invalid code', 400)
```

##### getCode  <!-- omit in toc --> 
获取异常代码
###### 返回 <!-- omit in toc --> 
number

###### 示例代码 <!-- omit in toc --> 
```javascript
import { Exception } from 'vue3-utils'
const e = new Exception('invalid code', 400)
console.log(e.getCode()) // 400
```

##### getMessage  <!-- omit in toc --> 
获取异常信息
###### 返回 <!-- omit in toc --> 
string

###### 示例代码 <!-- omit in toc --> 
```javascript
import { Exception } from 'vue3-utils'
const e = new Exception('invalid code', 400)
console.log(e.getMessage()) // invalid code
```

### CacheItem 缓存项
interface，缓存项，用于下述的Cache工具库
|属性名|类型|必须|说明|
|:---|:---:|:---:|:---|
|lifetime|number|是|缓存有效期, ms|
|data|any|是|缓存内容|

### ServicesHeader 调用接口headers选项
interface，Services invoke参数中headers的配置项
|属性名|类型|必须|说明|
|:---|:---:|:---:|:---|
|proxydatatype|string|否|指定该接口的参数以何种格式传递给后端，支持传入json, form以及query。json：转发时会以post+json形式发起请求（默认）；form：转发时会以post+form形式发起请求；query: 转发时会以get+querystring形式发起请求|

### ServicesOptions 调用接口选项
interface，Services invoke的参数类型
|属性名|类型|必须|说明|
|:---|:---:|:---:|:---|
|url|string|是|请求的url路径|
|data|object|是|请求的参数|
|service|string|否|service头内容|
|contentType|string|否|content-type头内容|
|type|string|否|请求方式, get, post，默认post|
|headers|object|否|http请求头对象|
|withCredentials|boolean|否|是否发送凭证|
|resType|ResponseType|否|返回类型，默认json|
|cache|number|否|正常响应的缓存时间，默认false，不缓存|

### SystemRet<T> 通用返回结构（移动端）
interface，通用返回结构（移动端）
|属性名|类型|必须|说明|
|:---|:---:|:---:|:---|
|status|number|是|状态值，200是正常，其它异常|
|msg|string|是|返回信息|
|data|T|是|返回数据|

### PCSystemRet<T> 通用返回结构（PC端）
interface，通用返回结构（PC端）
|属性名|类型|必须|说明|
|:---|:---:|:---:|:---|
|status|number|是|状态值，1是正常，其它异常|
|message|string|是|返回信息|
|data|T|是|返回数据|

### WeixinBridgeObject 微信jssdk的wx对象
interface，微信jssdk的wx对象
|属性名|类型|必须|说明|
|:---|:---:|:---:|:---|
|config|Function|是|验证方法|
|ready|Function|是|验证成功|
|error|Function|是|验证失败|
|checkJsApi|Function|是|查询是否有API的权限|
|具体的API|Function|是|参考微信公众号JSSDK的文档|

### DictItem 数据字典枚举项
interface，字典枚举项，用于下述的Dict实用类
|属性名|类型|必须|说明|
|:---|:---:|:---:|:---|
|key|StringOrNumber|是|枚举值|
|value|StringOrNumber|是|枚举内容|

### Dict 数据字典
interface，字典，用于下述的Dict实用类
|属性名|类型|必须|说明|
|:---|:---:|:---:|:---|
|name|string|是|字典名|
|enums|DictItem[]|是|字典枚举项列表|

### Env 环境变量
interface，环境变量，用于下述的Env实用类
|属性名|类型|必须|说明|
|:---|:---:|:---:|:---|
|name|string|是|变量名|
|value|StringOrNumber|是|变量值|

### MyTreeNode\<T\> 树形节点
interface，树节点，用于Util.listToTree
|属性名|类型|必须|说明|
|:---|:---:|:---:|:---|
|key|StringOrNumber|是|节点id|
|pKey|StringOrNumber|是|父节点id|
|title|string|是|节点名|
|isLeaf|boolean|是|是否叶子节点|
|visible|number|是|是否显示， 1显示|
|path|string|是|节点id构成的路径|
|data|T|是|节点数据|
|children|MyTreeNode\<T\>[]|是|子节点列表|
|disabled|boolean|是|是否禁用|

### RouteInfo 路由信息
interface，路由信息
|属性名|类型|必须|说明|
|:---|:---:|:---:|:---|
|name|string|是|路由名|
|path|string|是|路由路径|
|params|any|是|路由params对象|
|query|any|是|路由query对象|

### WXImageWatermark 微信图片水印
interface，微信图片水印
|属性名|类型|必须|说明|
|:---|:---:|:---:|:---|
|x|number|是|横坐标，从左上角算|
|y|number|是|纵坐标，从左上角算|
|fontSize|number|是|水印文字大小|
|text|string|是|水印文字|

### WXImage 微信图片
interface，微信图片对象
|属性名|类型|必须|说明|
|:---|:---:|:---:|:---|
|serverId|string|是|微信图片的serverId|
|watermarks|WXImageWatermark[]|是|水印列表|
|isPrivate|number|是|是否加密地址|

### ImageRet 图片服务器返回结构
interface，图片服务器返回的图片对象
|属性名|类型|必须|说明|
|:---|:---:|:---:|:---|
|state|string|是|状态|
|title|string|是|文件名|
|size|string|是|文件大小|
|url|string|是|文件url|

### WXChooseRes 微信图片选择结果
interface，微信jssdk的chooseImage结果对象
|属性名|类型|必须|说明|
|:---|:---:|:---:|:---|
|errMsg|string|是|结果信息|
|localIds|string[]|是|本地id列表|

### WXUploadRes 微信图片上传结果
interface，微信jssdk的uploadImage结果对象
|属性名|类型|必须|说明|
|:---|:---:|:---:|:---|
|errMsg|string|是|结果信息|
|serverId|string|是|服务器资源id列表|

### TimingStage Timing打点
interface，Timing实用类的打点对象
|属性名|类型|必须|说明|
|:---|:---:|:---:|:---|
|name|string|是|打点标记文字|
|time|string|是|打点时间|
|cost|number|是|距离上一次打点的耗时，ms|
|costFromStart|number|是|从instance时算起的耗时，ms|
|extra|any|是|打点传入的extra信息|

### RouterGuard 路由守卫类型
type, 用以描述路由守卫方法的参数
|参数名|类型|必须|说明|
|:---|:---:|:---:|:---|
|services|Services|是|服务API对象|
|from|RouteLocationNormalized|是|vue router的路由对象|
|to|RouteLocationNormalized|是|vue router的路由对象|
|next|Function|是|vue router的next方法|

## Util 实用工具
这是一个实用工具集对象，也是实用频率最高的一个API。使用前，需要import。
### untill 异步状态检查
Promise化的定时检查异步任务的方式，等待异步完成的方法，通常配合await / async使用。如在无法注入已经存在的异步回调的情况下，可以使用该方法进行判断具体的异步事务是否已经完成。
#### 方法参数 <!-- omit in toc --> 
|参数名|类型|必须|默认值|说明|
|:---|:---:|:---:|:---:|:---|
|cb|function|是|-|用于检测具体任务是否完成，如完成则return一个任意值，只要没有return任意值，则继续等待|
|intv|number|否|10|检查频率，单位毫秒|
|maxTimes|number|否|100|最大检查次数|

#### 返回 <!-- omit in toc --> 
Promise

#### 示例代码 <!-- omit in toc --> 
```javascript
import { Util } from 'vue3-utils'


let somethingIsReady = false
// 模拟异步任务，2秒后成功
setTimeout(() => {
    somethingIsReady = true
}, 2000)

console.log('somethingIsReady: no')
// 定时检查是否完成
Util.untill(
    () => {
        if (somethingIsReady) {
            return true
        }
    },
    10,
    20000
).then(() => {
    console.log('somethingIsReady: yes')// 两秒后输出
})

```
<br />

### isWeixinClient 判断是否微信客户端
判断是否微信客户端(排除企业微信客户端)
#### 方法参数 <!-- omit in toc --> 
无

#### 返回 <!-- omit in toc --> 
boolean

#### 示例代码 <!-- omit in toc --> 
```javascript
import { Util } from 'vue3-utils'

if (Util.isWeixinClient()) {
    console.log('现在客户端是微信客户端')
}
```
<br />

### setTitle 设置页面title内容
设置页面title内容（即浏览器标签栏或移动端的标题栏内容）

#### 方法参数 <!-- omit in toc --> 
|参数名|类型|必须|默认值|说明|
|:---|:---:|:---:|:---:|:---|
|title|string|是|-|标题内容|

#### 返回 <!-- omit in toc --> 
无

#### 示例代码 <!-- omit in toc --> 
```javascript
import { Util } from 'vue3-utils'

Util.setTitle('标题内容')
```
<br />

### clone 克隆对象
克隆对象，用于避免操作新对象，会引起源对象变更时候使用

#### 方法参数 <!-- omit in toc --> 
|参数名|类型|必须|默认值|说明|
|:---|:---:|:---:|:---:|:---|
|obj|any|是|-|标题内容|

#### 返回 <!-- omit in toc --> 
|参数名|类型|说明|
|:---|:---:|:---|
|obj|any|复制后的对象|

#### 示例代码 <!-- omit in toc --> 
```javascript
import { Util } from 'vue3-utils'

const obj1 = { a: 1, b: 2 }
const obj2 = Util.clone(obj1)
const obj3 = obj1
obj2.a = 3
console.log(obj1) // { a: 1, b: 2 }
console.log(obj2) // { a: 3, b: 2 } 不会修改obj1.a的内容，因为clone方法是拷贝一个新的对象，不是对obj1的引用

obj3.a = 4
console.log(obj1) // { a: 4, b: 2 }
console.log(obj3) // { a: 4, b: 2 } 会修改obj1.a的内容，因为js是面向对象的，赋值默认是传引用
```
<br />

### promiseScriptLoader 异步加载外部script
Promise化的异步加载外部的javascript，在引入jssdk，地图jsapi，统计js等场景下需要。须确保引入的地址是可信的，官方的，以防被投毒。

#### 方法参数 <!-- omit in toc --> 
|参数名|类型|必须|默认值|说明|
|:---|:---:|:---:|:---:|:---|
|url|string|是|-|js链接地址|

#### 返回 <!-- omit in toc --> 
Promise

#### 示例代码 <!-- omit in toc --> 
```javascript
import { Util } from 'vue3-utils'

Util.promiseScriptLoader('http://xxxx.com/xxx.js').then(() => {
    console.log('loaded') // 加载成功，可以访问里面的内容或API
}).catch(() => {
    console.log('error loaded') // 加载失败
})
```
<br />

### sleep 延迟执行
Promise化的延迟执行。

#### 方法参数 <!-- omit in toc --> 
|参数名|类型|必须|默认值|说明|
|:---|:---:|:---:|:---:|:---|
|msec|number|是|-|延迟时长，毫秒|

#### 返回 <!-- omit in toc --> 
Promise

#### 示例代码 <!-- omit in toc --> 
```javascript
import { Util } from 'vue3-utils'

// 延迟两秒执行
Util.sleep(2000).then(() => {
    console.log('ok')
})
```
<br />

### getQueryString 获取url参数
获取当前页面url或指定url里的query参数内容()

#### 方法参数 <!-- omit in toc --> 
|参数名|类型|必须|默认值|说明|
|:---|:---:|:---:|:---:|:---|
|name|string|是|-|参数名|
|url|string|否|当前页面url|需要解析的url参数， 形如'?a=1&b=2'|

#### 返回 <!-- omit in toc --> 
string

#### 示例代码 <!-- omit in toc --> 
```javascript
import { Util } from 'vue3-utils'

console.log(Util.getQueryString('a', '?a=1&b=2')) // 1
```
<br />

### currentUrl 获取当前url
获取当前页面url，不含hash部分

#### 方法参数 <!-- omit in toc --> 
无

#### 返回 <!-- omit in toc --> 
string

#### 示例代码 <!-- omit in toc --> 
```javascript
import { Util } from 'vue3-utils'

console.log(Util.currentUrl()) // http://localhost:9090/?no_loading=1&code=silentsea001
```
<br />

### currentPath 获取当前路径
获取当前host+路径

#### 方法参数 <!-- omit in toc --> 
无

#### 返回 <!-- omit in toc --> 
string

#### 示例代码 <!-- omit in toc --> 
```javascript
import { Util } from 'vue3-utils'

console.log(Util.currentPath()) // http://localhost:9090/
```
<br />

### setQueStr 设置uri参数
设置url里指定的参数值

#### 方法参数 <!-- omit in toc --> 
|参数名|类型|必须|默认值|说明|
|:---|:---:|:---:|:---:|:---|
|url|string|是|-|url|
|ref|string|是|-|要设置的参数名|
|value|string number|是|-|要设置的参数值|

#### 返回 <!-- omit in toc --> 
string

#### 示例代码 <!-- omit in toc --> 
```javascript
import { Util } from 'vue3-utils'

console.log(Util.setQueStr('http://test.com/?a=1&b=2', 'a', '9')) // http://test.com/?a=9&b=2
```
<br />

### delQueStr 删除uri参数
删除url里指定的参数值

#### 方法参数 <!-- omit in toc --> 
|参数名|类型|必须|默认值|说明|
|:---|:---:|:---:|:---:|:---|
|url|string|是|-|url|
|ref|string|是|-|要删除的参数名|

#### 返回 <!-- omit in toc --> 
string

#### 示例代码 <!-- omit in toc --> 
```javascript
import { Util } from 'vue3-utils'

console.log(Util.delQueStr('http://test.com/?a=1&b=2', 'a')) // http://test.com/?b=2
```
<br />

### oauth 公众号/企业微信授权
公众号或企业微信的oauth认证链接构造或重定向

#### 方法参数 <!-- omit in toc --> 
|参数名|类型|必须|默认值|说明|
|:---|:---:|:---:|:---:|:---|
|path|string|是|-|授权后跳转路径或完整url|
|returnUrl|boolean|是|-|是否返回构造的url，如false则直接发起重定向|
|hideLoading|boolean|是|-|是否在回调url中设置no_loading=1参数|

#### 返回 <!-- omit in toc --> 
string或重定向

#### 示例代码 <!-- omit in toc --> 
```javascript
import { Util } from 'vue3-utils'

console.log(Util.oauth('http://test.com/?a=1&b=2', true, false)) // http://192.170.200.9:9898/wxwork/cgi-bin/public/oauth.html?appid=wxad5f4041fd5c0992&redirect_uri=aHR0cCUzQSUyRiUyRnRlc3QuY29tJTJGJTNGYSUzRDElMjZiJTNEMg%3D%3D&response_type=code&scope=snsapi_userinfo&state=stamp_oauth#wechat_redirect
// 此oauth url为模拟oauth的地址，生产为微信端提供的oauth地址https://open.weixin.qq.com/connect/oauth2/authorize
```
<br />

### jssdk jssdk实例化
用于初始化微信JSSDK及完成相应页面验证，并返回微信JSSDK对象，建议在pinia store中定义action，提供给vue等调用

#### 方法参数 <!-- omit in toc --> 
|参数名|类型|必须|默认值|说明|
|:---|:---:|:---:|:---:|:---|
|services|Services|是|-|API服务对象|
|apiList|string[]|是|-|需要获取的JSSDK权限|

#### 返回 <!-- omit in toc --> 
Promise\<WeixinBridgeObject\>

#### 示例代码 <!-- omit in toc --> 
```javascript
import { Services, Util } from 'vue3-utils'
import services from '../lib/services' // 此为具体项目中用于实例化Services对象的文件

jssdk() {
    return new Promise<WeixinBridgeObject>((resolve, reject) => {
        Util.jssdk(services, Env.get('JSSDK_API').split(','))
            .then((wx) => {
                resolve(wx)
            })
            .catch(() => {
                reject(false)
            })
    })
}
```
<br />

### listToTree
数组转树形结构

#### 方法参数 <!-- omit in toc --> 
泛型 T： 传入用于描述数组对象的interface或者class
|参数名|类型|必须|默认值|说明|
|:---|:---:|:---:|:---:|:---|
|arr|T[]|是|-|对象数组|
|id|string|是|-|id属性名|
|pId|string|是|-|父id属性名|
|title|string|是|-|节点标题属性名|
|visible|string|是|-|是否显示属性名|
|filter|Function|是|-|过滤方法，提供给调用侧控制特定节点是否要被过滤掉，方法返回ture表示允许加入到树，反之则被过滤|
|topPid|StringOrNumber|否|-|顶级节点的id，如不传入，则自动筛选出无对应pid的节点，作为顶层节点|

#### 返回 <!-- omit in toc --> 
MyTreeNode<T>[]

#### 示例代码 <!-- omit in toc --> 
```javascript
import { Util } from 'vue3-utils'
// 此处仅为更好描述传入listToTree的泛型结构，开发中不建议此处定义，而应该在单独的d.ts中定义并引入
interface RawMenuItem {
    id: number
    menuName: string
    moduleId: string | null
    parentId: number
    sort: number
    htmlUrl: string
    jsUrl: string
    url: string
    icon: string
    menuType: string
    visible: number
    perms: string
    descn: string
    menuId: number
    prefixedName: string
    routeName: string
}
const menuList: RawMenuItem[] = [] // 数组对象
const menuTree = Util.listToTree<RawMenuItem>(
                    menuList,
                    'id',
                    'parentId',
                    'menuName',
                    'visible',
                    () => {
                        return true
                    })
```
<br />

### ucwords
对传入字符串的首字母大写，并将剩余字符小写

#### 方法参数 <!-- omit in toc --> 
|参数名|类型|必须|默认值|说明|
|:---|:---:|:---:|:---:|:---|
|str|string|是|-|需要转换的字符串|

#### 返回 <!-- omit in toc --> 
string

#### 示例代码 <!-- omit in toc --> 
```javascript
import { Util } from 'vue3-utils'
var str = 'sadKLSAaskl'
console.log(Util.ucwords(str)) // 'Sadklsaaskl'
```
<br />

### urlToPascalCase
对传入url字符串转换成Pascal形式，即abc/def/ghi => Abc[glue]Def[glue]Ghi

#### 方法参数 <!-- omit in toc --> 
|参数名|类型|必须|默认值|说明|
|:---|:---:|:---:|:---:|:---|
|url|string|是|-|需要转换的url字符串|
|glue|string|否|-|连接的字符，默认是“-”|

#### 返回 <!-- omit in toc --> 
string

#### 示例代码 <!-- omit in toc --> 
```javascript
import { Util } from 'vue3-utils'
const url = 'outsourcing/driver/form'
console.log(Util.urlToPascalCase(url, '-')) // Outsourcing-Driver-Form
```
<br />

### objToUrl
对象转url参数

#### 方法参数 <!-- omit in toc --> 
泛型 T： 传入用于描述对象的interface或者class
|参数名|类型|必须|默认值|说明|
|:---|:---:|:---:|:---:|:---|
|obj|T|是|-|需要转换的对象|

#### 返回 <!-- omit in toc --> 
string[]

#### 示例代码 <!-- omit in toc --> 
```javascript
import { Util } from 'vue3-utils'
// 此处仅为更好描述传入objToUrl的泛型结构，开发中不建议此处定义，而应该在单独的d.ts中定义并引入
interface Params {
    beginDate: string
    endDate: string
    status: string
}
const params: Params = {
    beginDate: '2023-08-12',
    endDate: '2023-08-31',
    status: '1'
}
console.log(Util.objToUrl(params)) //  ['beginDate=2023-08-12', 'endDate=2023-08-31', 'status=1']
```
<br />

### redirect
重定向到指定链接，可以用于跳转到外部系统，或者执行导出

#### 方法参数 <!-- omit in toc --> 
|参数名|类型|必须|默认值|说明|
|:---|:---:|:---:|:---:|:---|
|url|string|是|-|指定链接|

#### 返回 <!-- omit in toc --> 
无

#### 示例代码 <!-- omit in toc --> 
```javascript
import { Util } from 'vue3-utils'
Util.redirect('http://www.baidu.com')
```
<br />

### assignAttrs
批量设置给定泛型T的对象属性

#### 方法参数 <!-- omit in toc --> 
|参数名|类型|必须|默认值|说明|
|:---|:---:|:---:|:---:|:---|
|target|T|是|-|目标对象，即被设置的对象|
|source|T|是|-|源对象，即取值的对象|
|filter|Function|否|-|过滤方法，需提供两个参数，分别接受遍历源对象里的key和value，返回值会设置到目标对象的key对应的value中|

#### 返回 <!-- omit in toc --> 
无

#### 示例代码 <!-- omit in toc --> 
```javascript
import { Util } from 'vue3-utils'
// 此处仅为更好描述传入assignAttrs的泛型结构，开发中不建议此处定义，而应该在单独的d.ts中定义并引入
interface Params {
    beginDate: string
    endDate: string
    status: string
}
const params1: Params = {
    beginDate: '2023-08-12',
    endDate: '2023-08-31',
    status: '1'
}
const params2: Params = {
    beginDate: '2023-08-12',
    endDate: '2023-08-31',
    status: '2'
}
Util.assignAttrs<Params>(params1, params2) 
console.log(params1) // {beginDate: '2023-08-12', endDate: '2023-08-31', status: '2'}
```
<br />

### xss
xss过滤

#### 方法参数 <!-- omit in toc --> 
|参数名|类型|必须|默认值|说明|
|:---|:---:|:---:|:---:|:---|
|str|string|是|-|需要过滤的字符串|
|options|IFilterXSSOptions \| undefined|是|-|xss库的过滤选项，详情请看xss库文档|

#### 返回 <!-- omit in toc --> 
字符串

#### 示例代码 <!-- omit in toc --> 
```javascript
import { Util } from 'vue3-utils'

const str = '<span>1</span>'
console.log(Util.xss(str, undefined)) 
```
<br />

### randomInt
返回给定范围(含)内的一个随机的整数

#### 方法参数 <!-- omit in toc --> 
|参数名|类型|必须|默认值|说明|
|:---|:---:|:---:|:---:|:---|
|min|number|是|-|最小值(含)|
|max|number|是|-|最大值(含)|

#### 返回 <!-- omit in toc --> 
number

#### 示例代码 <!-- omit in toc --> 
```javascript
import { Util } from 'vue3-utils'

console.log(Util.randomInt(1, 5)) // 返回1至5的随机整数
```
<br />

### exportCSV
导出数据成csv文件

#### 方法参数 <!-- omit in toc --> 
|参数名|类型|必须|默认值|说明|
|:---|:---:|:---:|:---:|:---|
|data|any[]|是|-|数据|
|fileName|string|是|-|文件名|

#### 返回 <!-- omit in toc --> 
无

#### 示例代码 <!-- omit in toc --> 
```javascript
import { Util } from 'vue3-utils'

console.log(Util.exportCSV([[1, 2, 3], [4, 5, 6]]), 'test.csv') //
```
<br />

### getDeviceResolution
获取设备宽高

#### 方法参数 <!-- omit in toc --> 
无

#### 返回 <!-- omit in toc --> 
|参数名|类型|必须|默认值|说明|
|:---|:---:|:---:|:---:|:---|
|width|StringOrNumber|是|-|宽度|
|height|StringOrNumber|是|-|高度|

#### 示例代码 <!-- omit in toc --> 
```javascript
import { Util } from 'vue3-utils'

console.log(Util.getDeviceResolution() //
```
<br />

### findItem
查询列表中满足条件的元素

#### 方法参数 <!-- omit in toc --> 
|参数名|类型|必须|默认值|说明|
|:---|:---:|:---:|:---:|:---|
|data|T[]|是|-|数据列表|
|attr|string|是|-|条件属性名|
|value|any|是|-|条件值|

#### 返回 <!-- omit in toc --> 
T[]

#### 示例代码 <!-- omit in toc --> 
```javascript
import { Util } from 'vue3-utils'

interface TestItem {
    name: string
}

const list:TestItem[] = [{name: 'a'}, {name: 'b'}]

console.log(Util.findItem<TestItem>(list, 'name', 'b'))// [{name: 'b'}]
```
<br />

## Acc
这是一个用于精确计算的工具类。因为众所周知的原因，原生js进行计算会出现意想不到的结果，所以需要定义一个符合运算结果的方式来实现。
### add, sub, mul, div
分别为加法，减法，乘法，除法
#### 方法参数 <!-- omit in toc --> 
|参数名|类型|必须|默认值|说明|
|:---|:---:|:---:|:---:|:---|
|a|StringOrNumber|是|-|运算参数a|
|b|StringOrNumber|是|-|运算参数b|

#### 返回 <!-- omit in toc --> 
number

#### 示例代码 <!-- omit in toc --> 
```javascript
import { Acc } from 'vue3-utils'

console.log(Acc.add(1, '2')) // 3
console.log(Acc.sub(10, 2)) // 8
console.log(Acc.mul('2', '2')) // 4
console.log(Acc.div('2', 4)) // 0.5
```
<br />

## Cache
这是一个用于操作浏览器缓存的工具类。存储介质是基于localStorage
### set
设置缓存
#### 方法参数 <!-- omit in toc --> 
|参数名|类型|必须|默认值|说明|
|:---|:---:|:---:|:---:|:---|
|key|string|是|-|缓存key名|
|data|any|是|-|缓存内容|
|expire|number|是|-|缓存有效期，毫秒|

#### 返回 <!-- omit in toc --> 
无

#### 示例代码 <!-- omit in toc --> 
合并到最后描述
<br />

### get
读取缓存
#### 方法参数 <!-- omit in toc --> 
|参数名|类型|必须|默认值|说明|
|:---|:---:|:---:|:---:|:---|
|key|string|是|-|缓存key名|

#### 返回 <!-- omit in toc --> 
any

#### 示例代码 <!-- omit in toc --> 
合并到最后描述
<br />

### remove
删除缓存
#### 方法参数 <!-- omit in toc --> 
|参数名|类型|必须|默认值|说明|
|:---|:---:|:---:|:---:|:---|
|key|string|是|-|缓存key名|

#### 返回 <!-- omit in toc --> 
any

#### 示例代码 <!-- omit in toc --> 
```javascript
import { Cache, Util } from 'vue3-utils'
/** 
 * 有效期内及有效期外读取
 */
const cacheKey = 'username'
const cacheValue = 'Tommy'

Cache.set(cacheKey, cacheValue, 10000) // 设置一个缓存，有效期为10s
console.log(Cache.get(cacheKey)) // 'Tommy'
Util.sleep(11000).then(() => {
    console.log(Cache.get(cacheKey)) // null
})

/** 
 * 删除前后读取
 */
const cacheKey = 'username'
const cacheValue = 'Tommy'

Cache.set(cacheKey, cacheValue, 10000) // 设置一个缓存，有效期为10s
console.log(Cache.get(cacheKey)) // 'Tommy'
Cache.remove(cacheKey) // 删除指定cache
console.log(Cache.get(cacheKey)) // null
```
<br />

## Datetime
这是一个用于获取日期的实用类
### today
获取今天日期
#### 方法参数 <!-- omit in toc --> 
无

#### 返回 <!-- omit in toc --> 
string

#### 示例代码 <!-- omit in toc --> 
```javascript
import { Datetime } from 'vue3-utils'
console.log(Datetime.today()) // 当天日期： YYYY-MM-DD
```
<br />

### format
格式化日期
#### 方法参数 <!-- omit in toc --> 
|参数名|类型|必须|默认值|说明|
|:---|:---:|:---:|:---:|:---|
|dateStr|string|是|-|日期字符串|
|format|string|是|-|日期格式，如YYYY-MM-DD|

#### 返回 <!-- omit in toc --> 
string

#### 示例代码 <!-- omit in toc --> 
```javascript
import { Datetime } from 'vue3-utils'
console.log(Datetime.format('2018-12-21 20:00:12', 'YYYY-MM-DD')) // 2018-12-21
```
<br />

## Dict
这是一个字典操作的实用类。注意，这个是没有使用命名空间方式实现的，而是直接暴露了具体的操作方法
### dict
获取字典的枚举值
#### 方法参数 <!-- omit in toc --> 
|参数名|类型|必须|默认值|说明|
|:---|:---:|:---:|:---:|:---|
|dictName|string|是|-|字典名|
|key|StringOrNumber|是|-|字典枚举的key|

#### 返回 <!-- omit in toc --> 
StringOrNumber

#### 示例代码 <!-- omit in toc --> 
合并到最后描述
<br />

### getDict
获取字典，常用于输出字典选项列表
#### 方法参数 <!-- omit in toc --> 
|参数名|类型|必须|默认值|说明|
|:---|:---:|:---:|:---:|:---|
|dictName|string|是|-|字典名|

#### 返回 <!-- omit in toc --> 
DictItem[]

#### 示例代码 <!-- omit in toc --> 
合并到最后描述
<br />

### addDict
增加字典
#### 方法参数 <!-- omit in toc --> 
|参数名|类型|必须|默认值|说明|
|:---|:---:|:---:|:---:|:---|
|dict|Dict|是|-|字典|

#### 返回 <!-- omit in toc --> 
无

#### 示例代码 <!-- omit in toc --> 
```javascript
import type { Dict } from 'vue3-utils/@types'
import { dict, getDict, addDict } from 'vue3-utils'

const newDict:Dict = {
    name: 'serviceType',
    enums: [
        { key: '1', value: '上门' },
        { key: '2', value: '自提' }
    ]
}

addDict(newDict) // 写入一个字典
console.log(getDict('serviceType')) // [ { key: '1', value: '上门' }, { key: '2', value: '自提' } ]
console.log(dict('serviceType', '1')) // 上门
```
<br />

## Env
这是一个用于操作环境变量的实用类，常用于项目读取环境配置，并设置到环境变量，以便于vue3-utils内部使用，项目中也可以使用
### set
设置环境变量
#### 方法参数 <!-- omit in toc --> 
|参数名|类型|必须|默认值|说明|
|:---|:---:|:---:|:---:|:---|
|name|string|是|-|变量名|
|value|StringOrNumber|是|-|变量值|

#### 返回 <!-- omit in toc --> 
无
#### 示例代码 <!-- omit in toc --> 
```javascript
import { Env } from 'vue3-utils'

Env.set('DEBUG', 'disabled')
```
<br />

### get
获取环境变量
#### 方法参数 <!-- omit in toc --> 
|参数名|类型|必须|默认值|说明|
|:---|:---:|:---:|:---:|:---|
|name|string|是|-|变量名|
|defaultValue|StringOrNumber|否|''|默认值，当读取没有设置的变量时，返回该值|

#### 返回 <!-- omit in toc --> 
无
#### 示例代码 <!-- omit in toc --> 
```javascript
import { Env } from 'vue3-utils'

console.log(Env.get('DEBUG', 'empty content')) // 'empty content'
Env.set('DEBUG', 'disabled')
console.log(Env.get('DEBUG', 'empty content')) // 'disabled'
```
<br />

## ImageUtil
这是一个用于上传微信图片的实用工具类
### 构造方法
实例化
#### 方法参数 <!-- omit in toc --> 
|参数名|类型|必须|默认值|说明|
|:---|:---:|:---:|:---:|:---|
|services|Services|是|-|API服务对象|
|wx|WeixinBridgeObject|是|-|微信JSSDK对象|

#### 返回 <!-- omit in toc --> 
无
#### 示例代码 <!-- omit in toc --> 
```javascript
import { ImageUtil } from 'vue3-utils'
import services from '@/lib/services'

// 假设在commonStore中实现了jssdk实例化
commonStore
    .jssdk()
    .then((wx: WeixinBridgeObject) => {
        imageUtil = new ImageUtil(services, wx)
    })
    .catch(() => {
        // jssdk 实例化失败
    })
```
<br />

### chooseImage
调起微信jssdk的选择图片
#### 方法参数 <!-- omit in toc --> 
|参数名|类型|必须|默认值|说明|
|:---|:---:|:---:|:---:|:---|
|params|{ count: number }|是|-|参数对象，count为最大允许选择图片数量|

#### 返回 <!-- omit in toc --> 
Promise<string[]>: localId的字符串数组
#### 示例代码 <!-- omit in toc --> 
```javascript
imageUtil.chooseImage({ count: 3 }).then( (localIds: string[]) => {
    console.log(localIds)  
})
```
<br />

### uploadImageToWX
上传至微信服务器，默认支持批量
#### 方法参数 <!-- omit in toc --> 
|参数名|类型|必须|默认值|说明|
|:---|:---:|:---:|:---:|:---|
|params|{ localIds: string[], onProgress?: (index: number, localId: string, result: boolean) => void, isShowProgressTips: number }|是|-|参数对象，localIds为本地资源id，onProgress是上传过程的回调，isShowProgressTips是否显示上传进度|

#### 返回 <!-- omit in toc --> 
Promise<string[]>: serverId的字符串数组
#### 示例代码 <!-- omit in toc --> 
```javascript
imageUtil
    .uploadImageToWX({
        localIds: [image.localId],
        isShowProgressTips: isShowProgressTips.value })
        .then((serverIds: string[]) => {
            console.log(serverIds)    
        })
        .catch((e) => {
            console.error('upload to wx error: ' + JSON.stringify(e))
        })
```
<br />

### uploadImageToServer
上传至图片服务器（实际上是经过node网关拉取微信服务器的资源，并上传到图片服务器）
#### 方法参数 <!-- omit in toc --> 
|参数名|类型|必须|默认值|说明|
|:---|:---:|:---:|:---:|:---|
|params|{pics: WXImage[], onProgress?: (index: number, pic: WXImage, result: boolean) => void, url?: string, convert?: boolean}|是|-|参数对象，pics为WXImage的列表，onProgress是上传过程的回调，url是上传api的地址，默认为wx/media/upload, convert是对返回的图片地址是否进行内外网地址转换|

#### 返回 <!-- omit in toc --> 
Promise<ImageRet[]>: 图片上传结果对象
#### 示例代码 <!-- omit in toc --> 
```javascript
imageUtil
    .uploadImageToServer({ pics, convert: true })
    .then((uploaded: ImageRet[]) => {                   
    })
    .catch((e) => {
        console.error('upload to server error: ' + JSON.stringify(e))
    })
```
<br />

## Locker
这是一个用于锁定/解锁用户操作的实用工具类，包括用户返回，用户滚动等
### lockBack, releaseBack, lockScroll, releaseScroll
分别为锁定用户返回，解锁用户返回，锁定用户滚动，解锁用户滚动
#### 方法参数 <!-- omit in toc --> 
无
#### 返回 <!-- omit in toc --> 
无
#### 示例代码 <!-- omit in toc --> 
```javascript
import { Locker } from 'vue3-utils'
const l = Locker.instance()
l.lockBack() // 锁定用户返回
l.releaseBack() // 解锁用户返回
l.lockScroll() // 锁定用户滚动
l.releaseScroll() // 解锁用户滚动
```
<br />

## Pay
这是一个用于发起微信支付的实用工具类
### invoke
发起微信支付
#### 方法参数 <!-- omit in toc --> 
|参数名|类型|必须|默认值|说明|
|:---|:---:|:---:|:---:|:---|
|router|Router|是|-|vue-router对象|
|options|{ paramMap: string, successRoute: RouteInfo, failRoute: RouteInfo }|是|-|paramMap是支付参数对象，由后端接口返回，successRoute是支付成功后跳转的路由，failRoute是支付失败后跳转的路由|
#### 返回 <!-- omit in toc --> 
无
#### 示例代码 <!-- omit in toc --> 
```javascript
import router from '@/router'
import { Pay } from 'vue3-utils'

// 请求后端接口，获取支付参数
const ret = await crossDistrictStore.createPay({
    mailNo: orderInfo.value.mailNo
})

Pay.instance().invoke(router, {
    paramMap: ret.paramMap,
    successRoute: {
        name: 'CrossDistrict/PayResult',
        path: '',
        params: {
            orderId: orderInfo.value.orderId,
            result: 'success'
        },
        query: {}
    },
    failRoute: {
        name: 'CrossDistrict/PayResult',
        path: '',
        params: {
            orderId: orderInfo.value.orderId,
            result: 'fail'
        },
        query: {}
    }
})
```

## Services
这是一个用于发起接口调用的类，基于axios实现
### invoke 
发起调用
#### 方法参数 <!-- omit in toc --> 
|参数名|类型|必须|默认值|说明|
|:---|:---:|:---:|:---:|:---|
|options|ServicesOptions|是|-|ServicesOptions对象|
#### 返回 <!-- omit in toc --> 
无
#### 示例代码 <!-- omit in toc --> 
```javascript
import { Services } from 'vue3-utils'

const services = new Services()

/**
 * 设置全局请求头
 */
services.setBasicSetting('headers', {
    clientId: import.meta.env.VITE_CLIENT_ID
})

const ret = (await services.invoke({
    url: servicePrefix + 'wx/proxy/outsdriver/manage/current/role',
        data: {
            userId: '',
            mobile: ''
        }
    })) as SystemRet<UserInfo>

if (ret.status !== Services.NORMAL_STATUS) {
   throw new Exception(ret.msg, ret.status)
}
```
<br />

### setBasicSetting
设置默认配置
#### 方法参数 <!-- omit in toc --> 
|参数名|类型|必须|默认值|说明|
|:---|:---:|:---:|:---:|:---|
|type|string|是|-|配置类型, 支持 headers, beforeRequestHandler, httpExceptionHandler|
|value|any|是|-|配置内容， 当type为xxHandler时，需要传入方法|
#### 返回 <!-- omit in toc --> 
无
#### 示例代码 <!-- omit in toc --> 
```javascript
import { Services } from 'vue3-utils'

const services = new Services()

/**
 * 设置全局请求头
 */
services.setBasicSetting('headers', {
    clientId: import.meta.env.VITE_CLIENT_ID
})
```
<br />

## RouterExtender
对vue-router对象的扩展，次扩展仅提供一个方法，即RouterExtender，用于集成RouterGuard到路由的跳转钩子中，实现路由守卫的功能。在权限控制，通用属性获取等场景下能提供便利的开发模式。
### 方法参数 <!-- omit in toc --> 
|参数名|类型|必须|默认值|说明|
|:---|:---:|:---:|:---:|:---|
|router|Router|是|-|vue-router对象|
|services|Services|是|-|API服务对象|
|onError|Function|是|-|异常回调方法，当路由守卫reject时调用|
### 返回 <!-- omit in toc --> 
无
### 示例代码 <!-- omit in toc --> 
```javascript
import { createRouter, createWebHashHistory } from 'vue-router'
import services from '@/lib/services'

const router = createRouter({
    history: createWebHashHistory(),
    routes: []// 此处省略路由定义
})

RouterExtender(router, services, (e: Exception) => {
    if (e.getCode() === 404) {
        router.push({ name: 'not-found' })
    }
})
```
<br />

## StringUtil
通用字符串实用工具类
### numberFormat 
数值格式化
#### 方法参数 <!-- omit in toc --> 
|参数名|类型|必须|默认值|说明|
|:---|:---:|:---:|:---:|:---|
|oldNumber|StringOrNumber|是|-|vue-router对象|
|digit|number|否|2|保留位数|
|round|boolean|否|true|末位是否四舍五入，否则floor|
#### 返回 <!-- omit in toc --> 
number
#### 示例代码 <!-- omit in toc --> 
```javascript
import { StringUtil } from 'vue3-utils'

console.log(StringUtil.numberFormat('200.2151231', 2, true)) //200.22
```
<br />

### priceFormat 
金额格式化
#### 方法参数 <!-- omit in toc --> 
|参数名|类型|必须|默认值|说明|
|:---|:---:|:---:|:---:|:---|
|oldValue|StringOrNumber|是|-|vue-router对象|
|digit|number|否|2|保留位数|
|symbol|string|否|''|货币符号|
|division|string|否|''|千位分隔符|
#### 返回 <!-- omit in toc --> 
string
#### 示例代码 <!-- omit in toc --> 
```javascript
import { StringUtil } from 'vue3-utils'

console.log(StringUtil.priceFormat('200221.2151231', 2, '￥', ',')) //￥200,221.22
```
<br />

### startWith 
判断给定字符串是否以指定字符串开头(大小写敏感)
#### 方法参数 <!-- omit in toc --> 
|参数名|类型|必须|默认值|说明|
|:---|:---:|:---:|:---:|:---|
|str|string|是|-|给定字符串|
|search|string|是|-|查询字符串|
#### 返回 <!-- omit in toc --> 
boolean
#### 示例代码 <!-- omit in toc --> 
```javascript
import { StringUtil } from 'vue3-utils'

console.log(StringUtil.startWith('Whoareyou', 'Who')) // true
console.log(StringUtil.startWith('Whoareyou', 'who')) // false
```
<br />

### endWith 
判断给定字符串是否以指定字符串结尾(大小写敏感)
#### 方法参数 <!-- omit in toc --> 
|参数名|类型|必须|默认值|说明|
|:---|:---:|:---:|:---:|:---|
|str|string|是|-|给定字符串|
|search|string|是|-|查询字符串|
#### 返回 <!-- omit in toc --> 
boolean
#### 示例代码 <!-- omit in toc --> 
```javascript
import { StringUtil } from 'vue3-utils'

console.log(StringUtil.endWith('WhoareYou', 'You')) // true
console.log(StringUtil.endWith('WhoareYou', 'you')) // false
```
<br />

### convertCurrency 
将阿拉伯数字的金额转换成中文大小写金额
#### 方法参数 <!-- omit in toc --> 
|参数名|类型|必须|默认值|说明|
|:---|:---:|:---:|:---:|:---|
|currencyDigits|StringOrNumber|是|-|阿拉伯数字的金额|
#### 返回 <!-- omit in toc --> 
string
#### 示例代码 <!-- omit in toc --> 
```javascript
import { StringUtil } from 'vue3-utils'

console.log(StringUtil.convertCurrency('57892.12')) // 伍万柒仟捌佰玖拾贰元壹角贰分
```
<br />

## Timing
时间评估实用工具类，用于评估代码块的执行时间
### instance
获取实例
#### 方法参数 <!-- omit in toc --> 
|参数名|类型|必须|默认值|说明|
|:---|:---:|:---:|:---:|:---|
|name|string|是|-|实例标识名|
#### 返回 <!-- omit in toc --> 
Timing
#### 示例代码 <!-- omit in toc --> 
```javascript
import { Timing } from 'vue3-utils' // 或gzpost-desktop-for-vue3

Timing.instance('test')  // 参数是用来标识实例的
```
<br />

### tick
计时打点
#### 方法参数 <!-- omit in toc --> 
|参数名|类型|必须|默认值|说明|
|:---|:---:|:---:|:---:|:---|
|stage|string|是|-|打点名字|
|extra|any|否|-|打点参数|
#### 返回 <!-- omit in toc --> 
无
#### 示例代码 <!-- omit in toc --> 
```javascript
import { Timing } from 'vue3-utils' // 或gzpost-desktop-for-vue3

Timing.instance('test').tick('用户登录', {username: 'Johnny'}) // 
```
<br />

### report
在浏览器控制台中输出报告
#### 方法参数 <!-- omit in toc --> 
无
#### 返回 <!-- omit in toc --> 
无
#### 示例代码 <!-- omit in toc --> 
```javascript
import { Timing } from 'vue3-utils' // 或gzpost-desktop-for-vue3

Timing.instance('test').report() // 输出报告，在控制台查看
```
<br />

## Validator
通用格式或类型验证实用工具类
### isEmptyObject
是否空对象
#### 方法参数 <!-- omit in toc --> 
|参数名|类型|必须|默认值|说明|
|:---|:---:|:---:|:---:|:---|
|obj|any|是|-|待校验对象|
#### 返回 <!-- omit in toc --> 
boolean
#### 示例代码 <!-- omit in toc --> 
```javascript
import { Validator } from 'vue3-utils'

console.log(Validator.isEmptyObject({})) // true
console.log(Validator.isEmptyObject({a : 1})) // false
```
<br />

### isNumeric
是否合法整数，如果是合法数字，将转换成整数返回
#### 方法参数 <!-- omit in toc --> 
|参数名|类型|必须|默认值|说明|
|:---|:---:|:---:|:---:|:---|
|val|any|是|-|待校验对象|
#### 返回 <!-- omit in toc --> 
number: 当val为非0的其它数字<br/>
NaN: 当val不是数字<br/>
true: 当val是0<br/>
因此可以简单判断if(Validator.isNumeric(val))即可
#### 示例代码 <!-- omit in toc --> 
```javascript
import { Validator } from 'vue3-utils'

console.log(Validator.isNumeric('a')) // NaN
console.log(Validator.isNumeric('1')) // 1
console.log(Validator.isNumeric('-1.1')) // -1
console.log(Validator.isNumeric('0')) // true
```
<br />

### isString
是否是字符串
#### 方法参数 <!-- omit in toc --> 
|参数名|类型|必须|默认值|说明|
|:---|:---:|:---:|:---:|:---|
|val|any|是|-|待校验对象|
#### 返回 <!-- omit in toc --> 
boolean
#### 示例代码 <!-- omit in toc --> 
```javascript
import { Validator } from 'vue3-utils'

console.log(Validator.isString('a')) // true
console.log(Validator.isString(1)) // false
console.log(Validator.isString(true)) // false
console.log(Validator.isString({a: 1})) // false
```
<br />

### isObject
是否是对象
#### 方法参数 <!-- omit in toc --> 
|参数名|类型|必须|默认值|说明|
|:---|:---:|:---:|:---:|:---|
|val|any|是|-|待校验对象|
#### 返回 <!-- omit in toc --> 
boolean
#### 示例代码 <!-- omit in toc --> 
```javascript
import { Validator } from 'vue3-utils'

console.log(Validator.isObject({ a: 1 })) // true
console.log(Validator.isObject(1)) // false
console.log(Validator.isObject([{ a: 1 }])) // false
console.log(Validator.isObject(true)) // false
```
<br />

### isArray
是否是数组
#### 方法参数 <!-- omit in toc --> 
|参数名|类型|必须|默认值|说明|
|:---|:---:|:---:|:---:|:---|
|val|any|是|-|待校验对象|
#### 返回 <!-- omit in toc --> 
boolean
#### 示例代码 <!-- omit in toc --> 
```javascript
import { Validator } from 'vue3-utils'

console.log(Validator.isArray({ a: 1 })) // false
console.log(Validator.isArray(1)) // false
console.log(Validator.isArray([{ a: 1 }])) // true
console.log(Validator.isArray(true)) // false
```
<br />

### isMobile
是否是手机
#### 方法参数 <!-- omit in toc --> 
|参数名|类型|必须|默认值|说明|
|:---|:---:|:---:|:---:|:---|
|str|string|是|-|待校验对象|
#### 返回 <!-- omit in toc --> 
boolean
#### 示例代码 <!-- omit in toc --> 
```javascript
import { Validator } from 'vue3-utils'

console.log(Validator.isMobile('13022120391')) // true
console.log(Validator.isMobile('12023123391')) // false
```
<br />

### isTel
是否是固话
#### 方法参数 <!-- omit in toc --> 
|参数名|类型|必须|默认值|说明|
|:---|:---:|:---:|:---:|:---|
|str|string|是|-|待校验对象|
#### 返回 <!-- omit in toc --> 
boolean
#### 示例代码 <!-- omit in toc --> 
```javascript
import { Validator } from 'vue3-utils'

console.log(Validator.isTel('13022120391')) // false
console.log(Validator.isTel('02099182212')) // true
console.log(Validator.isTel('0755-10209932')) // true
```
<br />

### isAlphabetChinese
是否只包含中文或英文字符
#### 方法参数 <!-- omit in toc --> 
|参数名|类型|必须|默认值|说明|
|:---|:---:|:---:|:---:|:---|
|str|string|是|-|待校验对象|
#### 返回 <!-- omit in toc --> 
boolean
#### 示例代码 <!-- omit in toc --> 
```javascript
import { Validator } from 'vue3-utils'

console.log(Validator.isAlphabetChinese('你好，')) // false
console.log(Validator.isAlphabetChinese('aaa')) // true
console.log(Validator.isAlphabetChinese('你好aaa')) // true
console.log(Validator.isAlphabetChinese('12023123391')) // false
```
<br />

### isAlphabetNumberChinese
是否只包含中文或英文字符及数字
#### 方法参数 <!-- omit in toc --> 
|参数名|类型|必须|默认值|说明|
|:---|:---:|:---:|:---:|:---|
|str|string|是|-|待校验对象|
#### 返回 <!-- omit in toc --> 
boolean
#### 示例代码 <!-- omit in toc --> 
```javascript
import { Validator } from 'vue3-utils'

console.log(Validator.isAlphabetNumberChinese('你好，')) // false
console.log(Validator.isAlphabetNumberChinese('aaa')) // true
console.log(Validator.isAlphabetNumberChinese('你好aa111a')) // true
console.log(Validator.isAlphabetNumberChinese('12023123391')) // true
```
<br />

### isIDCard
是否合法的身份证号码
#### 方法参数 <!-- omit in toc --> 
|参数名|类型|必须|默认值|说明|
|:---|:---:|:---:|:---:|:---|
|str|string|是|-|待校验对象|
#### 返回 <!-- omit in toc --> 
boolean
#### 示例代码 <!-- omit in toc --> 
```javascript
import { Validator } from 'vue3-utils'

console.log(Validator.isIDCard('你好，')) // false
console.log(Validator.isIDCard('110101200007286907')) // true
```
<br />

### isVehicleNumber
是否合法的车牌号
#### 方法参数 <!-- omit in toc --> 
|参数名|类型|必须|默认值|说明|
|:---|:---:|:---:|:---:|:---|
|str|string|是|-|待校验对象|
#### 返回 <!-- omit in toc --> 
boolean
#### 示例代码 <!-- omit in toc --> 
```javascript
import { Validator } from 'vue3-utils'

console.log(Validator.isVehicleNumber('你好，')) // false
console.log(Validator.isVehicleNumber('粤A99109')) // true
```
<br />

### isEmail
是否合法的电子邮箱地址
#### 方法参数 <!-- omit in toc --> 
|参数名|类型|必须|默认值|说明|
|:---|:---:|:---:|:---:|:---|
|str|string|是|-|待校验对象|
#### 返回 <!-- omit in toc --> 
boolean
#### 示例代码 <!-- omit in toc --> 
```javascript
import { Validator } from 'vue3-utils'

console.log(Validator.isEmail('你好，')) // false
console.log(Validator.isEmail('admin@test.com')) // true
```
<br />

### isURL
是否合法的电子邮箱地址
#### 方法参数 <!-- omit in toc --> 
|参数名|类型|必须|默认值|说明|
|:---|:---:|:---:|:---:|:---|
|str|string|是|-|待校验对象|
#### 返回 <!-- omit in toc --> 
boolean
#### 示例代码 <!-- omit in toc --> 
```javascript
import { Validator } from 'vue3-utils'

console.log(Validator.isURL('你好，')) // false
console.log(Validator.isURL('http://test.com/sdj')) // true
```
<br />

### authPasswd
验证密码强度
#### 方法参数 <!-- omit in toc --> 
|参数名|类型|必须|默认值|说明|
|:---|:---:|:---:|:---:|:---|
|str|string|是|-|待校验对象|
#### 返回 <!-- omit in toc --> 
string
pw-empty: 完全不符合强度要求
pw-weak: 弱密码
pw-medium: 中等强度
pw-fine: 强度偏好
pw-good: 强度最好
#### 示例代码 <!-- omit in toc --> 
```javascript
import { Validator } from 'vue3-utils'

console.log(Validator.authPasswd('123456')) // pw-empty
console.log(Validator.authPasswd('12345678')) // pw-weak
console.log(Validator.authPasswd('abc122029')) // pw-medium
console.log(Validator.authPasswd('JKSDJK@1002')) // pw-fine
console.log(Validator.authPasswd('Wknm@2029')) // pw-good
```
<br />