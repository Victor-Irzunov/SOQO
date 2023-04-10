import { models } from "../models/models.js"
import { ApiError } from '../error/ApiError.js'
import { Op } from "sequelize"


class CategoryTypeController {



	async getAll(req, res, next) {
		// try {
		// 	const data = await models.Category.findAll({
		// 		include: [{
		// 			model: models.Type
		// 		}]
		// 	})
		// 	return res.json(data)
		// }
		// catch (e) {
		// 	console.log('-->->->e', e.message)
		// 	next(ApiError.badRequest(e.message))
		// }
		try {
			const d = await models.CategoryType.findAll()
			console.log('💊💊d: ', d)

			const a = d.map(el => el.categoryId)
			const data = await models.Category.findAll({
				where: {
					id: a,
				},
				include: [{
					model: models.Type
				}]
			})

			console.log('💊💊💊data:', data)
			return res.json(data)
		}
		catch (e) {
			console.log('-->->->e', e.message)
			next(ApiError.badRequest(e.message))
		}
	}

	async deleteOne(req, res, next) {
		try {
			const { id } = req.params
			await models.CategoryType.destroy({ where: { id: id } })
			return res.json({ message: `Категория-тип удалена` })
		}
		catch (e) {
			next(ApiError.badRequest(e.message))
		}
	}
}

export const categoryTypeController = new CategoryTypeController()


// {
// 	include: [
// 		{
// 			model: models.Category,
// 			where: {
// 				id: { [Op.in]: сategoryType.categoryId },
// 			}
// 		},
// 		{
// 			model: models.Type,
// 			where: {
// 				id: { [Op.in]: сategoryType.typeId }
// 			}
// 		}
// 	],
// 	}