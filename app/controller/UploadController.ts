import { Context } from "koa";
import response from "../../utils/response";
import fs from 'fs'
import path from "path";
class UploadController {
    async index(ctx: Context) {

    }
    upload = (ctx: Context) => {
        const file = ctx.request.files?.file
        if (file) {
            // @ts-ignore
            console.log(file.originalFilename, file.filepath, file.mimetype);
            // @ts-ignore
            const reader = fs.createReadStream(file.filepath)
            // @ts-ignore
            const ext = path.extname(file.originalFilename)
            const filePath = '/upload/' + this.randomStr(32) + ext
            // @ts-ignore
            const writer = fs.createWriteStream('static' + filePath)
            reader.pipe(writer)
            response.success(ctx, { file: filePath })
        }
        else {
            response.error(ctx, '文件不可以为空')
        }

    }
    randomStr = (length: number): string => {
        const seeder = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
        let randomStr = ''
        for (let i = 0; i < length; i++) {
            randomStr += seeder.charAt(Math.floor(Math.random() * seeder.length))
        }
        return randomStr
    }
}

export default new UploadController