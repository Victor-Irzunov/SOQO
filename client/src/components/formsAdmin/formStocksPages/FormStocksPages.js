import { Button, Form, Input, message, Upload, DatePicker, Checkbox, Typography } from 'antd'
import React, { useState } from 'react'
import { ClearOutlined, UploadOutlined, DragOutlined } from '@ant-design/icons'
import Resizer from "react-image-file-resizer"
import { createStocks } from '../../../http/adminAPI'

const { RangePicker } = DatePicker

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

const FormStocksPages = () => {

	const [isClearForm, setIsClearForm] = useState(false)
	const [form] = Form.useForm()

	const onFinish = async (values) => {
		console.log('Success:', values)

		const formData = new FormData()
		if (values.date) {
			formData.append('date1', values.date[0].$d.toLocaleDateString("ru-RU"))
			formData.append('date2', values.date[1].$d.toLocaleDateString("ru-RU"))
		}

		formData.append('title', values.title)
		formData.append('text', values.text)
		formData.append('status', values.status)

		for (let k in values.img.fileList) {
			const img = await resizeFile(values.img.fileList[k].originFileObj, 600, 400)
			formData.append('img', img)
		}
		//!!console ничего не покажет 
		//!!смотри на сервере req.files
		createStocks(formData)
			.then(data => {
				if (data) {
					message.success(data)
				}
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
			{isClearForm && <Button type='text' onClick={fuClearForm} className='text-right'><ClearOutlined className='mr-2' />Очистить форму</Button>}
			<Form
				name="stocks-pages"
				labelCol={{
					span: 24,
				}}
				wrapperCol={{
					span: 24,
				}}
				initialValues={{
					status: false,
				}}
				form={form}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				autoComplete="off"
			>
				<Form.Item
					label="Выберите дату проведения акции"
					name="date"
				// rules={[
				// 	{
				// 		required: true,
				// 		message: 'Выберите дату!',
				// 	},
				// ]}
				>
					<RangePicker />
				</Form.Item>

				<Form.Item
					label="Введите название акции"
					name="title"
					rules={[
						{
							required: true,
							message: 'Введите название акции!',
						},
					]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					label="Загрузите картинку акции"
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
					label="Размер картинки"
					tooltip="Рекомендуется для оптимального качества банера. Можно использовать online-photoshop.org. Есть готовые шаблоны для редактирования."
				>

					<Typography.Text className="ant-form-text" type="success">
						( <DragOutlined className='text-base' /> 600x400px )
					</Typography.Text>

				</Form.Item>


				<Form.Item
					label="Введите описание акции"
					name="text"
					rules={[
						{
							required: true,
							message: 'Введите описание акции!',
						},
					]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					name="status"
					valuePropName="checked"
					wrapperCol={{
						offset: 4,
						span: 8,
					}}
				>
					<Checkbox>Активная</Checkbox>
				</Form.Item>



				<Form.Item
					wrapperCol={{
						offset: 16,
						// span: 12,
					}}
				>
					<Button type="primary" htmlType="submit">
						Создать акцию
					</Button>
				</Form.Item>
			</Form>

		</>
	)
}
export default FormStocksPages