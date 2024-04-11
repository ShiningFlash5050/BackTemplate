import { Context } from "koa";
import response from "../../utils/response";
import fs from 'fs'
import path from "path";
/**
 * 上传控制器类
 */
class UploadController {
    /**
     * 处理文件上传的方法
     * @param ctx Koa的上下文对象
     */
    upload = (ctx: Context) => {
        const file = ctx.request.files?.file
        if (file) {
            // @ts-ignore
            // console.log(file.originalFilename, file.filepath, file.mimetype);
            // @ts-ignore
            const fileType = file.mimetype  // 获取文件类型
            const typeSet = new Set(['image/jpeg', 'image/jpg', 'image/gif', 'image/png']) // 定义允许的文件类型集合
            // 检查文件类型是否被允许
            if (!typeSet.has(fileType)) {
                return response.error(ctx, '文件类型不合适')
            }

            // @ts-ignore
            const reader = fs.createReadStream(file.filepath) // 创建读取流
            // @ts-ignore
            const ext = path.extname(file.originalFilename) // 获取文件扩展名
            const filePath = '/upload/' + this.randomStr(32) + ext // 生成文件保存路径
            // @ts-ignore
            const writer = fs.createWriteStream('static' + filePath) // 创建写入流
            reader.pipe(writer) // 将读取流的数据写入到写入流
            response.success(ctx, { file: filePath }) // 返回成功响应
        }
        else {
            // 如果没有文件，返回错误响应
            response.error(ctx, '文件不可以为空')
        }

    }
    /**
     * 生成随机字符串
     * @param length 随机字符串的长度
     * @returns 生成的随机字符串
     */
    randomStr = (length: number): string => {
        const seeder = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
        let randomStr = ''
        // 循环生成随机字符串
        for (let i = 0; i < length; i++) {
            randomStr += seeder.charAt(Math.floor(Math.random() * seeder.length))
        }
        return randomStr
    }
}

export default new UploadController