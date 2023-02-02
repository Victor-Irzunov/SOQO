import { Router } from "express"
const router = new Router()
import { searchController } from '../controllers/SearchController.js'

router.get('/', searchController.getSearch)

export default router