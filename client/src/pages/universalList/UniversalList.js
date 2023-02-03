import React, { useState, useEffect, useContext } from 'react'
import { Row, Col, Typography, Button, message, Empty, BackTop } from 'antd'
import CardComp from '../../components/Card/CardComp'
import { ClearOutlined } from '@ant-design/icons'
import { Context } from '../../App'
import { fetchProductNoUser } from '../../http/productsAPI'
import { useLocation } from 'react-router-dom'
import { useCookieList } from '../../hooks/useCookieList'
import { observer } from "mobx-react-lite"
import { Helmet } from "react-helmet"

const { Title } = Typography

const UniversalList = observer(({ like, view }) => {
	const { dataApp } = useContext(Context)
	let location = useLocation()
	const { deleteAllList, deleteOneList } = useCookieList(null)
	const [itemCard, setItemCard] = useState([])
	
	useEffect(() => {
		if (like) {
			if (dataApp.likedLength) {
				fetchProductNoUser(dataApp.likedArr)
					.then(data => {
						if (Array.isArray(data)) {
							setItemCard(data)
						} else {
							message.success(data.message)
						}
					})
			} else {
				setItemCard([])
				message.success('Тут пусто')
			}
		} else {
			if (dataApp.viewLength) {
				fetchProductNoUser(dataApp.viewArr)
					.then(data => {
						if (Array.isArray(data)) {
							setItemCard(data)
						} else {
							message.success(data.message)
						}
					})
			} else {
				setItemCard([])
				message.success('Тут пусто')
			}
		}
	}, [dataApp.likedLength, dataApp.likedArr, dataApp.viewLength, dataApp.viewArr, like, view])

	function clearAllList() {
		if (like) {
			deleteAllList('LikedList')
		} else {
			deleteAllList('view_product')
		}

		setItemCard([])
	}
	function deleteOneElCookies(id) {
		if (like) {
			deleteOneList('LikedList', id)
		} else {
			deleteOneList('view_product', id)
		}
	}
	return (
		<section className='container pt-9 pb-12 min-h-[50vh]'>
			<Helmet>
				<title>
					{like ? 'Понравившиеся товары' : 'Просмотренные товары'}
				</title>
				<meta name="description" content={like ? 'Понравившиеся товары' : 'Просмотренные товары'} />
			</Helmet>
			<Title>
				{like ? 'Понравившиеся товары' : 'Просмотренные товары'}
			</Title>
			<BackTop />
			{itemCard.length ?
				<div className='w-full flex justify-end mb-3'>
					<Button
						type='text' danger
						onClick={() => clearAllList()}
					>
						<ClearOutlined />
						Очистить список
					</Button>
				</div>
				:
				<Empty />
			}
			<Row>
				<Col xl={24}>

					<CardComp itemCard={itemCard} location={location} deleteOneElCookies={deleteOneElCookies} />
				</Col>
			</Row>
		</section>
	)
})
export default UniversalList