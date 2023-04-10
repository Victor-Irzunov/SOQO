import { models } from "../models/models.js"
import { ApiError } from '../error/ApiError.js'
import path from 'path'
import fs from 'fs'
import { URL } from 'url'
class GroupController {

	async deleteOne(req, res, next) {
		try {
			const groupId = req.params.id
			const __dirname = decodeURI(new URL('.', import.meta.url).pathname)
			const directoryPath = path.resolve(__dirname, '..', 'static')
			const prod = await models.Product.findAll({ where: { groupId } })
			const arrId = []
			// console.log('💊💊💊 prod: ', prod)
			prod.forEach(async (el) => {
				arrId.push(el.id)
				await models.ProductInfo.destroy({ where: { productId: el.id } })
				await models.BasketProduct.destroy({ where: { productId: el.id } })
				await models.Product.destroy({ where: { id: el.id } })

				const s = JSON.parse(el.img)
				const s2 = JSON.parse(el.imgMini)
				const a = [...s, ...s2]

				await fs.readdir(directoryPath, (err, files) => {
					if (err) throw err;
					files.forEach(file => {
						a.forEach(el => {
							if (file === el.image) {
								fs.unlink(path.join(directoryPath, file), err => {
									if (err) throw err;
								})
							}
						})
					})
				})
			})


			await models.Group.destroy({ where: { id: groupId } })

			return res.status(201).json(arrId)
		}
		catch (e) {
			console.log('🦺-------e: ', e)
			next(ApiError.badRequest(e.message))
		}
	}
}

export const groupController = new GroupController()
