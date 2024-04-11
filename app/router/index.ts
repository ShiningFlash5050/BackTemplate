import koaRouter from 'koa-router';
import indexController from '../controller/indexController';
import LoginController from '../controller/LoginController';
import AuthMiddleware from '../middleware/AuthMiddleware';
import AdminController from '../controller/AdminController';
const router = new koaRouter({prefix:'/admin'});

router.get('/login',LoginController.index)
router.get('/',indexController.index)
router.get('/admin/list',AdminController.getAdminList)
router.use(AuthMiddleware)
export default router;