import React, { useEffect, useContext, useState } from 'react'
import {
	Radio, Table,
	Tooltip, Typography,
	Image, Rate,
	Button, message
} from 'antd'
import { CheckOutlined, DeleteOutlined, ClearOutlined } from '@ant-design/icons'
import { fetchInfoTitle, fetchProductNoUser } from '../../http/productsAPI'
import { Context } from '../../App'
import {
	Link, useLocation
} from 'react-router-dom'
// import Svg from '../../images/menuIcon/Svg'
import { useCookieList } from '../../hooks/useCookieList'
import ModalCookies from '../modalCookies/ModalCookies'
import { observer } from "mobx-react-lite"
import {
	PushpinOutlined,
	ArrowRightOutlined,
	ArrowLeftOutlined,
} from '@ant-design/icons'
import { addBasketUserOneProduct } from '../../http/basketAPI'
import { useScreens } from '../../Constants/constants'
import CyrillicToTranslit from 'cyrillic-to-translit-js'
import basket from '../../images/carouselCard/cart4.svg'



const { Paragraph } = Typography

const BtnComp = observer(({ el }) => {
	const { dataApp, user, dataProducts } = useContext(Context)
	const [dataModal, setDataModal] = useState({})
	const { addList } = useCookieList(null)
	const [isModalOpen, setIsModalOpen] = useState(false)
	const screens = useScreens()
	function addBasket(el) {
		if (!user.isAuth) {
			addList('BasketProduct', el.id)
		} else {
			addBasketUserOneProduct(el.id)
				.then(data => {
					dataApp.setBasketLength(data.length)
					dataProducts.setDataBasket(data)
					message.success('Товар добавлен в корзину')
				})
		}
		setDataModal(el)
		setIsModalOpen(true)
	}
	return (
		<div className='mr-3'>
			{(user.isAuth ? dataProducts.dataBasket.some(elem => elem.productId === el.id) : dataApp.basketArr.some(elem => elem.id === el.id)) ?
				<Link to='/korzina'>
					<Tooltip title="Товар в корзине">
						<Button
							type="primary"
							shape="round"
							// size="small"
							icon={<CheckOutlined />}
							style={{ boxShadow: 'none' }}
						/>
					</Tooltip>
				</Link>
				:
				<Tooltip title="Добавить в корзину">
					<div
						className='py-1 px-4 bg-[#292D51] rounded-3xl'
						onClick={() => addBasket(el)}
					>
						<Image src={basket} preview={false} style={screens.xs ? { width: '22px' } : { width: '26px' }} />
					</div>
				</Tooltip>
			}
			<ModalCookies isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} data={dataModal} btnText={"продолжить"} />
		</div>
	)
})

