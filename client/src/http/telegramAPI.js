import { $host } from "./index"
import { chat_id, uri_api } from '../Constants/constants'


export const sendOrderTelegram = async (data) => {
	console.warn("🚀 🚀 🚀  _ file: telegramAPI.js:6 _ sendOrderTelegram _ data:", data)
	if (Array.isArray(data.orderData) && data.orderData.length) {

		console.log('data.userData.lastName:', typeof data.userData.lastName)

		await data.orderData.forEach(el => {
			let messageForm = `<b>Заказ с сайта</b>\n`
			messageForm += `<b> </b>\n`
			messageForm += `<b>Заказ №</b> «${el.id}»\n`
			messageForm += `<b> </b>\n`
			messageForm += `<b>Название товара: </b> ${el.product.name}\n`
			messageForm += `<b>Артикул: </b>${el.product.id}GR\n`
			messageForm += `<b>Количество: </b> ${el.count}\n`
			messageForm += `<b>Cумма без скидки: </b> ${el.count * el.price}\n`
			messageForm += `<b>Скидка: </b> ${el.priceMinusDiscount}\n`
			messageForm += `<b>Сумма со скидкой: </b> ${el.count * el.price - el.priceMinusDiscount}\n`
			messageForm += `<b>Заказ на дату: </b> ${el.order.date}\n`
			messageForm += `<b>Время: </b> ${+el.order.time || 'не указано'}\n`
			messageForm += `<b>Адрес: </b>г. ${+el.order.city || 'не указано'} ул. ${+el.order.address || 'не указано'}\n`
			messageForm += `<b>Оплата: </b> ${el.order.oplata}\n`
			messageForm += `<b> </b>\n`
			messageForm += `<b>Способ получения: </b> ${el.order.delivery}\n`
			messageForm += `<b>Город: </b> ${el.order.city || 'самовывоз'}\n`
			messageForm += `<b>Адрес: </b> ${el.order.address || 'самовывоз'}\n`
			messageForm += `<b>Индекс: </b> ${el.order.indeks || 'не указано'}\n`
			messageForm += `<b> </b>\n`
			messageForm += `<b>Телефон: </b> ${el.order.phone}\n`
			messageForm += `<b> </b>\n`
			messageForm += `<b>Комментарий: </b> ${el.order.comment || 'не указано'}\n`
			messageForm += `<b> </b>\n`
			if (data.userData && Object.keys(data.userData).length) {
				messageForm += `<b>Имя: </b> ${data.userData.fitstName || 'не указано'}\n`
				messageForm += `<b>Фамилия: </b> ${data.userData.lastName || 'не указано'}\n`
				messageForm += `<b>Отчество: </b> ${data.userData.otchestvo || 'не указано'}\n`
				messageForm += `<b>Почта: </b> ${data.userData.email || 'не указано'}\n`
				
			}
			messageForm += `<b> </b>\n`
			messageForm += `<b>На складе товара осталось: </b> ${el.product.count}\n`

			$host.post(uri_api, {
				chat_id,
				parse_mode: 'html',
				text: messageForm,
			}).then(res => {
				if (res.status === 200) {
					console.log('Отправлено в телеграмм')
				}
			}
			)
		})

	} else {
		let messageForm = `<b>Заказ с сайта</b>\n`
		messageForm += `<b> </b>\n`
		messageForm += `<b>Заказ №</b> «${data.id}»\n`
		messageForm += `<b> </b>\n`
		messageForm += `<b>Название товара: </b> ${data.product.name}\n`
		messageForm += `<b>Количество: </b> ${data.count}\n`
		messageForm += `<b>На сумму: </b> ${data.count * data.price}\n`
		messageForm += `<b>На дату: </b> ${data.order.date}\n`
		messageForm += `<b>Время: </b> ${data.order.time || 'не указано'}\n`
		messageForm += `<b>Адрес: </b>г. ${data.order.city || 'не указано'} ул. ${data.order.address || 'не указано'}\n`
		messageForm += `<b>Оплата: </b> ${data.order.oplata}\n`
		messageForm += `<b>Телефон для связи: </b> ${data.order.phone}\n`
		messageForm += `<b> </b>\n`
		messageForm += `<b>На складе осталось: </b> ${data.product.count}\n`

		$host.post(uri_api, {
			chat_id,
			parse_mode: 'html',
			text: messageForm,
		}).then(res => {
			if (res.status === 200) {
				console.log('Отправлено в телеграмм')
			}
		})
	}

}




