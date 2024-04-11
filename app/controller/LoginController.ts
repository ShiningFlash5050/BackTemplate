import { Context } from "koa";
import AdminService from "../service/AdminService";
import { sign } from "../../utils/auth";
import response from "../../utils/response"
import validate from "../../utils/validate";
import { Rules } from "async-validator";
/**
 * 登录控制器类,处理管理员登录请求
 */
class LoginController {
    /**
     * 处理登录请求
     * @param ctx Koa的上下文对象，用于处理请求和响应
     */
    async index(ctx: Context) {
        // 定义登录表单的校验规则
        const rules:Rules = {
            name:{type:'string',required:true,message:"用户名不可以为空"},
            password:{type:'string',required:true,message:"密码不可以为空"}
        }
         // 定义管理员信息接口
        interface IAdmin{
            name:string,
            password:string
        }
        // 校验表单数据
        const { data,error }  = await validate<IAdmin>(ctx,rules)
        if(error !== null){
            // 如果校验失败，返回错误响应
            return response.error(ctx,error)
        }
         // 根据用户名获取管理员信息
        const admin = await AdminService.getAdminByName(data.name);
        if(admin === null){
            // 如果管理员不存在，返回错误响应
            return response.error(ctx,'管理员不存在')
        }
        // 为管理员生成令牌
        const token = sign(admin)
        ctx.body = { token }// 在响应体中设置令牌
        response.success(ctx, {token:token}) // 返回成功响应
    }
    
}

export default new LoginController;