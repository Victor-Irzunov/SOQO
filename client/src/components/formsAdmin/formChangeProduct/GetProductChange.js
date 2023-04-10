import React, { useState } from 'react'
import {
	Button, InputNumber,
	Form, Space
} from 'antd'
import { fetchOneProductById } from '../../../http/productsAPI'
import FormChangeProduct from './FormChangeProduct'

function GetProductChange() {
	const [product, setProduct] = useState({})
	const [form] = Form.useForm()


	const onFinish = values => {
		setProduct({})
		fetchOneProductById(values.id)
			.then(data => {
				if (data) {
					console.log('data:', data)
					setProduct(data)
				}
				// form.resetFields()
			})
	}
	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo)
	}
	return (
		<div>
			<Form
				name="getOneProduct"
				form={form}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				autoComplete="off"
			>
				<Space>
					<Form.Item
						name="id"
						label='Введите id товара'
						tooltip='Первая цифра артикула товара, например 50 (50GR23)'
						rules={[{
							required: true,
							message: 'Выберите!',
						},]}
					>
						<InputNumber />
					</Form.Item>
					<Form.Item
					>
						<Button type="primary" htmlType="submit">
							Получить
						</Button>
					</Form.Item>
				</Space>
			</Form>
			{
				Object.keys(product).length ?
					<FormChangeProduct product={product} setProduct={setProduct} />
					:
					undefined
			}
		</div>
	)
}
export default GetProductChange