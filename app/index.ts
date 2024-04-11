import dotenv from 'dotenv';
dotenv.config();
import db from './db';
db()
import Koa from 'koa';
import router from './router';
import { Server } from 'http';
import AccessLogMiddleware from './middleware/AccessLogMiddleware';
import koaBody from 'koa-body';
import KoaStatic from 'koa-static';
import path from 'path';
const app = new Koa;
app.use(koaBody(
    {
        multipart: true,
        formidable: { maxFieldsSize: 10 * 1024 * 1024 } //2M
    }
))
    .use(KoaStatic(path.join(__dirname, '..','static')))
    .use(AccessLogMiddleware)
    .use(router.routes())


const run = (port: any): Server => {
    return app.listen(port)
}

export default run;