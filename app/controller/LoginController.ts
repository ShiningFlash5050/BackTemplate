import { Context } from "koa";
import AdminService from "../service/AdminService";
import { sign } from "../../utils/auth";

class LoginController {
    async index(ctx: Context) {
        const admin = await AdminService.getAdmin();
        const token = sign(admin)
        ctx.body = { token }
    }
}

export default new LoginController;