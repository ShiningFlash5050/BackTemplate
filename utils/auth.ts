import Jwt, { JsonWebTokenError, JwtPayload, TokenExpiredError } from "jsonwebtoken"
import config from "../app/config"
/**
 * 使用JWT对数据进行签名。
 * @param data 需要签名的数据，可以是任意类型。
 * @returns 返回经过JWT签名后的字符串。
 */
function sign(data: any) {
    return Jwt.sign({ admin: data }, config.jwt.jwt_secret as string, { expiresIn: config.jwt.jwt_expires })
}
/**
 * 验证JWT(token)的有效性。
 * @param token 用户的JWT令牌，用于验证用户身份。
 * @returns 返回一个对象，包含验证结果和错误信息（如果有）。
 */
function verity(token: string):{admin:JwtPayload | string  | null, error:TokenExpiredError | JsonWebTokenError | null} {
    try {
        // 使用JWT密钥验证令牌，并解码令牌内容。
        var decoded = Jwt.verify(token, config.jwt.jwt_secret as string);
        return {
            admin: decoded,
            error: null
        }
    }
    catch (err) {
        // 验证失败，返回错误信息。
        return {
            admin: null,
            error: err as TokenExpiredError | JsonWebTokenError | null
        }
    }


}
export {
    sign,
    verity
}