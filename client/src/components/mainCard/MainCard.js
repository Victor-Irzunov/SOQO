
import React from 'react'
import CarouselCard from '../carouselCard/CarouselCard'
const MainCard = ({ cardItem, title, hit }) => {
	return (
		<div className="site-card-wrapper relative mt-20 bg-[#EDEAEA] rounded-lg">
			<CarouselCard cardItem={cardItem} title={title} hit={hit} />
		</div>
	)
}
export default MainCard