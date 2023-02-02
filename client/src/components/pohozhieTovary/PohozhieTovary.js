import { Divider } from 'antd'
import React, { useState, useEffect } from 'react'
import CarouselCard from '../carouselCard/CarouselCard'
import { getAllProductOneType } from '../../http/productsAPI'


const PohozhieTovary = ({ product }) => {
	const [productData, setProductData] = useState([])

	useEffect(() => {
		if (Object.keys(product).length) {
			getAllProductOneType(product.typeId)
				.then(data => {
					setProductData(data.filter(item => item.id !== product.id))
				})
		}
	}, [product])

	return (
		<div className="site-card-wrapper relative">
			<Divider
				orientation="left"
				style={{ fontSize: '1.5em', color: '#ccc' }}
				className=''
			>
				Похожие товары
			</Divider>
			<CarouselCard product={productData} />
		</div>
	)
}
export default PohozhieTovary