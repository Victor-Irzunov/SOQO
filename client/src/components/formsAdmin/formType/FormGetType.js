import { Button, Form, Input } from 'antd'
// import { UploadOutlined, DeleteOutlined } from '@ant-design/icons'
import React, { useState } from 'react'
import { getOneType } from '../../../http/adminAPI'
import FormChangeType from './FormChangeType'


const FormGetType = () => {
	const [form] = Form.useForm()
	const [type, setType] = useState({})

	const onFinish = (values) => {
		console.log('values: ', values)

		getOneType(values.id)
			.then(data => {
				if (data) {
					console.log('data:', data)
					setType(data)
				}
			})
	}

	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo)
	}

	return (
		<>
			<Form
				name="get-type-img"
				form={form}
				labelCol={{
					span: 24,
				}}
				wrapperCol={{
					span: 24,
				}}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				autoComplete="off"
			>
				<Form.Item
					label="Введите id Типа"
					name="id"
					hasFeedback
					rules={[{
						required: true,
						message: 'Введите id типа!',
					},]}
				>
					<Input />
				</Form.Item>

				<Form.Item
				>
					<Button type="primary" htmlType="submit" className='mt-2 float-right'>
						Получить
					</Button>
				</Form.Item>
			</Form>

			{
				Object.keys(type).length ?
					<FormChangeType type={type} />
					:
					undefined
			}
		</>
	)
}
export default FormGetType