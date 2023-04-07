import React, { useState } from 'react'
import {
	Button, InputNumber,
	Form, Space, message
} from 'antd'
import FormChangeUnique from './FormChangeUnique'
import { getOneUniqueContentById } from '../../../http/adminAPI'

function FormGetOneUnique() {
	const [data, setData] = useState({})
	const [form] = Form.useForm()


	const onFinish = values => {
		setData({})
		getOneUniqueContentById(values.id)
			.then(data => {
				console.log('data:', data)
				if (Object.keys(data).length && !data.message) {
					setData(data)

					form.resetFields()
				}

				if (data.message) {
					message.warning(data.message)
				}
			})
	}
	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo)
	}
	return (
		<div>
			<Form
				name="getOneUniqueContent"
				form={form}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				autoComplete="off"
			>
				<Space>
					<Form.Item
						name="id"
						label='Введите id контента'
						tooltip='id контента написан справа от заголовка контента'
						rules={[{
							required: true,
							message: 'Введите!',
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
				Object.keys(data).length ?
					<FormChangeUnique data={data} setData={setData} />
					:
					undefined
			}
		</div>
	)
}
export default FormGetOneUnique
