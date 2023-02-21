import { $host } from "./index"
import { chat_id, uri_api } from '../Constants/constants'


export const sendOrderTelegram = async (data) => {
	let messageForm = `<b>Заказ с сайта</b>\n`
	messageForm += `<b> </b>\n`
	messageForm += `<b>Заказ №</b> «${data.id}»\n`
	messageForm += `<b> </b>\n`
	messageForm += `<b>Название: </b> ${data.product.name}\n`
	messageForm += `<b>Количество: </b> ${data.count}\n`
	messageForm += `<b>На сумму: </b> ${data.count * data.price}\n`
	messageForm += `<b>На дату: </b> ${data.order.date}\n`
	messageForm += `<b>Время: </b> ${data.order.time}\n`
	messageForm += `<b>Адрес: </b>г. ${data.order.city ? data.order.city : '' } ул. ${data.order.address ? data.order.address : ''}\n`
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




