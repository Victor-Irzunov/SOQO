import React, { useState } from 'react'
import { Button, Modal } from 'antd'
import FormLogin from '../forms/formLogin/FormLogin'
import FormRegistration from '../forms/formRegistration/FormRegistration'

const ModalComponent = ({ open, setOpen, fromPage }) => {
	const [isAccount, setIsAccount] = useState(false)

	const handleCancel = () => {
		setOpen(false)
	}
	return (
		<Modal
			open={open}
			title={<p className='text-2xl font-bold'>{isAccount ? "Регистрация" : "Вход"}</p>}
			centered
			footer={null}
			// onOk={handleOk}
			onCancel={handleCancel}
		>
			{
				!isAccount &&
				<>
					<p className='font-extralight mb-3'>Для доступа в Ваш личный кабинет введите e-mail.</p>
					<FormLogin handleCancel={handleCancel} fromPage={fromPage} />
					<span>Нет аккаунта?</span>
					<Button type='link' onClick={() => {
						setIsAccount(true)
						handleCancel()
						setTimeout(() => { setOpen(true) }, 0.5)
					}}>Зарегистрироваться</Button>
				</>
			}
			{
				isAccount &&
				<>
					<p className='font-extralight mb-3'>Для доступа в Ваш личный кабинет введите e-mail.</p>
					<FormRegistration handleCancel={handleCancel} />
					<span>Есть аккаунт?</span>
					<Button type='link' onClick={() => {
						setIsAccount(false)
						handleCancel()
						setTimeout(() => { setOpen(true) }, 0.7)
					}}>Вход</Button>
				</>
			}
		</Modal>
	)
}
export default ModalComponent