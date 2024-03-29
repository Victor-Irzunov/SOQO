import React, { useContext, useEffect, useState, } from 'react'
import { Helmet } from "react-helmet"
import { Context } from '../../App'
import {
	useLocation
} from 'react-router-dom'
import { FloatButton } from 'antd'

import CardComp from '../../components/Card/CardComp'
import { getAkciiProducts, getHitProduct, getNewProduct } from '../../http/productsAPI'

export const ViewAllPage = () => {
	let location = useLocation()
	const { dataApp } = useContext(Context)
	const [itemCard, setItemCard] = useState([])
	const [title, setTitle] = useState('Новое поступление')

	useEffect(() => {
		console.log('location.pathname::: ', location.pathname);



		if (location.pathname == '/assortiment/novoe-postuplenie') {
			getNewProduct()
				.then(data => {
					console.log('data::: ', data);
					setItemCard(data)
				})
		}
		if (location.pathname == '/assortiment/khit-prodazh') {
			setTitle('Хиты продаж')
			getHitProduct()
				.then(data => {
					console.log('data::: ', data);
					setItemCard(data)
				})
		}
		if (location.pathname == '/assortiment/aktsii') {
			setTitle('Акции магазина')
			getAkciiProducts()
				.then(data => {
					console.log('data:',data)
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
						{title}
					</h1>
				</div>
				<div className='mt-24 bg-white rounded-xl py-6 xm:px-10 xz:px-1'>

					<CardComp itemCard={itemCard} location={location} />
				</div>

			</div>
		</section>
	)
}
