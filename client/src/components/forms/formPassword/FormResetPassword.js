import {
	Form,
	message,
	Button,
	AutoComplete,
	notification,
} from 'antd'
import React, { useState } from 'react'
import { resetPassword } from '../../../http/userAPI'


const FormResetPassword = ({ handleCancel }) => {
	const [form] = Form.useForm()
	const [autoCompleteResult, setAutoCompleteResult] = useState([])
	const [api, contextHolder] = notification.useNotification();
	const openNotificationWithIcon = (type, login) => {
		api[type]({
			message: `Вам на почту ${login} отправлено письмо`,
			description:
				'Для сброса пароля необходимо подтвердить почту, Вам необходимо в письме перейти по ссылки в письме.',
		});
	};

	const onWebsiteChange = (value) => {
		if (!value) {
			setAutoCompleteResult([]);
		} else {
			setAutoCompleteResult(['@gmail.com', '@tut.by', '@yandex.by', '@mail.ru'].map((domain) => `${value}${domain}`));
		}
	};
	const websiteOptions = autoCompleteResult.map((website) => ({
		label: website,
		value: website,
	}))


	const onFinish = values => {
		resetPassword(values.login)
			.then(data => {
				if (data) {
					openNotificationWithIcon('success', values.login)
					localStorage.setItem('_gJfhss', values.login)
					handleCancel()
					form.resetFields()
				}
			})
			.catch(error => {
				if (error.response) message.error(error.response.data.message)
			})

	}

	const onFinishFailed = (errorInfo) => message.error('Ошибка')


	return (
		<>
			{contextHolder}
			<Form
				layout='vertical'
				name="reset-password"
				form={form}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				style={{ overflowX: 'hidden' }}
			>

				<Form.Item
					label="Введите Вашу почту"
					name="login"
					tooltip="Ваша почта регистрации на нашем сайте"
					hasFeedback
					rules={[
						{
							required: true,
							message: 'Пожалуйста введите почту!',
						},
						{
							type: 'email',
							message: 'Введите корректный email!',
						},
					]}
				>
					<AutoComplete
						options={websiteOptions}
						onChange={onWebsiteChange}
						placeholder="exemple@gmail.com"
					/>
				</Form.Item>


				<Form.Item
				>
					<Button
						type="primary"
						htmlType="submit"
						onClick={onFinish}
					>
						Сбросить пароль
					</Button>
				</Form.Item>

			</Form>

		</>
	)
}

export default FormResetPassword

