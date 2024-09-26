import Env from './env'

/**
 * 日志记录
 * @param content 日志内容
 * @param type 日志类型 input / table / error， 默认info
 */
const log = (content: string, type: string = 'info') => {
    if (Env.get('DEBUG') === 'enabled') {
        switch(type) {
            case 'table':
                console.table(content)
                break
            
            case 'error':
                console.error(content)
                break

            default:
                console.log(content)
                break
        }
    }
}

export default log