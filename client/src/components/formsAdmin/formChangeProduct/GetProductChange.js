import React, { useState } from 'react'
import {
	Button, InputNumber,
	Form, Space
} from 'antd'
import { fetchOneProduct } from '../../../http/productsAPI'
import FormChangeProduct from './FormChangeProduct'
function GetProductChange() {
	const [product, setProduct] = useState({})
	const [form] = Form.useForm()
	const onFinish = values => {
		fetchOneProduct(values.id)
			.then(data => {
				if (data) {
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
						label='Введите id бокса'
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