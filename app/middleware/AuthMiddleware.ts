import { Context, Next } from "koa";
import { verity } from "../../utils/auth";

function AuthMiddleware(ctx: Context, next: Next) {
    const token = ctx.headers['authorization']
    if (token !== undefined && token !== "") {
        const { error } = verity(token)
        if (error !== null) {
            ctx.body = { 
                // @ts-ignore
                msg: error.message, 
                code: 1 }
        }
        else {
            return next()
        }
    }
    ctx.body = { msg: 'authorization 可不可以为空', code: 4000 }
    return
}

export default AuthMiddleware