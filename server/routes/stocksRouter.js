import { Router } from "express"
const router = new Router()
import { stocksPageController } from '../controllers/StocksPageController.js'
import checkRole from '../middleware/checkRoleMiddleware.js'


router.post('/', checkRole('ADMIN'), stocksPageController.create)
router.get('/', stocksPageController.getAll)
router.get('/:id', stocksPageController.getOne)
router.put('/', stocksPageController.editOne)
router.delete('/:id', stocksPageController.deleteOne)




export default router