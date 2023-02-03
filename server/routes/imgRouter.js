import { Router } from "express"
const router = new Router()
import { imgController } from '../controllers/ImgController.js'
import checkRole from '../middleware/checkRoleMiddleware.js'


router.post('/', checkRole('ADMIN'), imgController.create)
router.get('/', imgController.get)
router.put('/', checkRole('ADMIN'), imgController.deleteImg)

router.post('/banner', checkRole('ADMIN'), imgController.addImg)
router.get('/banner', imgController.getImg)

router.get('/banner/all', imgController.getAllImg)
router.put('/banner', checkRole('ADMIN'), imgController.deleteOneImg)



export default router