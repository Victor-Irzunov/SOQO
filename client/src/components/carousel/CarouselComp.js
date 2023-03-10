import { Carousel, Image } from 'antd'
import { LeftOutlined, RightOutlined } from "@ant-design/icons"
import React from 'react'
import { Link } from 'react-router-dom'


const CarouselComp = ({ imgData }) => {
	return (
		<div className='mt-5'>
			<Carousel
				autoplay
				effect='fade'
				className=''
				dots={false}
				arrows prevArrow={<LeftOutlined className='text-white text-6xl' />}
				nextArrow={<RightOutlined className='text-white text-6xl' />}
			>
				{imgData.map(el => {
					return (
						<div key={el.id} className='' >
							<Link to='/aktsii'>
								<Image
									src={process.env.REACT_APP_API_URL + el.img}
									alt='изображение'
									preview={false}
									className='rounded-2xl'
								/>
							</Link>
						</div>
					)
				})}
			</Carousel>
		</div>
	)
}
export default CarouselComp