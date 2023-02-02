import { Button, Form, message, Upload, Typography,Radio, Empty } from 'antd'
import { UploadOutlined, DragOutlined } from '@ant-design/icons'
import React, {useState, useEffect} from 'react'
import Resizer from "react-image-file-resizer"
import { fetchCategory, fetchType } from '../../../http/productsAPI'
import { addImgBannerPage } from '../../../http/adminAPI'

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


const FormBannerImgPage = () => {
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

	const onFinish = async (values) => {


		const formData = new FormData()

		formData.append('category', values.category)
		formData.append('type', values.type)
		for (let k in values.img.fileList) {
			const pic = await resizeFile(values.img.fileList[k].originFileObj, 2800, 1200)
			formData.append('img', pic)
		}
		//!!console ничего не покажет 
		//!!смотри на сервере req.files
		addImgBannerPage(formData)
			.then(data => {
				if (data) {
					message.success(data.message)
				}
			})
	}
	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo)
	}

	return (
		<Form
			name="page-img"
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
				label="Категория"
				name="category"
				hasFeedback
				// rules={[{
				// 	required: true,
				// 	message: 'Выберите категорию!',
				// },]}
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
				label="Размер картинки"
				tooltip="Рекомендуется для оптимального качества банера. Можно использовать online-photoshop.org. Есть готовые шаблоны для редактирования."
			>

				<Typography.Text className="ant-form-text" type="success">
					( <DragOutlined className='text-base' /> 2800x1200px )
				</Typography.Text>

			</Form.Item>

			<Form.Item
				label="Загрузите картинку для слайдера"
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
	)
}
export default FormBannerImgPage