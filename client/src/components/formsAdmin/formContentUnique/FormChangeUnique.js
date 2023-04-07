import { Button, Form, Input, message, Radio, Empty } from 'antd'
import React, { useState, useEffect } from 'react'
import { changeOneUniqueContent, createUniqueContent } from '../../../http/adminAPI'
// import CKeditor from '../ckeditor/CKeditor'
import { ClearOutlined } from '@ant-design/icons'

import { fetchCategory, fetchType } from '../../../http/productsAPI'
import ReactEditor from '../../react-quill/ReactEditor'
import { deleteOneUniqueContent } from '../../../http/adminAPI'


const FormChangeUnique = ({ data, setData }) => {
	const [value, setValue] = useState(data.content)
	const [isClearForm, setIsClearForm] = useState(false)
	const [form] = Form.useForm()

	const [dataCategory, setDataCategory] = useState([])
	const [dataType, setDataType] = useState([])

	// console.log('value:', value)

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

		const formData = new FormData()
		formData.append('link', values.link ? values.link : 'undefined')
		formData.append('content', value)
		formData.append('category', values.category)
		formData.append('type', values.type)
		formData.append('title', values.title ? values.title : 'undefined')
		formData.append('id', data.id)

		changeOneUniqueContent(formData)
			.then(data => {
				if (data) {
					message.success(data.message)
					setIsClearForm(true)
					setData({})
				} else {
					message.error(data.message)
				}

			})

	}

	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo)
	}
	const fuClearForm = () => {
		form.resetFields()
	}

	const deleteFu = (id) => {
		deleteOneUniqueContent(id)
			.then(data => {
				console.log('data:', data)
			})
	}


	return (
		<>
			{
				isClearForm && <Button type='text'
					onClick={fuClearForm}
					className='text-right'>
					<ClearOutlined className='mr-2' />Очистить форму</Button>
			}

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
				initialValues={{
					category: data.categoryId,
					link: data.link !== 'undefined' ? data.link : '',
					type: data.typeId,
					content: data.content,
					title: data.title !== 'null'? data.title : ''
				}}
			>

				<Form.Item
					label="Категория"
					name="category"
					hasFeedback
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
					<ReactEditor value={value} setValue={setValue} />
				</Form.Item>

				<div className='flex'>
					<Form.Item
						wrapperCol={{
							offset: 16,
						}}
					>
						<Button
							type="text"
							htmlType="submit"
							onClick={() => deleteFu(data.id)}
							style={{
								color: 'red'
							}}
						>
							Удалить
						</Button>
					</Form.Item>

					<Form.Item
						wrapperCol={{
							offset: 16,
						}}
					>
						<Button type="primary" htmlType="submit">
							Сохранить изменения
						</Button>
					</Form.Item>
				</div>
			</Form>

		</>
	)
}
export default FormChangeUnique