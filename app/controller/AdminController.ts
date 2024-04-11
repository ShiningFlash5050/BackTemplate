import { Context } from "koa";
import { URLSearchParams } from "url";
import AdminService from "../service/AdminService";
import paginate from "../../utils/paginate";
import response from "../../utils/response";
/**
 * 管理员控制器类
 */
class AdminController {
     /**
     * 获取管理员列表
     * @param ctx 上下文对象，包含请求和响应信息
     * @returns 返回分页后的管理员列表和总数信息
     */
    async getAdminList(ctx: Context) {
         // 从查询字符串中提取参数
        const usp = new URLSearchParams(ctx.querystring)
        // 默认的页码和每页数量
        let page = 1, limit = 10
         // 如果查询字符串中包含页码和限制数，则更新默认值
        if (usp.get('page') !== null && !isNaN(Number(usp.get('page')))) {
            page = Number(usp.get('page'))
        }
        if (usp.get('limit') !== null && !isNaN(Number(usp.get('limit')))) {
            limit = Number(usp.get('limit'))
        }
        // 调用服务层获取分页后的管理员列表和总数
        const { rows, count } = await AdminService.getAdminListByPage(page, limit)
         // 构建并返回响应
        response.success(ctx, paginate(rows, page, count, limit))
    }
}

export default new AdminController