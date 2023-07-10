import { models } from "../models/models.js"
import { ApiError } from '../error/ApiError.js'
import { Op } from "sequelize"


class OrderController {

	async createNoUser(req, res, next) {
		try {
			const {
				dataBasket, city,
				street, comment,
				date, dostavka,
				login, oplata,
				tel, time, firstName,
				lastName, otchestvo, indeks,
			} = req.body
			const [data, created] = await models.User.findOrCreate({ where: { login } })
			const [dataCreateBasket, createdBasket] = await models.Basket.findOrCreate({ where: { userId: data.id } })
			const order = await models.Order.create({
				userId: data.id,
				delivery: dostavka,
				city, address: street,
				oplata, phone: tel,
				comment, date, time, indeks
			})


			JSON.parse(dataBasket).forEach(async (el) => {
				await models.BasketOrder.create({
					productId: el.poductId,
					count: el.count,
					priceMinusDiscount: el.priceMinusDiscount,
					price: el.price,
					basketId: dataCreateBasket.id,
					orderId: order.id,
					status: true
				})
				const product = await models.Product.findOne({ where: { id: el.poductId } })
				if (product.count - el.count >= 0) {
					product.count = product.count - el.count
					await product.save()
				}

			})

			let userData = await models.UserData.findOne({ where: { userId: data.id } })
			if (!userData) {
				userData = await models.UserData.create({
					fitstName: firstName, lastName,
					otchestvo, email: login,
					phone: tel, address: street, city,
					userId: data.id
				})
			} else {
				userData.fitstName = firstName
				userData.lastName = lastName
				userData.otchestvo = otchestvo
				userData.email = login
				userData.phone = tel
				userData.address = street
				userData.city = city
				await userData.save()
			}

			const orderData = await models.BasketOrder.findAll({
				where: { orderId: order.id },
				include: [
					{
						model: models.Product
					},
					{
						model: models.Order
					}
				]
			})
			return res.status(201).json({orderData, userData})
		}
		catch (e) {
			console.log('🦺-------err: ', e.message)
			console.log('🦺-------e: ', e)
			next(ApiError.badRequest(e.message))
		}
	}

	async isBuyProduct(req, res, next) {
		try {
			const userId = req.user.id
			const { id } = req.params
			const basket = await models.Basket.findOne({ where: { userId } })
			const data = await models.BasketOrder.findOne({
				where: {
					basketId: basket.id, productId: id
				}
			})
			res.status(201).json(data)
		} catch (e) {
			console.log('🦺-------err: ', e.message)
			console.log('🦺-------e: ', e)
			next(ApiError.badRequest(e.message))
		}
	}


	async getAll(req, res, next) {
		try {

			const userId = req.user.id

			const basket = await models.Basket.findOne({ where: { userId } })
			const data = await models.BasketOrder.findAll({
				where: {
					basketId: basket.id
				},
				include: [
					{
						model: models.Order
					},
					{
						model: models.Product
					}
				]

			})
			res.status(201).json(data)
		} catch (e) {
			console.log('🦺-------err: ', e.message)
			console.log('🦺-------e: ', e)
			next(ApiError.badRequest(e.message))
		}

	}


	async getDateAdmin(req, res, next) {
		try {
			// console.log('-----------------🦺', '🦺-------------------')
			const { date } = req.query
			const data = await models.BasketOrder.findAll({
				where: {
					createdAt: {
						[Op.gte]: new Date(date)
					}
				},
				include: [
					{
						model: models.Order
					},
					{
						model: models.Product
					}
				]
			})
			// console.log('🦺data:', data)
			res.status(201).json(data)
		} catch (e) {
			console.log('🦺-------err: ', e.message)
			console.log('🦺-------e: ', e)
			next(ApiError.badRequest(e.message))
		}
	}

	async changeStatusOrder(req, res, next) {
		try {
			// console.log('-----------------🦺', '🦺-------------------')
			const { id, status } = req.query
			console.log('--🦺status:', status)
			const data = await models.BasketOrder.findOne({
				where: { id }
			})
			// console.log('🦺data:', data)
			if (status === '1') {
				data.status = true
			} else {
				data.status = false
			}
			data.save()

			res.status(201).json({ message: `Статус заказа номер: ${id} изменён` })
		} catch (e) {
			console.log('🦺-------err: ', e.message)
			console.log('🦺-------e: ', e)
			next(ApiError.badRequest(e.message))
		}
	}
	async getOneAdmin(req, res, next) {
		try {
			// console.log('-----------------🦺', '🦺-------------------')
			const { id } = req.params
			const data = await models.BasketOrder.findOne({
				where: { id }
			})
			// console.log('🦺data:', data)
			data.status =
				res.status(201).json(data)

		} catch (e) {
			console.log('🦺-------err: ', e.message)
			console.log('🦺-------e: ', e)
			next(ApiError.badRequest(e.message))
		}
	}
}
export const orderController = new OrderController()
