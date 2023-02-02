import { Badge, Image } from 'antd'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import Svg from '../../images/menuIcon/Svg.js'
import { Context } from '../../App.js'
import { observer } from "mobx-react-lite"
import cart from '../../images/carouselCard/cart4.svg'

const BadgeIconBasked = observer(({ mobil }) => {
	const { dataApp } = useContext(Context)

	return (
		mobil ?
			<div
				className='cursor-pointer mr-2'
			>
				<Badge count={dataApp.basketLength} size="small" showZero>
					<Link to='/korzina'>
						<Image src={cart} preview={false} width='30px' />
					</Link>
				</Badge>

			</div>
			:
			<div className='cursor-pointer'>
				<Badge count={dataApp.basketLength} size="small" showZero>
					<Link to='/korzina'>
						<Image src={cart} preview={false} width='30px' />
					</Link>
				</Badge>

			</div>
	)
})
export default BadgeIconBasked