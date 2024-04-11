import { Context } from "koa";

/**
 * 
 * @param ctx 
 * @param data 返回的数据 
 * @param msg 提示信息
 * @param code 状态码 默认200
 */
function success(ctx: Context, data: any = [], msg: string = 'success', code: number = 200) {
    ctx.body = {
        code,
        msg,
        data
    }
}
/**
 * 
 * @param ctx 
 * @param msg 错误提示
 * @param data 扩展的提示
 * @param code 状态码 默认400
 */
function error(ctx: Context, msg: string = 'error', data:any = [], code: number = 400) {
    ctx.body = {
        code: 500,
        msg,
        data
    }
}
export default {
    success,
    error
}