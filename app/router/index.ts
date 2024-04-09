import koaRouter from 'koa-router';
import indexController from '../controller/indexController';
import LoginController from '../controller/LoginController';
import AuthMiddleware from '../middleware/AuthMiddleware';
const router = new koaRouter({prefix:'/admin'});

router.get('/login',LoginController.index)
router.use(AuthMiddleware)
router.get('/',indexController.index)

export default router;