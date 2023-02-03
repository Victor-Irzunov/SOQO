import React, { useContext, useEffect, useState, } from 'react'
import { Helmet } from "react-helmet"
import { Context } from '../../App'
import {
	useLocation
} from 'react-router-dom'
import { FloatButton } from 'antd'

import CardComp from '../../components/Card/CardComp'
import { getNewProduct } from '../../http/productsAPI'

export const ViewAllPage = () => {
	let location = useLocation()
	const { dataApp } = useContext(Context)
	const [itemCard, setItemCard] = useState([])

	useEffect(() => {
		if (location.state.isNew) {
			getNewProduct()
				.then(data => {
					setItemCard(data)
			})
		}
	}, [])

	return (
		<section className='min-h-[80vh]'>
			<Helmet>
				<title>{dataApp.data['/'].title}</title>
				<meta name="description" content={dataApp.data['/'].description} />
			</Helmet>
			<FloatButton.BackTop />

			<div className='container'>
				<div className='pt-10'>
					<h1 className='text-4xl text-[#292D51]'>
						{location.state.title}
					</h1>
				</div>
				<div className='mt-24 bg-white rounded-xl py-6 px-10'>

					<CardComp itemCard={itemCard} location={location} />
				</div>

			</div>
		</section>
	)
}
