import { models } from "../models/models.js"
import { ApiError } from '../error/ApiError.js'
import { v4 as uuidv4 } from 'uuid'
import path from 'path'
import { URL } from 'url'

class StocksPageController {

	async create(req, res, next) {
		try {
			const {
				date1, date2,
				title, text,
				status
			} = req.body
			const { img } = req.files
			// console.log('💊💊💊img: ', img)
			const fileName = []
			if (img) {
				const __dirname = decodeURI(new URL('.', import.meta.url).pathname)
				let name = uuidv4() + ".webp"
				fileName.push({ img: name })
				img.mv(path.resolve(__dirname, '..', 'static', name))
			}

			await models.StocksPage.create(
				{
					date1, date2,
					title, text,
					status,
					img: JSON.stringify(fileName),
				}
			)

			return res.status(201).json({ message: `Акция добавлена` })
		}
		catch (e) {
			console.log('🦺-------err: ', e.message)
			next(ApiError.badRequest(e.message))
		}
	}


	async editOne(req, res, next) {
		try {
			const {
				date1, date2,
				title, text,
				status, id
			} = req.body
			const { img } = req.files

			console.log('💊💊💊req.body: ', req.body)
			console.log('💊💊💊img: ', img)


			const fileName = []
			if (img) {
				const __dirname = decodeURI(new URL('.', import.meta.url).pathname)
				let name = uuidv4() + ".webp"
				fileName.push({ img: name })
				img.mv(path.resolve(__dirname, '..', 'static', name))
			}

			await models.StocksPage.update(

				{
					date1, date2,
					title, text,
					status,
					img: JSON.stringify(fileName)
				},
				{
					where: { id: id }
				}
			)

			return res.status(201).json({ message: `Акция именена` })
		}
		catch (e) {
			console.log('🦺-------err: ', e.message)
			next(ApiError.badRequest(e.message))
		}
	}

	async getAll(req, res, next) {
		try {
			const data = await models.StocksPage.findAll()

			return res.status(201).json(data)
		}
		catch (e) {
			console.log('🦺-------err: ', e.message)
			next(ApiError.badRequest(e.message))
		}
	}


	async getOne(req, res, next) {
		try {

			const id = req.params.id
			console.log('💊req.params.id: ', req.params.id)

			const data = await models.StocksPage.findOne({ where: { id } })

			return res.status(201).json(data)
		}
		catch (e) {
			console.log('🦺-------err: ', e.message)
			next(ApiError.badRequest(e.message))
		}
	}
	async deleteOne(req, res, next) {
		try {

			const id = req.params.id
			// console.log('💊req.params.id: ', req.params.id)

			const data = await models.StocksPage.destroy({ where: { id } })
			return res.status(201).json({ message: 'Акция удалена' })
		}
		catch (e) {
			console.log('🦺-------err: ', e.message)
			next(ApiError.badRequest(e.message))
		}
	}
}

export const stocksPageController = new StocksPageController()
