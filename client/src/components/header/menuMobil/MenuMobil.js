import { Menu } from 'antd'
import React, { useState, useContext } from 'react'
import { Context } from '../../../App'
import { NavLink,Link } from 'react-router-dom'
import { Link as LinkScroll } from 'react-scroll'

const MenuMobil = ({ setIsActiveMenu }) => {
	const { dataApp } = useContext(Context)
	const [current] = useState('1')
	const items = [
		{
			label: (
				<Link to="/" className='' onClick={() => setIsActiveMenu(i => !i)}>
					Главная
				</Link>),
			key: 'main',
		},
	]


	dataApp.dataMenu.forEach(el => {
		const type = []
		el.types.forEach((elem, idx) => {
			type.push({
				label: (
					<NavLink
						to={`/${el.link}/${elem.link}`}
						onClick={() => setIsActiveMenu(i => !i)}
					>
						{elem.name}
					</NavLink>
				),
				key: elem.link + el.id
			})
		})
		items.push({
			label: (<NavLink
				to={`/${el.link}`}
				className='text-white'
				onClick={() => setIsActiveMenu(i => !i)}
			>
				{el.name}
			</NavLink>),
			key: el.link + el.id,
			children: type
		})
	})

	if (items.length > 1) {
		items.push(
			{
				label: (<NavLink to='/aktsii'
					className='text-white'
					onClick={() => setIsActiveMenu(i => !i)}
				>
					Акции
				</NavLink>
				),
				key: 123,
			},
			{
				label: (<LinkScroll to='about'
					smooth={true}
					offset={-100}
					duration={800}
					className="cursor-pointer text-white"
					onClick={() => setIsActiveMenu(i => !i)}
				>
					О нас
				</LinkScroll>
				),
				key: 1234,
			},
			{
				label: (<LinkScroll to='contact'
				smooth={true}
				offset={-100}
				duration={800}
				className="cursor-pointer text-white"
				onClick={() => setIsActiveMenu(i => !i)}
			>
				Контакты
			</LinkScroll>
				),
				key: 1235,
			},
		)
	}

	return (
		<Menu
			style={{
				background: 'transparent',
				color: '#fff',
				paddingBottom: '1em'
			}}
			selectedKeys={[current]}
			mode="inline"
			triggerSubMenuAction='click'
			items={items}
		/>
	)
}
export default MenuMobil