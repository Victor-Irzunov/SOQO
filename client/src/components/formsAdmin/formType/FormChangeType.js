import { Button, Form, message, Upload, Image, Radio, Empty, Input, Space } from 'antd'
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons'
import React, { useState, useEffect } from 'react'
import Resizer from "react-image-file-resizer"
import { fetchType } from '../../../http/productsAPI'
import CyrillicToTranslit from 'cyrillic-to-translit-js'
import { changeType, createType, deleteeType } from '../../../http/adminAPI'

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


const FormChangeType = ({type}) => {
	const [form] = Form.useForm()
	// const [dataType, setDataType] = useState([])
	const cyrillicToTranslit = new CyrillicToTranslit()
	const [isActive, setIsActive] = useState(false)
	const [isUpdate, setIsUpdate] = useState(false)

	const createLink = name => {
		let link = cyrillicToTranslit.transform(name, "-").toLowerCase()
		return link
	}

	// useEffect(() => {
	// 	fetchType()
	// 		.then(data => {
	// 			setDataType(data)
	// 		})
	// 		.catch(err => {
	// 			message.error(err.message)
	// 		})
	// }, [isUpdate])


	const onFinish = async (values) => {
		console.log('values: ', values)

		const formData = new FormData()
		formData.append('alt', values.alt)
		formData.append('name', values.name)
		formData.append('id', type.id)
		formData.append('link', createLink(values.name))

		if (values.img) {
			for (let k in values.img.fileList) {
				const pic = await resizeFile(values.img.fileList[k].originFileObj, 150, 150)
				formData.append('img', pic)
			}
		}
	

		changeType(formData)
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
				initialValues={{
					name: type.name,
					alt: type.alt,

				}}
			>

				<Form.Item
					label="Тип"
					name="name"
					hasFeedback
					// rules={[{
					// 	required: true,
					// 	message: 'Введите тип!',
					// },]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					label="Описание картинки"
					name="alt"
					hasFeedback
					// rules={[{
					// 	required: true,
					// 	message: 'Введите тип!',
					// },]}
				>
					<Input />
				</Form.Item>


				{
					<Image src={process.env.REACT_APP_API_URL + JSON.parse(type.img)[0].img}/>
			}

				<Form.Item
					label="Изменить картинку для данного типа"
					name="img"
					// rules={[
					// 	{
					// 		required: true,
					// 		message: 'Загрузите картинку!',
					// 	},
					// ]}
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

		

		</>
	)
}
export default FormChangeType