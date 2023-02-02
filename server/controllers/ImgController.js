import { models } from "../models/models.js"
import { ApiError } from '../error/ApiError.js'
import { v4 as uuidv4 } from 'uuid'
import path from 'path'
import { URL } from 'url'

class ImgController {

	async create(req, res, next) {
		try {
			const { img } = req.files
			// console.log('💊💊💊req.files: ', req.files)
			const fileName = []
			if (img) {
				const __dirname = decodeURI(new URL('.', import.meta.url).pathname)
				if (Array.isArray(img)) {
					for (let k of img) {
						let name = uuidv4() + ".webp"
						fileName.push({ img: name })
						k.mv(path.resolve(__dirname, '..', 'static', name))
					}
				} else {
					let name = uuidv4() + ".webp"
					fileName.push({ img: name })
					img.mv(path.resolve(__dirname, '..', 'static', name))
				}
			}
			await models.SliderImg.bulkCreate(fileName)
			return res.status(201).json({ message: `Картинки добавлены` })
		}
		catch (e) {
			console.log('🦺-------err: ', e.message)
			console.log('🦺-------e: ', e)
			next(ApiError.badRequest(e.message))
		}
	}
	async get(req, res, next) {
		try {


			const data = await models.SliderImg.findAll()
			return res.status(201).json(data)
		}
		catch (e) {
			console.log('🦺-------err: ', e.message)
			console.log('🦺-------e: ', e)
			next(ApiError.badRequest(e.message))
		}
	}
	async deleteImg(req, res, next) {
		try {
			const { dataId } = req.body
			await models.SliderImg.destroy({ where: { id: JSON.parse(dataId) } })
			return res.status(201).json({ message: `Банер удален с базы данных` })
		}
		catch (e) {
			console.log('🦺-------err: ', e.message)
			console.log('🦺-------e: ', e)
			next(ApiError.badRequest(e.message))
		}
	}

	async addImg(req, res, next) {
		try {
			const { category, type } = req.body
			const { img } = req.files
			console.log('💊💊💊req.body: ', req.body)
			console.log('💊💊💊type: ', typeof type)
			console.log('💊💊💊req.files: ', req.files)

			const categoryId = category === 'undefined' ? undefined : category
			const typeId = type === 'undefined' ? undefined : type

			const fileName = []
			if (img) {
				const __dirname = decodeURI(new URL('.', import.meta.url).pathname)
				let name = uuidv4() + ".webp"
				fileName.push({ img: name })
				img.mv(path.resolve(__dirname, '..', 'static', name))
			}

			let data
			if (category && !type) {
				console.log('💊💊💊: 1',)
				data = await models.BannerImgPage.create({
					img: JSON.stringify(fileName),
					// typeId: type,
					categoryId,
				})
			}
			if (!category && type) {
				console.log('💊💊💊: 2',)
				data = await models.BannerImgPage.create({
					img: JSON.stringify(fileName),
					typeId,
					// categoryId: category,
				})
			}
			if (category && type) {
				console.log('💊💊💊: 3',)
				data = await models.BannerImgPage.create({
					img: JSON.stringify(fileName),
					typeId,
					categoryId,
				})
			}
			if (!data) {
				return res.json({ message: `Ошибка, картинка не сохранена` })
			}

			return res.status(201).json({ message: `Картинки добавлены` })
		}
		catch (e) {
			console.log('🦺-------err: ', e.message)
			console.log('🦺-------e: ', e)
			next(ApiError.badRequest(e.message))
		}
	}
	async getImg(req, res, next) {
		try {
			const { categoryId, typeId } = req.query
			console.log('🦺-------------🦺categoryId', categoryId)
			let data
			if (!typeId) {
				data = await models.BannerImgPage.findOne({
					where: {
						categoryId
					}
				})
			} else {
				data = await models.BannerImgPage.findOne({
					where: {
						typeId
					}
				})
			}
			return res.status(201).json(data)
		}
		catch (e) {
			console.log('🦺-------err: ', e.message)
			console.log('🦺-------e: ', e)
			next(ApiError.badRequest(e.message))
		}
	}


}

export const imgController = new ImgController()
