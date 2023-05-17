import { Router } from "express"
const router = new Router()
import { productController } from '../controllers/ProductController.js'
import checkRole from '../middleware/checkRoleMiddleware.js'


router.post('/', checkRole('ADMIN'), productController.create)
router.get('/', productController.getAll)
router.put('/:id',checkRole('ADMIN'), productController.updateOneProduct)
router.get('/new', productController.getNewProduct)
router.get('/one/type/:id', productController.getAllProductsOneType)
router.get('/hit', productController.getHitProduct)
router.get('/akcii/products', productController.getAkciiProduct)
router.get('/pohozhie', productController.getPohozhie)
router.get('/one', productController.getOne)
router.get('/:id', productController.getOneById)
router.get('/basket/nouser', productController.getAllProductInBasketNoUser)
router.delete('/:id', checkRole('ADMIN'), productController.deleteOne)


export default router