import dotenv from 'dotenv';
dotenv.config();
import db from './db';
db()
import Koa from 'koa';
import router from './router';
import { Server } from 'http';
import AccessLogMiddleware from './middleware/AccessLogMiddleware';

const app = new Koa;
app.use(AccessLogMiddleware)
    .use(router.routes())


const run = (port: any): Server => {
    return app.listen(port)
}

export default run;