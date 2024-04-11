import koaRouter from 'koa-router';
import indexController from '../controller/indexController';
import LoginController from '../controller/LoginController';
import AuthMiddleware from '../middleware/AuthMiddleware';
import AdminController from '../controller/AdminController';
import UploadController from '../controller/UploadController';
const router = new koaRouter({prefix:'/admin'});

router.post('/login',LoginController.index)
router.get('/',indexController.index)
router.get('/admin/list',AdminController.getAdminList)
router.post('/upload',UploadController.index)
router.post('/upload1',UploadController.upload)
router.use(AuthMiddleware)
export default router;