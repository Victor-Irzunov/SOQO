import React, { useState, useContext, useEffect } from 'react'
import { BackTop, Typography, message } from 'antd'
import BasketSteps from '../../components/basketSteps/BasketSteps'
import { Context } from '../../App'
import { observer } from "mobx-react-lite"
import { fetchProductNoUser } from '../../http/productsAPI'
import { getAllBasketUser } from '../../http/basketAPI'
import { Helmet } from "react-helmet"
const { Title } = Typography

const BasketPage = observer(() => {
	const { dataApp, dataProducts, user } = useContext(Context)
	const [data, setData] = useState([])
	useEffect(() => {
		if (!user.isAuth) {
			if (dataApp.basketLength) {
				fetchProductNoUser(dataApp.basketArr)
					.then(data => {
						if (!!data.length) {
							setData(data)
						} else {
							message.warning('Корзина пуста')
						}
					})
					.catch(() => {
						setData([])
						message.success('Корзина пуста')
					})
			} else {
				setData([])
				message.success('В корзине пусто')
			}
		} else {
			getAllBasketUser()
				.then(data => {
					if (data.length) {
						const dataArr = []
						data.forEach(el => {
							dataArr.push({ ...el.product, countBasket: el.count })
						})
						setData(dataArr)
					} else {
						message.warning('В корзине пусто')
					}
				}
				)
		}
	}, [
		dataApp.basketLength,
		dataApp.basketArr,
		dataProducts.dataBasket,
		user.isAuth
	])
	return (
		<section className='container min-h-screen flex flex-col justify-evenly pb-10 pt-10 '>
			<Helmet>
				<title>Корзина</title>
				<meta name="description" content='Корзина' />
			</Helmet>
			<Title>Моя корзина</Title>
			<BackTop />
			<BasketSteps data={data} setData={setData} />
		</section>
	)
})
export default BasketPage