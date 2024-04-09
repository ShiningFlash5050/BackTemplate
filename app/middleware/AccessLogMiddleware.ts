import { Context, Next } from 'koa';
import { accessLogger } from '../logger';
/**
 * 访问日志中间件
 * @param ctx 上下文对象，包含请求的具体信息
 * @param next 中间件的下一个函数，用于继续处理请求链
 * @returns 返回下一个中间件的执行结果
 * 
 * 本函数主要功能是记录请求的路径、方法和用户代理信息到访问日志中。
 */
function AccessLogMiddleware(ctx: Context, next: Next) {
    // 构造日志字符串，包含请求的路径、方法和用户代理
    const logStr = `path:${ctx.path} | method:${ctx.method} | ua:${ctx.header['user-agent']}`
    accessLogger.info(logStr);  // 将日志信息记录到访问日志中
    return next(); // 继续执行请求链中的下一个中间件
}
export default AccessLogMiddleware