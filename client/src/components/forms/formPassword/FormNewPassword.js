import { Button, Form, Input, message } from 'antd'
import { newPassword } from '../../../http/userAPI'
import React, { useContext } from 'react'
import { Context } from '../../../App'
import { useNavigate } from 'react-router-dom'

const FormNewPassword = () => {
	const { user } = useContext(Context)
	const navigate = useNavigate()
	const [form] = Form.useForm()

	const onFinish = (values) => {
		console.log('Success:', values)

		const login = localStorage.getItem('_gJfhss')
		const formData = new FormData()
		formData.append('login', login)
		formData.append('password', values.password)

		newPassword(formData)
			.then(data => {
				if (data) {
					message.success('Пароль изменён')
					user.setIsAuth(true)
					user.setUser(user)
					user.setUserData(data)
					navigate(`${'/'}`)
					form.resetFields()
					localStorage.removeItem('_gJfhss')
				}
			})
			.catch(error => {
				if (error.response) message.error(error.response.data.message)
			})

	};
	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};
	return (
		<div className='w-1/2 text-center'>
			<p className=''>Введите новый пароль</p>
			<br />
			<br />
			<br />
			<Form
				name="new-password"
				labelCol={{
					span: 8,
				}}
				wrapperCol={{
					span: 16,
				}}
				style={{
					maxWidth: 600,
				}}
				form={form}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				autoComplete="off"
			>

				<Form.Item
					label="Новый пароль"
					name="password"
					tooltip="минимум 4 символа"
					hasFeedback
					rules={[
						{
							required: true,
							message: 'Пожалуйста введите новый пароль!',
						},
					]}
				>
					<Input.Password placeholder="мин. 4 символа" />
				</Form.Item>
				<Form.Item
					name="password2"
					label="Повторите пароль"
					dependencies={['password']}
					rules={[
						{
							required: true,
							message: 'Пожалуйста повторите пароль!',
						},
						({ getFieldValue }) => ({
							validator(_, value) {
								if (!value || getFieldValue('password') === value) {
									return Promise.resolve();
								}
								return Promise.reject(new Error('Пароли не совпадают!'));
							},
						}),
					]}
				>
					<Input.Password />
				</Form.Item>

				<Form.Item
					wrapperCol={{
						offset: 8,
						span: 16,
					}}
				>
					<Button type="primary" htmlType="submit">
						Изменить пароль
					</Button>
				</Form.Item>
			</Form>
		</div>
	)
}
export default FormNewPassword