import { Button, Form, DatePicker, Space, message } from 'antd'
import React from 'react'
import { getDateOrders, getDateOrdersCourier } from '../../../http/adminAPI'
const GetOrderAdmin = ({ setDataOrder, courier }) => {
	const onFinish = (values) => {
		if (courier) {
			getDateOrdersCourier(values.date.$d.toLocaleDateString("en-EN"))
				.then(data => {
					setDataOrder(data)
				})
		} else {
			getDateOrders(values.date.$d.toLocaleDateString("en-EN"))
				.then(data => {
					if (data.length) {
						setDataOrder(data)
					} else {
						message.warning('Заказов нет')
					}
				})
		}
	}
	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo)
	}
	return (
		<Form
			name="order_admin"
			onFinish={onFinish}
			onFinishFailed={onFinishFailed}
			autoComplete="off"
		>
			<Space>
				<Form.Item
					label="Выберите дату"
					name="date"
					rules={[
						{
							required: true,
							message: 'Выберите дату!',
						},
					]}
				>
					<DatePicker />
				</Form.Item>
				<Form.Item
				>
					<Button type="primary" htmlType="submit">
						Получить
					</Button>
				</Form.Item>
			</Space>
		</Form>
	)
}
export default GetOrderAdmin