
import { Image, Button } from 'antd'
import React from 'react'
import { AppstoreOutlined } from '@ant-design/icons'
import { NavLink } from 'react-router-dom'
import logo from '../../../images/logo/Logo.png'
import { Context } from '../../../App'
import BadgeIconHeard from '../../badgeIcon/badgeIconHeard/BadgeIconHeard'
import BadgeIconBasked from '../../badgeIcon/BadgeIconBasket'
import BadgeIconVesy from '../../badgeIcon/badgeIconVesy/BadgeIconVesy'
import FormSearch from '../../forms/formSearch/FormSearch'
import CyrillicToTranslit from 'cyrillic-to-translit-js'
import { Link as LinkScroll } from 'react-scroll'

const HeaderMenu = ({ isAffix, setHover }) => {
	// const { dataApp } = useContext(Context)
	const cyrillicToTranslit = new CyrillicToTranslit()

	const handleMouseEnter = () => {
		setHover(true);
	};

	const handleMouseLeave = () => {
		setHover(false);
	};

	return (
		<div
			className='flex justify-between items-center'
		>
			<div className='flex items-center'>
				<div>
					<NavLink to="/">
						<Image src={logo}
							preview={false}
							// style={isAffix ? { width: '80%' } : { width: '100%' }}
							className='duration-500'
						/>
					</NavLink>
				</div>
				<div className='flex text-white 
					justify-between items-center
					mb-0 list-none tracking-normal	
					font-light ml-12 mr-12'

				>
					<Button type='primary'
						className='bg-transparent 
						border border-white/50'
						onMouseEnter={handleMouseEnter}
					// onClick=
					>
						{/* <NavLink to='' className='text-white no-underline'> */}
						<AppstoreOutlined className='mr-2' />
						Каталог
						{/* </NavLink> */}
					</Button>
				</div>


				<div className='ml-6'>
					<FormSearch isAffix={isAffix} />
				</div>
				<div className='ml-8'>
					<ul
						className='flex text-white 
					justify-between items-center
					mb-0 list-none tracking-normal	
					font-light text-base
					'
					>

						<li className='mr-5'
							onMouseEnter={handleMouseLeave}
						>
							<NavLink to={`/${cyrillicToTranslit.transform('акции')}`}
								className='text-white no-underline'
							>
								Акции
							</NavLink>
						</li>

						<li className='mr-5'>
							<LinkScroll to='about'
								smooth={true}
								offset={-100}
								duration={800}
								className="cursor-pointer text-white"
								onMouseEnter={handleMouseLeave}
							>
								О нас
							</LinkScroll>
						</li>

						<li className='mr-5'>
							<LinkScroll to='contact'
								smooth={true}
								offset={-100}
								duration={800}
								className="cursor-pointer text-white"
								onMouseEnter={handleMouseLeave}
							>
								Контакты
							</LinkScroll>
						</li>
					</ul>
				</div>
			</div>


			<div className='flex justify-between items-center'>
				<BadgeIconVesy header={true} />
				<BadgeIconHeard header={true} />
				<BadgeIconBasked />
			</div>
		</div>
	)
}
export default HeaderMenu
