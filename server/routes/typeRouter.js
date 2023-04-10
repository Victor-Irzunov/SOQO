import { Router } from "express"
const router = new Router()
import { typeController } from '../controllers/TypeController.js'
import checkRole from '../middleware/checkRoleMiddleware.js'


router.post('/', checkRole('ADMIN'), typeController.create)
router.put('/', checkRole('ADMIN'), typeController.change)
router.get('/', typeController.getAll)
router.get('/:id', typeController.getOne)
router.delete('/:id', typeController.deleteOne)



export default router