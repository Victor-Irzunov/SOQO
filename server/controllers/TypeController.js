import { models } from "../models/models.js"
import { ApiError } from '../error/ApiError.js'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'
import { URL } from 'url'

class TypeController {

    async create(req, res, next) {
        try {
            const { name, link, alt } = req.body
            const { img } = req.files
            // console.log('🦺-🦺-🦺req.body: ',req.body)
            // console.log('🦺-🦺-🦺req.files: ', req.files)
            const fileName = []
            if (Object.keys(img).length) {
                const __dirname = decodeURI(new URL('.', import.meta.url).pathname)
                let name = uuidv4() + ".webp"
                fileName.push({ img: name })
                img.mv(path.resolve(__dirname, '..', 'static', name))
            }
            await models.Type.create({ name, link, alt, img: JSON.stringify(fileName) })
            return res.status(201).json({ message: `Тип добавлен` })
        }
        catch (e) {
            console.log('ошибка : ', e)
            next(ApiError.badRequest(e.message))
        }
    }
    async change(req, res, next) {
        try {
            const { name, link, alt, id } = req.body
            const img  = req?.files?.img
            console.log('🦺-🦺-🦺req.body: ',req.body)
            console.log('🦺-🦺-🦺req.files: ', req.files)
            if (img) {
                const fileName = []
                if (Object.keys(img).length) {
                    const __dirname = decodeURI(new URL('.', import.meta.url).pathname)
                    let name = uuidv4() + ".webp"
                    fileName.push({ img: name })
                    img.mv(path.resolve(__dirname, '..', 'static', name))
                }
                await models.Type.update({ name, link, alt, img: JSON.stringify(fileName) }, { where: { id } })
            } else {
                await models.Type.update({ name, link, alt }, { where: { id } })
            }
           
           
            return res.status(201).json({ message: `Тип успешно изменён!` })
        }
        catch (e) {
            console.log('ошибка : ', e)
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {
        const types = await models.Type.findAll()
        return res.json(types)
    }

    async getOne(req, res) {
        const { id } = req.params
        // console.log('🦺-🦺-🦺-id:', id)
        const types = await models.Type.findOne({
            where: {
                id
            }
        })
        return res.json(types)
    }

    async deleteOne(req, res) {
        try {
            const { id } = req.params
            const product = await models.Product.findAll({
                where: {
                    typeId: id
                }
            })
            if (product.length) {
                return res.status(204).json({ message: `Нельзя` })
            }

            await models.Type.destroy({ where: { id: id } })
            return res.json({ message: `Тип удален` })
        }
        catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

}

export const typeController = new TypeController()
