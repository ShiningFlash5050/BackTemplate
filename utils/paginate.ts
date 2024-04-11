/**
 * 处理分页
 */

import { Model } from "sequelize-typescript"

// tatal 100  limit 15   6.666 ≈ 7


function paginate<T extends Model[]>(data:T, currentPage: number = 1, total: number = 0, limit: number = 10) {
    return {
        data,
        currentPage,
        total,
        totalPage: Math.ceil(total / limit),
        limit
    }
}

export default paginate