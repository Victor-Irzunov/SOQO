import { models } from "../models/models.js"
import { ApiError } from '../error/ApiError.js'
import { Op } from "sequelize"

class SearchController {

	async getSearch(req, res, next) {
		try {
			const { q } = req.query
			const response = await models.Product.findAll({
				where: { name: { [Op.substring]: q } },
				include: [
					{
						model: models.Category
					},
					{
						model: models.Type
					},
				]
			})
			return res.json(response)
		} catch (e) {
			console.log('🦺-------err: ', e.message)
			console.log('🦺-------e: ', e)
			next(ApiError.badRequest(e.message))
		}
	}
}

export const searchController = new SearchController()