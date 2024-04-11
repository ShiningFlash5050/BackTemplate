import { Context } from "koa";
import { URLSearchParams } from "url";
import AdminService from "../service/AdminService";
import paginate from "../../utils/paginate";
import response from "../../utils/response";
import { Rules } from "async-validator";
import validate from "../../utils/validate";
import { createHash } from "crypto";
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

    async addAdmin(ctx: Context) {
        // 获取请求体中的管理员信息
        const rules: Rules = {
            name: [{ type: 'string', required: true, message: '管理员名称不能为空' }],
            password: [{ type: 'string', required: true, message: '管理员密码不能为空' }, { type: 'string', min: 8, message: '密码长度不可小于8位' }],
        }
        interface IAdmin {
            id: number,
            name: string,
            password: string
        }
        const { data, error } = await validate<IAdmin>(ctx, rules)

        if (error !== null) {
            return response.error(ctx, error)
        }
        const admin = await AdminService.getAdminByName(data.name)

        if (admin !== null) {
            return response.error(ctx, '管理员已存在')
        }
        data.password = createHash('sha256').update(data.password).digest('hex')
        const row = await AdminService.addAdmin(data)
        if (row.id > 0) {
            return response.success(ctx)
        }
        return response.error(ctx, '添加失败')
    }


    async updateAdmin(ctx: Context) {
        const id = ctx.params['id'] as number
        console.log(id);

        const admin = await AdminService.getAdminById(id)
        if (admin === null) {
            return response.error(ctx, '管理员不存在')
        }
        const rules: Rules = {
            name: [{ type: 'string', required: true, message: '用户名不能为空' }],
            password: [{ type: 'string', required: true, message: '管理员密码不能为空' }, { type: 'string', min: 8, message: '密码长度不可小于8位' }],
        }
        interface IAdmin {
            name: string,
            password: string
        }

        const { data, error } = await validate<IAdmin>(ctx, rules)

        if (error !== null) {
            return response.error(ctx, error)
        }
        const admin2 = await AdminService.getAdminByName(data.name)

        if (admin2 !== null) {
            return response.error(ctx, '用户名已存在')
        }
        if (data.password != undefined && data.password !== '') {
            data.password = createHash('sha256').update(data.password).digest('hex')
        }
        const [number] = await AdminService.updateAdmin(data, id)
        if (number > 0) {
            return response.success(ctx)
        } else {
            return response.error(ctx, '更新失败')
        }
    }

    async deleteAdmin(ctx: Context) {
        const id = ctx.params['id'] as number
        const admin = await AdminService.getAdminById(id)
        if (admin === null) {
            return response.error(ctx, '用户不存在')
        }
        const row = await AdminService.deleteAdmin(id)
        if (row > 0) {
            return response.success(ctx)
        }
        return response.error(ctx, '删除失败')
    }
}

export default new AdminController