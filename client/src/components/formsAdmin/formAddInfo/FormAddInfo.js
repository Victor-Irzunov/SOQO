import { Button, Form, Input, message } from 'antd'
import { addOneContentToArrInfo } from '../../../http/adminAPI'

const FormAddInfo = ({ id, setIsActive, setIsId, setIsUpdate }) => {
	const [form] = Form.useForm()

	const onFinish = (values) => {
		console.log('Success:', values)

		const formData = new FormData()
		formData.append('id', values.id.id)
		formData.append('content', values.content)

		addOneContentToArrInfo(formData)
			.then(data => {
				if (data) {
					message.success(data.message)
					form.resetFields()
					setIsActive(i => !i)
					setIsId('')
					setIsUpdate(i => !i)
				}
			})
	}
	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo)
	}



	return (
		<Form
			name="add-info"
			labelCol={{
				span: 24,
			}}
			wrapperCol={{
				span: 24,
			}}
			form={form}
			style={{
				maxWidth: 400,
			}}

			onFinish={onFinish}
			onFinishFailed={onFinishFailed}
			autoComplete="off"
		>
			<Form.Item
				label="Добавить характеристику"
				name="content"
				rules={[
					{
						required: true,
						message: 'Введите характеристику!',
					},
				]}
			>
				<Input />
			</Form.Item>

			<Form.Item
				name={'id'}
				hidden={true}
				initialValue={{ id }}
			>
				<Input value={id} />
			</Form.Item>


			<Form.Item
				wrapperCol={{
					offset: 8,
					span: 16,
				}}
			>
				<Button type="primary"
					htmlType="submit"
				>
					Добавить
				</Button>
			</Form.Item>
		</Form>
	)
}
export default FormAddInfo