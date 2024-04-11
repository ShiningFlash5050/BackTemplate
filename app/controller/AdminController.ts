import { Context } from "koa";
import { URLSearchParams } from "url";
import AdminService from "../service/AdminService";
import paginate from "../../utils/paginate";
import response from "../../utils/response";

class AdminController {
    async getAdminList(ctx: Context) {
        const usp = new URLSearchParams(ctx.querystring)
       
        let page = 1, limit = 10
        if (usp.get('page') !== null && !isNaN(Number(usp.get('page')))) {
            page = Number(usp.get('page'))
        }
        if (usp.get('limit') !== null && !isNaN(Number(usp.get('limit')))) {
            limit = Number(usp.get('limit'))
        }
        console.log(page,limit);
        const { rows, count } = await AdminService.getAdminListByPage(page, limit)
        response.success(ctx, paginate(rows, page, count, limit))
    }
}

export default new AdminController