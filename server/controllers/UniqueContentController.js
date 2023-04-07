import { models } from "../models/models.js"
import { ApiError } from '../error/ApiError.js'

class UniqueContentController {

	async create(req, res, next) {
		try {
			const { link, content, type, category, title } = req.body
			// console.log('💊💊💊 req.body: ', req.body)
			let data
			if (+type) {
				data = await models.ContentUnique.create({ link, content, categoryId: category, typeId: type, title })
			} else {
				data = await models.ContentUnique.create({ link, content, categoryId: category, title })
			}
			if (data) {
				return res.status(201).json({ message: `Контент добавлен` })
			} else {
				return res.status(501).json({ message: `Что-то пошло не так` })
			}
		}
		catch (e) {
			console.log('🦺-------err: ', e.message)
			console.log('🦺-------e: ', e)
			next(ApiError.badRequest(e.message))
		}
	}


	async getOne(req, res, next) {
		try {
			const { categoryId, typeId } = req.query
			const data = await models.ContentUnique.findOne({
				where: {
					categoryId,
					typeId: typeId ? typeId : null
				}
			})
			if (data) {
				return res.status(201).json(data)
			} else {
				return res.status(200).json({ message: `Нет данного контента!` })
			}
		}
		catch (e) {
			console.log('🦺-------err: ', e.message)
			console.log('🦺-------e: ', e)
			next(ApiError.badRequest(e.message))
		}
	}
	async getOneById(req, res, next) {
		try {
			const { id } = req.params
			const data = await models.ContentUnique.findOne({
				where: {
					id
				}
			})
			if (data) {
				return res.status(201).json(data)
			} else {
				return res.status(200).json({ message: `Нет данного контента!` })
			}
		}
		catch (e) {
			console.log('🦺-------err: ', e.message)
			console.log('🦺-------e: ', e)
			next(ApiError.badRequest(e.message))
		}
	}
	async change(req, res, next) {
		try {
			const { id, link, content, category, type, title } = req.body
			// console.log('💊💊💊req.body: ', req.body)
			let data
			if (+type) {
				data = await models.ContentUnique.update({ link, content, categoryId: category, typeId: type, title }, { where: { id } })
			} else {
				data = await models.ContentUnique.update({ link, content, categoryId: category, title }, { where: { id } })
			}
			if (data) {
				return res.status(201).json({ message: `Контент успешно отредактирован` })
			} else {
				return res.status(501).json({ message: `Что-то пошло не так` })
			}
		}
		catch (e) {
			console.log('🦺-------err: ', e.message)
			console.log('🦺-------e: ', e)
			next(ApiError.badRequest(e.message))
		}
	}
	async deleteOne(req, res, next) {
		try {
			const { id } = req.params
			// console.log('💊💊💊req.params: ', req.params)
			const data = await models.ContentUnique.destroy({ where: { id } })
			if (data) {
				return res.status(201).json({ message: `Контент успешно удален` })
			} else {
				return res.status(501).json({ message: `Что-то пошло не так` })
			}
		}
		catch (e) {
			console.log('🦺-------err: ', e.message)
			console.log('🦺-------e: ', e)
			next(ApiError.badRequest(e.message))
		}
	}
}

export const uniqueContentController = new UniqueContentController()
