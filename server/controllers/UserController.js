import { ApiError } from "../error/ApiError.js"
import bcrypt from "bcrypt"
import { models } from "../models/models.js"
import jwt from 'jsonwebtoken'
import { v4 as uuidv4 } from 'uuid'
import { validationResult } from "express-validator"
import { mailService } from '../mail/MailService.js'
import chalk from 'chalk'



const generateJwt = (id, login, role, isActivation) => {
	return jwt.sign(
		{ id, login, role, isActivation },
		process.env.SECRET_KEY,
		{ expiresIn: '30 days' }
	)
}

class UserController {
	async registration(req, res, next) {

		try {
			const errors = validationResult(req)
			if (!errors.isEmpty()) {
				return next(ApiError.badRequest("Ошибка валидации", errors.array()))
			}

			const { login, password, role } = req.body
			if (!login || !password) return next(ApiError.badRequest('Некорректный email или password'))

			const candidate = await models.User.findOne({ where: { login } })

			if (candidate && candidate.dataValues.password) {
				return next(ApiError.badRequest('Пользователь с таким email уже существует'))
			}
			if (role === 'ADMIN') {
				const admin = await models.User.findOne({ where: { role: 'ADMIN' } })
				if (admin) return next(ApiError.badRequest('Администратор уже существует'))
			}

			const hashPassword = await bcrypt.hash(password, 5)
			const activationLink = uuidv4()

			let user

			if (candidate && !candidate.dataValues.password) {
				candidate.password = hashPassword;
				candidate.activationLink = activationLink;
				await candidate.ave();
				user = await models.User.findOne({ where: { login } })
			}
			if (!candidate) {
				user = await models.User.create({ login, role, password: hashPassword, activationLink, isActivation: false })
			}
			const token = generateJwt(user.id, user.login, user.role, user.isActivation)

			await mailService.sendActivationMail(login, `${process.env.API_URL}/api/user/activate/${activationLink}`)
			await models.Basket.create({ userId: user.id })

			return res.json({ token })

		} catch (err) {
			console.log('🚀-error: ', err)
			console.log(chalk.red('🚀-error: ', err))
			next(ApiError.internal(err.message))
		}

	}

	async login(req, res, next) {
		try {
			const { login, password } = req.body
			const user = await models.User.findOne({ where: { login } })
			if (!user) {
				return next(ApiError.internal('Пользователь не найден'))
			}

			let comparePassword = bcrypt.compareSync(password, user.password)
			if (!comparePassword) {
				return next(ApiError.internal('Указан неверный пароль'))
			}

			const token = generateJwt(user.id, user.login, user.role, user.isActivation)
			return res.json({ token })
		} catch (err) {
			console.log('🚀login🚀-error: ', err)
		}
	}

	async check(req, res, next) {
		try {
			const user = await models.User.findOne({ where: { id: req.user.id } })
			const token = generateJwt(req.user.id, req.user.login, req.user.role, user.isActivation)
			return res.json({ token })
		} catch (err) {
			console.log('🚀🚀🚀-error: ', err)
		}
	}

	async activate(req, res, next) {
		try {
			const activationLink = req.params.link
			const user = await models.User.findOne({ where: { activationLink } })
			if (!user) {
				throw new Error('Неккоректная ссылка активации')
			}
			user.isActivation = true
			await user.save()

			return res.redirect(process.env.CLIENT_URL) //edit CLIENT_URL (react 3000)

		} catch (e) {
			console.log('🚀🚀🚀🚀-error: ', e)
		}
	}

	
	async myAccount(req, res, next) {
		try {

			const userId = req.user.id
			// console.log('💊userId:', userId)
			const userData = await models.UserData.findOne({ where: { userId } })
			const user = await models.User.findByPk(userId)
			return res.status(201).json({ userData, user })

		} catch (e) {
			cconsole.log('🦺-------err: ', e.message)
			console.log('🦺-------e: ', e)
		}
	}
	async reset(req, res, next) {
		try {

			const { login } = req.query
			// console.log('🚀login:', login)
			const user = await models.User.findOne({ where: { login } })
			const activationLink = uuidv4()
			if (user) {
				user.activationLink = activationLink
				await user.save()
				await mailService.sendActivationLogin(login, `${process.env.API_URL}/api/user/activate/reset/${activationLink}`)
			} else {
				return next(ApiError.badRequest('Пользователь с таким email не существует'))
			}
			return res.status(201).json({ user })

		} catch (e) {
			console.log('🦺-------err: ', e.message)
			console.log('🦺-------e: ', e)

		}
	}

	async activateReset(req, res, next) {
		try {
			const activationLink = req.params.link
			const user = await models.User.findOne({ where: { activationLink } })
			if (!user) {
				throw new Error('Неккоректная ссылка активации')
			}
			return res.redirect(process.env.CLIENT_RESET_URL) //edit CLIENT_URL (react 3000)

		} catch (e) {
			console.log('🚀🚀🚀🚀-error: ', e)
		}
	}

	async newPassword(req, res, next) {
		try {
			const { login, password } = req.body
			const user = await models.User.findOne({ where: { login } })
			if (!user) {
				throw new Error('Неккоректная почта')
			}
			const hashPassword = await bcrypt.hash(password, 5)
			user.password = hashPassword
			user.save()
			const token = generateJwt(user.id, user.login, user.role, user.isActivation)

			return res.json({ token })

		} catch (e) {
			console.log('🚀🚀🚀🚀-error: ', e)
			next(ApiError.internal(e.message))

		}
	}
}

export const userController = new UserController()
