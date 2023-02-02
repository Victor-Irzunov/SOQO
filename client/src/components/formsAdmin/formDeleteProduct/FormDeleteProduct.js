import React from 'react'
import {
	Button, InputNumber,
	Form, message, Popconfirm, Space
} from 'antd'
import { deleteOneProduct } from '../../../http/adminAPI'

function FormDeleteProduct() {
	const [form] = Form.useForm()

	const onFinish = values => {
		console.log('onFinish:', values)
		deleteOneProduct(values.id)
			.then(data => {
				console.log(data)
				message.success(data.message)
				form.resetFields()
			})
	}

	const fuSubmit = () => {
		form.submit()
	}

	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo)
	}

	return (
		<div>
			<Form
				name="deleteOneProduct"
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
							message: 'Укажите id бокса!',
						},]}
					>
						<InputNumber />
					</Form.Item>

					<Form.Item
					>
						<Popconfirm
							title="Вы точно хотите удалить товар?"
							onConfirm={fuSubmit}
							okText="Да"
							cancelText="Нет"
						>
							<Button
								type="primary"
								danger
							// htmlType="submit"
							>
								Удалить
							</Button>
						</Popconfirm>
					</Form.Item>
				</Space>
			</Form>

		</div>
	)
}

export default FormDeleteProduct