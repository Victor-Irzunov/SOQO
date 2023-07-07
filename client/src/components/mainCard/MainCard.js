
import React from 'react'
import CarouselCard from '../carouselCard/CarouselCard'

const MainCard = ({ cardItem, title, hit=false, stok=false, news=false}) => {
	return (
		<div className="site-card-wrapper relative mt-20 bg-[#EDEAEA] rounded-lg">
			<CarouselCard
				cardItem={cardItem}
				title={title}
				hit={hit}
				stok={stok}
				news={news}
			/>
		</div>
	)
}
export default MainCard