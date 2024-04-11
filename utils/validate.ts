import Schema, { Rules, Values } from "async-validator";
import { Context } from "koa";
/**
 * 对Koa的上下文请求数据进行验证的异步函数。
 * 
 * @param ctx Koa的上下文对象，用于获取请求信息。
 * @param rules 验证规则，由async-validator库定义。
 * @param flag 标志位，用于控制验证失败时返回的错误信息详细程度，默认为false。
 * @returns 返回一个Promise，解析为一个对象，包含验证的数据和错误信息（如果有）。
 */
async function validate<T extends Values>(ctx: Context, rules: Rules, flag: boolean = false): Promise<{ data: T, error: any | null }> {
    const validator = new Schema(rules)
    let data: any = {}
    // 根据请求方法获取或初始化数据
    switch (ctx.method) {
        case 'GET':
            break
        case 'POST':
            // 对POST请求获取表单数据
            data = getFormData(ctx)
            break
        case 'DELETE':
            break
    }
    // 执行验证并处理结果
    return await validator.validate(data).then(() => {
        return {
            data: data as T,
            error: null
        }
    }).catch(err => {
        if (flag) {
             // 如果flag为真，返回详细的错误对象
            return {
                data: {} as T,
                error: err
            }
        }
         // 如果flag为假，返回错误的概要信息
        return {
            data: {} as T,
            error: err.errors[0].message
        }
    })
}
/**
 * 从Koa上下文获取表单数据。
 * 
 * @param ctx Koa的上下文对象。
 * @returns 返回请求的表单数据。
 */
function getFormData(ctx: Context) {
    return ctx.request.body
}
export default validate