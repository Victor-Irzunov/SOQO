import React, { useState, useContext, useEffect } from 'react'
import { Helmet } from "react-helmet"
import {
	Typography, Layout, Space, Button,
	BackTop, Empty, Drawer, Image,
} from 'antd'
import {
	UpCircleOutlined,
	DownCircleOutlined,
	FilterOutlined,
} from '@ant-design/icons'
import CardComp from '../../components/Card/CardComp'
import FilterAll from '../../components/filterAll/FilterAll'
import { Context } from '../../App'
import { observer } from "mobx-react-lite"
import PaginationComp from '../../components/pagination/PaginationComp'
import {
	Link, useLocation,
	useSearchParams
} from 'react-router-dom'
import { fetchProducts } from '../../http/productsAPI'
import { useScreens } from '../../Constants/constants'
import { ContentUniversalPage } from '../../components/contentUniversalPage/ContentUniversalPage'
import { getImgBannerPage } from '../../http/imgAPI'

const { Sider, Content } = Layout

const UniversalPage = observer(({ assortiment }) => {
	const { dataApp } = useContext(Context)
	const [editH1, setEditH1] = useState('')

	const screens = useScreens()
	let [searchParams, setSearchParams] = useSearchParams()
	const [open, setOpen] = useState(false);
	let location = useLocation()
	const localPath = location.pathname.split('/').join(' ')
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
	const [typeTitle, setTypeTitle] = useState('')
	const [isReset, setIsReset] = useState(false)
	const [isBtnSortRatng, setIsBtnSortRatng] = useState(false)
	const [isBtnSortPrice, setIsBtnSortPrice] = useState(false)
	const [inputValueFrom, setInputValueFrom] = useState(5)
	const [inputValueBefore, setInputValueBefore] = useState(null)
	const [dataImg, setDataImg] = useState({})
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
							setTypeTitle(elem.name)
							setEditH1(elem.name)
						}
					})
				} else {
					setTypeTitle('')
				}
			})
		}
	}, [arrLocalPath])

	useEffect(() => {
		if (assortiment) {
			fetchProducts(page, pageSize)
				.then(data => {
					setItemCard(data.rows)
					setTotalItem(data.count)
				})
		} else {
			if (categoryId) {
				fetchProducts(page, pageSize, categoryId, typeId)
					.then(data => {
						setItemCard(data.rows)
						setTotalItem(data.count)
					})
			}
		}
	}, [
		page,
		pageSize,
		localPath,
		categoryId,
		typeId,
		isReset
	])
	useEffect(() => {
		if (categoryId && !typeId) {
			getImgBannerPage({ categoryId, typeId: null })
				.then(data => {
					if (data) {
						setDataImg(data)
					}
				})
		}
		if (categoryId && typeId) {
			getImgBannerPage({ categoryId, typeId })
				.then(data => {
					if (data) {
						setDataImg(data)
					}

				})
		}
	}, [categoryId, typeId])

	const sendFormFilter = () => {
		fetchProducts(page, pageSize, categoryId, typeId, inputValueFrom, inputValueBefore)
			.then(data => {
				setItemCard(data.rows)
				setTotalItem(data.count)
			})
			.finally(() => {
				setInputValueFrom(5)
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
		setOpen(true)
	}
	const onClose = () => {
		setOpen(false)
	}

	return (
		<>
			<Helmet>
				<title>{editH1}{typeTitle ? ` | ${typeTitle}` : ''}</title>
				<meta name="description" content={editH1} />
			</Helmet>
			<BackTop />
			<section className='container'>
				<div className='mt-6 mb-3 flex justify-between items-center flex-wrap'>
					<Typography.Title
						level={1}
						className=''
						style={screens.xs && {
							fontSize: '2em',
						}}
					>
						{editH1}
					</Typography.Title>
					<span className='text-slate-400 pl-2 font-light text-xs'>количество товаров: {totalItem} шт</span>
				</div>

				{Object.keys(dataImg).length ?
					(<div
						className='w-full mb-6 rounded-xl overflow-hidden'
					>
						<img
							src={process.env.REACT_APP_API_URL + JSON.parse(dataImg.img)[0].img}
							className='bg-center bg-cover w-full'

						/>
					</div>)
					:
					undefined
				}

				<br />
				
				<p className='text-slate-400'>Ещё категории:</p>
				<Space className='mt-6 mb-6' wrap>
						{type.map(el => {
							
							if (el.link !== arrLocalPath[1]) {
								return (
									<Link to={`/${arrLocalPath[0]}/${el.link}`} key={el.id} >
								
										<div className='bg-white rounded-lg w-28 text-center p-1 flex justify-between items-center'>
											<Image preview={false} alt={el.alt} src={process.env.REACT_APP_API_URL + JSON.parse(el.img)[0].img } />
											
												<span className='underline uppercase text-[8px] ml-2 leading-3'>{el.name}</span>
											</div>
											
									</Link>
								)
							}
						})}

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
							className='mr-16 xs:hidden xx:hidden xy:hidden xz:hidden sm:block'
						>
							Фильтр подбора
						</Button>
					</div>
					<div className='mt-3'>
						<div className='text-slate-400 flex justify-between xy:items-center xz:items-start xz:flex-col xy:flex-row'>
							<span>
								Сортировать по:
							</span>
							<div className='flex'>
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
							</div>
						</div>
					</div>
				</Space>
				<Layout className='mt-2 mb-10'>
					<Sider theme='light' className='xs:hidden xx:hidden xy:hidden xz:hidden sm:block rounded-xl'>
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
							onClose={onClose}
						/>
					</Drawer>
					<Content className='p-2 xs:px-16 xx:px-11 xy:px-7 xm:px-2 bg-white rounded-xl'>
						{
							totalItem
								?
								<>
									<CardComp itemCard={itemCard} page={page} location={location} />
									<br />
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

					</Content>
				</Layout>
				<ContentUniversalPage categoryId={categoryId} typeId={typeId} />
			</section>
		</>
	)
})
export default UniversalPage
