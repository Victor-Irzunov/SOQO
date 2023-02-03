import React, { useState } from 'react'
import FormBasketOrder from '../formsBasket/FormBasketOrder'
import { Row, Col } from 'antd'
import BasketCard from '../basketCard/BasketCard'

function BasketDostavkaIOplata({ next, data }) {

	const [priceDostavki, setPriceDostavki] = useState(0)

	return (
		<div className='pt-12'>
			<p className='text-center mb-6 text-xl'>Данные для оформления заказа</p>
			<Row gutter={[10, 10]}>

				<Col xl={10} xs={{ order: 2 }} sm={{ order: 1 }}>
					<FormBasketOrder
						next={next}
						setPriceDostavki={setPriceDostavki}
					/>
				</Col>

				<Col xl={14} xs={{ order: 1 }} sm={{ order: 2 }}>
					<BasketCard
						data={data}
						isActive={true}
						priceDostavki={priceDostavki}
						setPriceDostavki={setPriceDostavki}
					/>
				</Col>
			</Row>
		</div>
	)
}

export default BasketDostavkaIOplata