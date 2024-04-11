import koaRouter from 'koa-router';
import LoginController from '../controller/LoginController';
import AuthMiddleware from '../middleware/AuthMiddleware';
import AdminController from '../controller/AdminController';
import UploadController from '../controller/UploadController';
const router = new koaRouter({prefix:'/admin'});

router.post('/login',LoginController.index)
router.get('/admin/list',AdminController.getAdminList)
router.post('/upload',UploadController.upload)
router.post('/addAdmin',AdminController.addAdmin)
router.post('/editAdmin/:id',AdminController.updateAdmin)
router.delete('/deleteAdmin/:id',AdminController.deleteAdmin)
router.use(AuthMiddleware)
export default router;