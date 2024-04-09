import { Context } from "koa";
import AdminService from "../service/AdminService";
class IndexController {
    async index(ctx: Context) {
        const admin = await AdminService.getAdmin();
        ctx.body = admin
    }
}

export default new IndexController;