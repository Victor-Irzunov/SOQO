import { Router } from "express"
const router = new Router()
import { uniqueContentController } from '../controllers/UniqueContentController.js'
import checkRole from '../middleware/checkRoleMiddleware.js'


router.post('/content', checkRole('ADMIN'), uniqueContentController.create)
router.get('/content', uniqueContentController.getOne)
router.get('/content/:id', uniqueContentController.getOneById)
router.put('/content', uniqueContentController.change)
router.delete('/content/:id', uniqueContentController.deleteOne)





export default router