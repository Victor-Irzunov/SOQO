import { Button, Form, Input, message,Radio, Empty } from 'antd'
import React, { useState, useEffect } from 'react'
import { createUniqueContent } from '../../../http/adminAPI'
// import CKeditor from '../ckeditor/CKeditor'
import { ClearOutlined } from '@ant-design/icons'
import ReactEditor from '../../react-quill/ReactEditor'
import { fetchCategory, fetchType } from '../../../http/productsAPI'


const FormContentUnique = () => {
	const [value, setValue] = useState('')
	const [isClearForm, setIsClearForm] = useState(false)
	const [form] = Form.useForm()

	const [dataCategory, setDataCategory] = useState([])
	const [dataType, setDataType] = useState([])

	useEffect(() => {
		fetchCategory()
			.then(data => {
				setDataCategory(data)
			})
			.catch(err => {
				message.error(err.message)
			})
		fetchType()
			.then(data => {
				setDataType(data)
			})
			.catch(err => {
				message.error(err.message)
			})
	}, [])

	const onFinish = (values) => {
		console.log('Success:', values)
		console.log('value:', value)

		const formData = new FormData()
		formData.append('link', values.link)
		formData.append('content', value)
		formData.append('category', values.category)
		formData.append('type', values.type)
		formData.append('title', values.title)

		createUniqueContent(formData)
			.then(data => {
				message.success(data.message)
				setIsClearForm(true)
			})

	}
	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo)
	}
	const fuClearForm = () => {
		form.resetFields()
	}


	return (
		<>
			{isClearForm && <Button type='text'
				onClick={fuClearForm}
				className='text-right'>
				<ClearOutlined className='mr-2' />Очистить форму</Button>}
			<Form
				name="content-unique-page"
				labelCol={{
					span: 24,
				}}
				wrapperCol={{
					span: 24,
				}}
				form={form}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				autoComplete="off"
			>

				<Form.Item
					label="Категория"
					name="category"
					hasFeedback
					rules={[{
						required: true,
						message: 'Выберите категорию!',
					},]}
				>
					{
						dataCategory.length > 0 ?
							<Radio.Group buttonStyle="solid">
								{dataCategory.map(el => {
									return (<Radio.Button key={el.id} className='mr-1 mb-1' value={el.id}>{el.name}</Radio.Button>)
								})}
							</Radio.Group>
							:
							<Empty />
					}
				</Form.Item>
				<Form.Item
					label="Тип"
					name="type"
					hasFeedback
					// rules={[{
					// 	required: true,
					// 	message: 'Выберите тип!',
					// },]}
				>
					{
						dataType.length > 0 ?
							<Radio.Group buttonStyle="solid">
								{dataType.map(el => {
									return (<Radio.Button
										key={el.id}
										value={el.id}
										className='mr-1 mb-1'
									>
										{el.name}
									</Radio.Button>)
								})}
							</Radio.Group>
							:
							<Empty />
					}
				</Form.Item>

				<Form.Item
					label="Введите ссылку на видео"
					name="link"
					tooltip='Если есть уникальное видео'
				>
					<Input />
				</Form.Item>

				
				<Form.Item
					label="Заголовок описание к видео"
					name="title"
					tooltip='Описание видео с ключами, например "Видеообзор кухонного смесителя сантехники soqo."'
				>
					<Input />
				</Form.Item>

				<Form.Item
					label="Введите контент страницы"
					name="content"
					rules={[
						{
							required: true,
							message: 'Введите контент страницы!',
						},
					]}
				>
					<ReactEditor setValue={setValue} value={value} />
				</Form.Item>

				<Form.Item
					wrapperCol={{
						offset: 16,
						// span: 12,
					}}
				>
					<Button type="primary" htmlType="submit">
						Добавить контент
					</Button>
				</Form.Item>
			</Form>
		</>
	)
}
export default FormContentUnique