const ComparisonList = observer(() => {
	const { dataApp } = useContext(Context)
	const screens = useScreens()
	const [colomns, setColomns] = useState([])
	const { deleteAllList, deleteOneList } = useCookieList(null)
	const [isLoading, setIsLoading] = useState(true)
	const [selectionType, setSelectionType] = useState('')
	const cyrillicToTranslit = new CyrillicToTranslit()
	let location = useLocation()

	useEffect(() => {
		let dataTitleInfo
		if (dataApp.vesyLength) {
			fetchInfoTitle()
				.then(data => {
					dataTitleInfo = data
				})
			const col = []
			fetchProductNoUser(dataApp.vesyArr)
				.then(data => {
					if (Array.isArray(data)) {
						data.forEach((el, idx) => {
							col.push(
								{
									title: <div
										className={`
										 relative 
										`} >
										<Image
											src={process.env.REACT_APP_API_URL + JSON.parse(el.img)[0].image}
											className=''
										/>
										<div className='absolute top-0 right-0 bg-white'>
											<Button type="text"
												danger
												onClick={() => deleteOneElCookies(el.id, idx)}
												size='small'
											>
												<DeleteOutlined />

											</Button>
										</div>
									</div>,
									render: () => {
										return (
											<div key={el.id}
												className={`block`}
											>
												<div className=''>
													<Link to={{
														pathname: `/${el.categories[0].link}/${el.types[0].link}/${cyrillicToTranslit.transform(el.name.split(' ').join('-'))}`,
													}}
														state={{ id: el.id, location: location.pathname }}
													>
														<Paragraph
															ellipsis={{ rows: 1, symbol: '...' }}
															className='font-semibold text-base mt-2'
														>
															{el.name}
														</Paragraph>
													</Link>
													<div className='flex justify-between items-center mt-2 mb-2'>
														<p className='text-base'>{el.price} BYN</p>

														<BtnComp el={el} />


													</div>
													<Rate allowHalf defaultValue={4.5} disabled />
												</div>
												<p className='text-center mt-2 text-base xs:text-sm'>Характеристики</p>
												{dataTitleInfo && dataTitleInfo.map((elem) => {
													return (
														<div className={`mb-3 mt-2 border-b xy:min-h-[120px] xs:min-h-[120px] xx:min-h-[120px] xm:h-auto ss:h-auto`} key={elem.id}>
															<p className='font-semibold text-sm mb-2'>
																{elem.name}
															</p>
															{el.info.map((item, idx) => {
																if (elem.id === item.titleInfoId) {
																	return (
																		<div key={item.id}>
																			<div className='flex justify-between mb-2'>
																				<p className='xs:text-xs xx:text-[11px] xy:text-xs sm:text-xs w-1/2'>{item.title}:</p>

																				<p className='xs:text-xs xx:text-[11px] xy:text-xs sm:text-xs text-right'>{item.description}</p>

																			</div>
																		</div>
																	)
																}
															})}
														</div>
													)
												})}
											</div>
										)
									},
								})
						})
						if (col.length === 1 && !screens.xs) {
							col.push({})
							col.push({})
						}
						if (col.length === 2 && !screens.xs) {
							col.push({})
						}
						setColomns(col)
						setIsLoading(false)
					} else {
						message.warning(data.message)
						setIsLoading(false)
						setColomns([])
					}
				})
		} else {
			message.success('Тут пусто')
			setColomns([])
			setIsLoading(false)
		}
	}, [dataApp.vesyLength])
	function clearAllList() {
		deleteAllList('ComparisonList')
	}
	function deleteOneElCookies(id) {
		deleteOneList('ComparisonList', id)
	}
	const fixedElem = (value) => {
		if (value === 'left') {
			colomns.map((el, idx) => {
				if (idx === 0) {
					el.fixed = true
					return
				}
				if (idx === colomns.length - 1) {
					el.fixed = false
					return
				}
			})
		}
		if (value === 'right') {
			colomns.map((el, idx) => {
				if (idx === 0) {
					el.fixed = false
					return
				}
				if (idx === colomns.length - 1) {
					el.fixed = 'right'
					return
				}
			})
		}
		if (!value) {
			colomns.map((el, idx) => {
				if (idx === 0) {
					el.fixed = false
					return
				}
				if (idx === colomns.length - 1) {
					el.fixed = false
					return
				}
			})
		}

	}
	const data = [{}]
	return (
		<div>
			{dataApp.vesyLength ?
				<div className='flex justify-end mb-3'>
					<Button
						type='text' danger
						onClick={() => clearAllList()}
					>
						<ClearOutlined />
						Очистить список сравнения
					</Button>
				</div>
				:
				undefined
			}
			{screens.xs &&
				<Radio.Group
					onChange={({ target: { value } }) => {
						fixedElem(value)
						setSelectionType(value)
					}}
					value={selectionType}
					className='w-full'
				>
					<div className='flex justify-between mb-3'>
						<Radio.Button value="left"><ArrowLeftOutlined /> <PushpinOutlined rotate={315} /></Radio.Button>
						<Radio.Button value=""><PushpinOutlined rotate={45} /></Radio.Button>
						<Radio.Button value="right"><PushpinOutlined rotate={315} /> <ArrowRightOutlined /></Radio.Button>
					</div>
				</Radio.Group>
			}
			<Table
				columns={colomns}
				className="virtual-table"
				dataSource={colomns.length ? data : []}
				loading={isLoading}
				bordered
				pagination={false}
				size='small'
				scroll={{
					x: 200 * colomns.length,
					y: screens.sd ? 300 : 600,
				}
				}
			/>
		</div>
	)
})
export default ComparisonList