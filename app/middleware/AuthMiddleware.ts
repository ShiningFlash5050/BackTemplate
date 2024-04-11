import { Context, Next } from "koa";
import { verity } from "../../utils/auth";
/**
 * 授权中间件
 * @param ctx 上下文对象，包含请求和响应的信息
 * @param next 中间件调用链中的下一个中间件函数
 * 该函数主要用于校验请求头中的授权令牌（token）。
 * 如果令牌存在且有效，则继续执行链中的下一个中间件；
 * 如果令牌不存在或无效，则返回相应的错误信息。
 */
function AuthMiddleware(ctx: Context, next: Next) {
     // 从请求头中获取授权令牌
    const token = ctx.headers['authorization']
    // 检查令牌是否存在且非空
    if (token !== undefined && token !== "") {
        // 验证令牌的有效性
        const { error } = verity(token)
         // 如果令牌无效，返回错误信息
        if (error !== null) {
            ctx.body = { 
                // @ts-ignore
                msg: error.message, // 错误信息
                code: 1 // 错误码
            }
        }
        else {
            // 令牌有效，继续执行下一个中间件
            return next()
        }
    }
    // 令牌不存在或为空，返回相应的错误信息
    ctx.body = { msg: 'authorization 可不可以为空', code: 4000 }
    return
}

export default AuthMiddleware