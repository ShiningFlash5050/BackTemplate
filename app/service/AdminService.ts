import Admin from "../model/Admin"
/**
     * 分页获取管理员列表
     * @param page 页码，表示需要获取的页数
     * @param limit 每页显示的数量，默认为10
     * @returns 返回一个Promise对象，解析后包含管理员列表和总数信息
     */
class AdminService {
    getAdminById(adminId: number) {
        return Admin.findByPk(adminId)
    }
    getAdminListByPage(page: number, limit: number = 10) {
        return Admin.findAndCountAll({
            limit: limit, // 每页限制的数量
            offset: (page - 1) * limit // 计算偏移量，用于分页
        })
    }
    getAdminByName(name: string) {
        return Admin.findOne({
            where: {
                name
            }
        })
    }
    addAdmin(admin: any) {
        return Admin.create(admin)
    }
    updateAdmin(admin: any,id: number, ) {
        return Admin.update(admin, {
            where: {
                id
            }
        })
    }
    deleteAdmin(id: number) {
        return Admin.destroy({
            where: {
                id
            }
        })
    }
}
export default new AdminService