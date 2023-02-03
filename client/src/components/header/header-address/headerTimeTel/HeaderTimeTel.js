import React, { useContext, useState } from 'react'
import { Button, Typography, Popover, Badge } from 'antd'
import {
	HistoryOutlined,
	PhoneOutlined,
	UserOutlined,
	ReadOutlined,
	ExportOutlined,
	EyeOutlined,
} from '@ant-design/icons'
import { Context } from '../../../../App'
import ModalComponent from '../../../modalLoginRegistrat/ModalComponent'
import { Link } from 'react-router-dom'
import { observer } from "mobx-react-lite"
// import { useScreens } from '../../../../Constants/constants'
import heart from '../../../../images/menuIcon/heart6.svg'
import vesy from '../../../../images/menuIcon/scale2.svg'
import { Content } from '../../../../content/Content'


export const ContentAdmin = () => {
	const { user } = useContext(Context)
	const exit = () => {
		localStorage.removeItem('token')
		user.setIsAuth(false)
		user.setUser(false)
	}
	return (
		<div>
			<p className='mb-2'>
				<Link to='/super-adminka'>Страница администратора</Link>
			</p>
			<hr />
			<p className='mt-2'>
				<Button
					type='text'
					className='p-0'
					onClick={exit}
				>Выход</Button>
			</p>
		</div>
	)
}
export const ContentCourier = () => {
	const { user } = useContext(Context)
	const exit = () => {
		localStorage.removeItem('token')
		user.setIsAuth(false)
		user.setUser(false)
	}
	return (
		<div>
			<p className='mb-2'>
				<Link to='/dlya-voditelya'>Страница курьера</Link>
			</p>
			<hr />
			<p className='mt-2'>
				<Button
					type='text'
					className='p-0'
					onClick={exit}
				>Выход</Button>
			</p>
		</div>
	)
}





const { Paragraph } = Typography
const HeaderTimeTel = observer(() => {
	const { user } = useContext(Context)
	const [open, setOpen] = useState(false)




	const showModal = () => {
		setOpen(true)
	}
	return (
		<div
			className={`border-l pl-2 flex justify-between items-center w-full`}
		>
			<div className={`flex items-center`}>
				<HistoryOutlined className='text-base mr-3' />
				<div>
					<Paragraph
						editable={{
							triggerType: 'text'
						}}
					>
						вт-вс: 10:00-20:00
					</Paragraph>
					<Paragraph
						editable={{
							triggerType: 'text'
						}}
					>
						пн: Выходной
					</Paragraph>
				</div>
			</div>
			<div
				className='ml-5 mr-5'
			>
				<Button type='link'
					className='text-base'
					icon={<PhoneOutlined className='text-base rotate-90' />} href='tel:80445842068'>
					+375 (44) 584 20 68
				</Button>
			</div>
			<div>
				{
					user.isAuth ?
						<Popover
							placement="bottomRight"
							content={user.userData.role === 'ADMIN' ? ContentAdmin : <Content/>}
							trigger="click"
						>
							<Button
								className='text-base hover:text-blue-500'
								type='text'
								icon={<UserOutlined />}
							>
								{'Привет!'}{' '}
								{user.userData.role === 'ADMIN' && 'Админ'}
							</Button>
						</Popover>
						:
						<Button
							className='text-base hover:text-blue-500'
							type='text'
							icon={<UserOutlined />}
							onClick={showModal}
						>
							{'Личный кабинет'}
						</Button>
				}
			</div>
			<ModalComponent open={open} setOpen={setOpen} />
		</div>
	)
})
export default HeaderTimeTel