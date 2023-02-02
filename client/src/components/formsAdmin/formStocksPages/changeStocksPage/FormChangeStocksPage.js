import {
	Button, Form, Input, message,
	Image, Popconfirm, DatePicker,
	Divider, Upload, Typography, Checkbox,
} from 'antd'
import { UploadOutlined, DragOutlined } from '@ant-design/icons'
import React from 'react'
import { changeStock, deleteOneStock } from '../../../../http/adminAPI'
import Resizer from "react-image-file-resizer"

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

const FormChangeStocksPage = ({ data }) => {
	const [form] = Form.useForm()


	const onFinish = async (values) => {
		console.log('Success:', values)
		const formData = new FormData()
		formData.append('date1', values.date[0].$d.toLocaleDateString("ru-RU"))
		formData.append('date2', values.date[1].$d.toLocaleDateString("ru-RU"))
		formData.append('title', values.title)
		formData.append('text', values.text)
		formData.append('status', values.status)
		formData.append('id', data.id)

		for (let k in values.img.fileList) {
			const img = await resizeFile(values.img.fileList[k].originFileObj, 600, 400)
			formData.append('img', img)
		}

		changeStock(formData)
			.then(data => {
				message.success(data.message)
			})
	}
	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo)
	}
	const deleteStock = () => {
		deleteOneStock(data.id)
			.then(data => {
				message.success(data.message)
				form.resetFields()
			})
	}

	return (
		<Form
			name="stocks-pages-edit"
			labelCol={{
				span: 24,
			}}
			wrapperCol={{
				span: 24,
			}}
			initialValues={{
				status: data.status,
				title: data.title,
				text: data.text,
			}}
			form={form}
			onFinish={onFinish}
			onFinishFailed={onFinishFailed}
			autoComplete="off"
		>

			<p>Период проведения акции: {data.date1} - {data.date2}</p>

			<Form.Item
				label="Выберите новую дату проведения акции"
				name="date"
				rules={[
					{
						required: true,
						message: 'Выберите дату!',
					},
				]}
			>
				<RangePicker />
			</Form.Item>

			<Form.Item
				label="Введите новое название акции"
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

			<Divider />



			<div className=''>
				<Image preview={false}
					src={process.env.REACT_APP_API_URL + JSON.parse(data.img)[0].img}
					className=''
					width={100}
				/>
			</div>



			<Form.Item
				label="Загрузить новую картинку"
				name="img"
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
				label="Введите новое описание акции"
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
				}}
			>
				<Button type="primary" htmlType="submit">
					Изменить акцию
				</Button>
			</Form.Item>

			<Popconfirm
				title="Вы точно хотите удалить акцию?"
				onConfirm={deleteStock}
				okText="Да"
				cancelText="Нет"
			>
				<Button type="text" danger>
					Удалить акцию
				</Button>
			</Popconfirm>
		</Form>
	)
}
export default FormChangeStocksPage