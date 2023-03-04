import { models } from "../models/models.js"
import { ApiError } from '../error/ApiError.js'

class InfoController {
	async create(req, res, next) {
		try {
			const data = req.body
			await models.Info.bulkCreate(data)


			return res.status(201).json({ message: `Характеристики добавлены` })
		}
		catch (e) {
			next(ApiError.badRequest(e.message))
			console.log('🦺-------e: ', e)
		}

	}

	async getAll(req, res, next) {
		try {
			const info = await models.Info.findAll(
				{
					include: [
						{
							model: models.InfoTitle
						}
					]
				}
			)
			return res.json(info)
		}
		catch (e) {
			next(ApiError.badRequest(e.message))
			console.log('🦺-------e: ', e)
		}
	}

	async deleteOne(req, res, next) {
		try {
			const { id } = req.params
			const data = await models.Info.findOne({ where: { id: id } })
			await models.ProductInfo.destroy({ where: { title: data.name } })
			await data.destroy()
			return res.json({ message: `Описание удалено` })
		}
		catch (e) {
			next(ApiError.badRequest(e.message))
			console.log('🦺-------e: ', e)
		}
	}

	async addOneContentToArrInfo(req, res, next) {
		try {
			const { id, content } = req.body
			console.log('🦺 req.body: ', req.body)

			const data = await models.Info.findOne({ where: { id } })
			console.log('🦺 data: ', data)
			data.content = [...data.content, content]
			await data.save()
			return res.json({ message: `Характеристика добавлена` })
		}
		catch (e) {
			next(ApiError.badRequest(e.message))
			console.log('🦺-------e: ', e)
		}
	}

}

export const infoController = new InfoController()
