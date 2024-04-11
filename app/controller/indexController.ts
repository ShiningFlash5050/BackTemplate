import { Context } from "koa";
import AdminService from "../service/AdminService";
class IndexController {
    async index(ctx: Context) {
        const admin = await AdminService.getAdminById(3);
        ctx.body = admin
    }
}

export default new IndexController;