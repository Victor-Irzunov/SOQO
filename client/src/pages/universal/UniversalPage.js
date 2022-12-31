import React, { useState, useContext, useEffect } from 'react'
import { Helmet } from "react-helmet"
import { Typography, Layout, Space, Button, Divider, BackTop, Empty,  Drawer } from 'antd'
import { UpCircleOutlined, DownCircleOutlined, FilterOutlined } from '@ant-design/icons'
import CardComp from '../../components/Card/CardComp'
import FilterAll from '../../components/filterAll/FilterAll'
import { textMenPage } from '../../content/Content'
import { Context } from '../../App'
import { observer } from "mobx-react-lite"
import PaginationComp from '../../components/pagination/PaginationComp'
import {
	Link, useLocation,
	useSearchParams
} from 'react-router-dom'
import { fetchProducts } from '../../http/productsAPI'
import { useScreens } from '../../Constants/constants'

const { Sider, Content } = Layout
const { Paragraph } = Typography



const UniversalPage = observer(() => {
	const { dataApp } = useContext(Context)
	const [editH1, setEditH1] = useState('')
	const [editH2] = useState(textMenPage.h2)
	// const [h2, setH2] = useState('')
	const [editH3] = useState(textMenPage.h3)
	const [editP] = useState(textMenPage.p)
	const [editP2] = useState(textMenPage.p2)
	const [editP3] = useState(textMenPage.p3)
	const screens = useScreens()
	let [searchParams, setSearchParams] = useSearchParams()
	const [open, setOpen] = useState(false);
	let location = useLocation()
	const localPath = location.pathname.split('/').join('')
	const arrLocalPath = location.pathname.split('/').filter(function (el) {
		return (el != null && el != "" || el === 0)
	})

	const [itemCard, setItemCard] = useState([])
	const [totalItem, setTotalItem] = useState(1)
	const [page, setPage] = useState(1)
	const [pageSize, setPageSize] = useState(10)
	const [categoryId, setCategoryId] = useState(null)
	const [typeId, setTypeId] = useState(null)
	const [type, setType] = useState([])
	const [isReset, setIsReset] = useState(false)
	const [isBtnSortRatng, setIsBtnSortRatng] = useState(false)
	const [isBtnSortPrice, setIsBtnSortPrice] = useState(false)
	const [inputValueFrom, setInputValueFrom] = useState(15)
	const [inputValueBefore, setInputValueBefore] = useState(null)
	const params = searchParams.get('page')
	useEffect(() => {
		if (!params) setPage(1)
		if (params && page !== params) setPage(+params)
		if (dataApp.dataMenu) {
			dataApp.dataMenu.forEach(el => {
				if (el.link === arrLocalPath[0]) {
					setCategoryId(el.id)
					setEditH1(el.name)
					setTypeId(null)
					setType(el.types)
				}
				if (arrLocalPath.length === 2) {
					el.types.forEach(elem => {
						if (elem.link === arrLocalPath[1]) {
							setTypeId(elem.id)
							// setH2(elem.name)
						}
					})
				}
			})
		}
	}, [
		arrLocalPath,
	])
	useEffect(() => {
		if (categoryId) {
			fetchProducts(page, pageSize, categoryId, typeId)
				.then(data => {
					setItemCard(data.rows)
					setTotalItem(data.count)
				})
		}
	}, [
		page,
		pageSize,
		localPath,
		categoryId,
		typeId,
		isReset
	])

	const sendFormFilter = () => {
		fetchProducts(page, pageSize, categoryId, typeId, inputValueFrom, inputValueBefore)
			.then(data => {
				setItemCard(data.rows)
				setTotalItem(data.count)
			})
			.finally(() => {
				setInputValueFrom(15)
				setInputValueBefore(null)
			})
	}
	const onChangePage = (page, pageSize) => {
		setPage(page)
		setPageSize(pageSize)
		setSearchParams({ page: page })
	}
	const resetFilter = () => setIsReset(i => !i)
	const filterUpDownPrice = () => {
		if (!isBtnSortPrice) {
			setIsBtnSortPrice(i => !i)
			return setItemCard(prev => prev.sort((a, b) => a.price - b.price))
		}
		setIsBtnSortPrice(i => !i)
		return setItemCard(prev => prev.sort((a, b) => b.price - a.price))
	}
	const filterUpDownRating = () => {
		if (!isBtnSortRatng) {
			setIsBtnSortRatng(i => !i)
			return setItemCard(prev => prev.sort((a, b) => a.rating - b.rating))
		}
		setIsBtnSortRatng(i => !i)
		return setItemCard(prev => prev.sort((a, b) => b.rating - a.rating))
	}
	const showDrawer = () => {
		setOpen(true);
	}
	const onClose = () => {
		setOpen(false);
	}
	return (
		<>
			<Helmet>
				<title>{dataApp.data['/muzhskie'].title}</title>
				<meta name="description" content={dataApp.data['/muzhskie'].description} />
			</Helmet>
			<BackTop />
			<section className='container'>
				<Space align='center' className='mt-6'>
					<Typography.Title
						level={1}
						className=''
						style={screens.xs && {
							fontSize: '2em',
						}}
					>
						{editH1}
					</Typography.Title>
					<span className='text-slate-400'>{totalItem} товаров</span>
				</Space>
				<br />
				<Space className='mt-6 mb-6'>
					<span className='text-slate-400'>Ещё категории:
						{type.map(el => {
							if (el.link !== arrLocalPath[1]) {
								return (
									<Link to={`/${arrLocalPath[0]}/${el.link}`} key={el.id} >
										<Button type='link'>
											<span className='underline'>{el.name}</span>
										</Button>
									</Link>
								)
							}
						})}
					</span>
				</Space>
				<br />
				<Space>
					<Button
						type='link'
						className='pl-2 xs:block sm:hidden'
						onClick={showDrawer}
					>
						Показать фильтр по цене <FilterOutlined />
					</Button>
				</Space>
				<br />
				<Space>
					<div>
						<Button
							type="primary"
							shape="round"
							size='small'
							className='mr-16 xs:hidden xx:hidden xy:hidden sm:block'
						>
							Фильтр подбора
						</Button>
					</div>
					<div>
						<span className=' text-slate-400'>
							Сортировать по:
							<Button
								type="text"
								onClick={filterUpDownRating}
							>
								<span className='underline'>Рейтингу</span>
								{!isBtnSortRatng ?
									<DownCircleOutlined />
									:
									<UpCircleOutlined />
								}
							</Button>
							<Button
								type="text"
								onClick={filterUpDownPrice}
							>
								<span className='underline'>Цене</span>
								{!isBtnSortPrice ?
									<DownCircleOutlined />
									:
									<UpCircleOutlined />
								}
							</Button>
						</span>
					</div>
				</Space>
				<Layout className='mt-2'>
					<Sider theme='light' className='xs:hidden xx:hidden xy:hidden sm:block'>
						<FilterAll
							sendFormFilter={sendFormFilter}
							inputValueFrom={inputValueFrom}
							inputValueBefore={inputValueBefore}
							setInputValueFrom={setInputValueFrom}
							setInputValueBefore={setInputValueBefore}
							resetFilter={resetFilter}
						/>
					</Sider>

					<Drawer title="Фильтр по цене" placement="right" onClose={onClose} open={open}>
						<FilterAll
							sendFormFilter={sendFormFilter}
							inputValueFrom={inputValueFrom}
							inputValueBefore={inputValueBefore}
							setInputValueFrom={setInputValueFrom}
							setInputValueBefore={setInputValueBefore}
							resetFilter={resetFilter}
						/>
					</Drawer>
					<Content className='pb-20 bg-white'>
						{
							totalItem
								?
								<>
									<CardComp itemCard={itemCard} page={page} location={location} />
									<br />
									<br />
									<PaginationComp totalItem={totalItem} onChange={onChangePage} current={page} />
								</>
								:
								<Empty>
									<p className='mb-7'>
										По данному фильтру товара нет!
									</p>
									<Button onClick={resetFilter}>
										Сбросить фильтр
									</Button>
								</Empty>
						}
						<div className='mt-32'>
							<Paragraph>
								{editP}
							</Paragraph>
							<Divider orientation="left">
								<Typography.Title
									level={4}
								>
									{editH2}
								</Typography.Title>
							</Divider>
							<Paragraph
							>
								{editP2}
							</Paragraph>
							<Typography.Title
								level={5}
								className=''
							>
								{editH3}
							</Typography.Title>
							<Paragraph
							>
								{editP3}
							</Paragraph>
						</div>
					</Content>
				</Layout>
			</section>
		</>
	)
})
export default UniversalPage
