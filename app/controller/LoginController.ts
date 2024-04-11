import { Context } from "koa";
import AdminService from "../service/AdminService";
import { sign } from "../../utils/auth";
import response from "../../utils/response"
class LoginController {
    async index(ctx: Context) {
        const admin = await AdminService.getAdminById(3);
        if(admin === null){
            return response.error(ctx,'管理员不存在')
        }
        const token = sign(admin)
        ctx.body = { token }
        response.success(ctx, {token:token})
    }
    
}

export default new LoginController;