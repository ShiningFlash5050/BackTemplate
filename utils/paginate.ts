/**
 * 分页函数 - 用于将数据集分页
 * @param data - 泛型T，代表模型数组的数据集
 * @param currentPage - 当前页码，默认为1
 * @param total - 数据总数，默认为0
 * @param limit - 每页显示的数据数量，默认为10
 * @returns 返回一个对象，包含数据、当前页码、数据总数、总页数和每页数据数量
 */

import { Model } from "sequelize-typescript"

// tatal 100  limit 15   6.666 ≈ 7


function paginate<T extends Model[]>(data:T, currentPage: number = 1, total: number = 0, limit: number = 10) {
    return {
        data,
        currentPage,
        total,
        // 计算总页数
        totalPage: Math.ceil(total / limit),
        limit
    }
}

export default paginate