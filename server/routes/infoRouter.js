import { Router } from "express"
const router = new Router()
import { infoController } from '../controllers/InfoController.js'
import checkRole from '../middleware/checkRoleMiddleware.js'


router.post('/', checkRole('ADMIN'), infoController.create)
router.post('/add', checkRole('ADMIN'), infoController.addOneContentToArrInfo)
router.get('/', infoController.getAll)
router.delete('/:id', checkRole('ADMIN'), infoController.deleteOne)


export default router