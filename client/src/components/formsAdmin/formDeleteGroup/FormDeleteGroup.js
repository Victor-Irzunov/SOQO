import React from 'react'
import {
	Button, InputNumber,
	Form, message, Popconfirm, Space
} from 'antd'
import { deleteOneGroup } from '../../../http/groupAPI'
import { useCookieList } from '../../../hooks/useCookieList'

function FormDeleteGroup() {
	const [form] = Form.useForm()
	const { deleteOneList } = useCookieList(null)
	const onFinish = values => {
		console.log('onFinish:', values)
		deleteOneGroup(values.id)
			.then(data => {
				console.log(data)
				if (data) {
					message.success('Группа удалена')
					form.resetFields()
					data.forEach(async(el) => {
						await deleteOneList('BasketProduct', el)
						await deleteOneList('ComparisonList', el)
						await deleteOneList('LikedList', el)
						await deleteOneList('view_product', el)
					})
				}
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
				name="deleteOneGroup"
				form={form}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				autoComplete="off"
			>
				<Space>
					<Form.Item
						name="id"
						label='Введите номер группы'
						rules={[{
							required: true,
							message: 'Укажите номер группы!',
						},]}
					>
						<InputNumber />
					</Form.Item>

					<Form.Item
					>
						<Popconfirm
							title="Вы точно хотите удалить группу?"
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

export default FormDeleteGroup