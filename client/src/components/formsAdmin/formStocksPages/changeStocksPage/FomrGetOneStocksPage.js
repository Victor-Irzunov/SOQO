import React, { useState } from 'react'
import {
	Button,
	Form, Input
} from 'antd'
import { getOneStock } from '../../../../http/adminAPI'
import FormChangeStocksPage from './FormChangeStocksPage'

function FomrGetOneStocksPage() {
	const [data, setData] = useState({})
	const [form] = Form.useForm()

	const onFinish = values => {
		console.log('values: ', values)
		getOneStock({ id: values.id })
			.then(data => {
				if (data) {
					setData(data)
					console.log('data: ', data)
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
				name="getOnePage"
				form={form}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				autoComplete="off"
			>
				<div className='flex flex-col'>
					<Form.Item
						name="id"
						label='Введите № акции'
						rules={[{
							required: true,
							message: 'Введите №!',
						},]}
					>
						<Input />
					</Form.Item>

					<Form.Item
					>
						<Button type="primary" htmlType="submit">
							Получить
						</Button>
					</Form.Item>

				</div>
			</Form>

			{
				Object.keys(data).length ?
					<FormChangeStocksPage data={data} setData={setData} />
					:
					undefined
			}
		</div>
	)
}

export default FomrGetOneStocksPage