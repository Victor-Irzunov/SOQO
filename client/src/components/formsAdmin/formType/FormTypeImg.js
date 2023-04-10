import { Button, Form, message, Upload, Image, Radio, Empty, Input, Space } from 'antd'
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons'
import React, { useState, useEffect } from 'react'
import Resizer from "react-image-file-resizer"
import { fetchType } from '../../../http/productsAPI'
import CyrillicToTranslit from 'cyrillic-to-translit-js'
import { createType, deleteeType } from '../../../http/adminAPI'

const resizeFile = (file, size, size2) =>
	new Promise((resolve) => {
		Resizer.imageFileResizer(
			file,
			size,
			size2,
			"WEBP",
			75,
			0,
			(uri) => {
				resolve(uri)
			},
			"file"
		)
	})


const FormTypeImg = () => {
	const [form] = Form.useForm()
	const [dataType, setDataType] = useState([])
	const cyrillicToTranslit = new CyrillicToTranslit()
	const [isActive, setIsActive] = useState(false)
	const [isUpdate, setIsUpdate] = useState(false)

	const createLink = name => {
		let link = cyrillicToTranslit.transform(name, "-").toLowerCase()
		return link
	}

	useEffect(() => {
		fetchType()
			.then(data => {
				setDataType(data)
				// console.log('data: ', data)
			})
			.catch(err => {
				message.error(err.message)
			})
	}, [isUpdate])


	const onFinish = async (values) => {
		console.log('values: ', values)

		const formData = new FormData()
		formData.append('alt', values.alt)
		formData.append('name', values.name)
		formData.append('link', createLink(values.name))

		for (let k in values.img.fileList) {
			const pic = await resizeFile(values.img.fileList[k].originFileObj, 150, 150)
			formData.append('img', pic)
		}

		createType(formData)
			.then(data => {
				if (data) {
					message.success(data.message)
					setIsUpdate(i => !i)
				}
			})
	}

	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo)
	}

	const deleteType = id => {
		deleteeType(id)
			.then(data => {
				console.log('data:', data)
				if (!data) {
					message.warning('Вы не можете удалить тип, т.к. есть товар с этим типом. Удалите сначала весь товар с данным типом!', [5])
				} else {
					message.success(data.message)
					setIsUpdate(i => !i)
				}
			})
	}

	return (
		<>
			<Form
				name="type-img"
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
					label="Тип"
					name="name"
					hasFeedback
					rules={[{
						required: true,
						message: 'Введите тип!',
					},]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					label="Описание картинки"
					name="alt"
					hasFeedback
					rules={[{
						required: true,
						message: 'Введите тип!',
					},]}
				>
					<Input />
				</Form.Item>


				{/* <Form.Item
				label="Размер картинки"
				tooltip="Рекомендуется для оптимального качества банера. Можно использовать online-photoshop.org. Есть готовые шаблоны для редактирования."
			>

				<Typography.Text className="ant-form-text" type="success">
					( <DragOutlined className='text-base' /> 2800x1200px )
				</Typography.Text>

			</Form.Item> */}

				<Form.Item
					label="Загрузите картинку для типа"
					name="img"
					rules={[
						{
							required: true,
							message: 'Загрузите картинку!',
						},
					]}
				>
					<Upload
						listType="picture"
						className="upload-list-inline"
						maxCount={1}
					>
						<Button icon={<UploadOutlined />}>Загрузить</Button>
					</Upload>
				</Form.Item>

				<Form.Item
				>
					<Button type="primary" htmlType="submit" className='mt-2 float-right'>
						Сохранить
					</Button>
				</Form.Item>
			</Form>

			{
				dataType.length ?
					<Button
						type='text'
						onClick={() => setIsActive(i => !i)}
						className='block mb-10'
					>
						Смотреть типы
					</Button>
					:
					<Empty />
			}


			<Space wrap>
				{
					isActive ?
						dataType.length ? dataType.map(el => {
							const img = JSON.parse(el.img)
							return (

								<div key={el.id}
									className='flex justify-between 
									items-center border 
									bg-white p-3 rounded-lg
									relative
									'
								>
									<Image preview={false} alt={el.alt} src={process.env.REACT_APP_API_URL + img[0].img} />
									<p className='ml-3 uppercase'>
										{el.name}
									</p>
									<Button
										type='text'
										className='absolute top-0 right-0'
										onClick={() => deleteType(el.id)}
									>
										<DeleteOutlined className='text-red-600' />
									</Button>
									<span className='absolute top-0 left-0 p-2 text-white bg-orange-600'>
										{el.id}
									</span>
								</div>


							)
						})
							:
							undefined
						:
						undefined
				}
			</Space>
		</>
	)
}
export default FormTypeImg