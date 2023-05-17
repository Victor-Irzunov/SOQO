import React, { useState, useContext, useRef } from 'react'
import { Card, Rate, Button, Image, Badge, message, Tooltip, Typography } from 'antd'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css"
import {
	ArrowRightOutlined,
	ArrowLeftOutlined,
	CheckOutlined,
	FireOutlined,
} from '@ant-design/icons'
import { Link, useLocation } from 'react-router-dom'
import CyrillicToTranslit from 'cyrillic-to-translit-js'
import BadgeIconVesy from '../badgeIcon/badgeIconVesy/BadgeIconVesy';
import BadgeIconHeard from '../badgeIcon/badgeIconHeard/BadgeIconHeard'
import { useCookieList } from '../../hooks/useCookieList'
import { Context } from '../../App'
import { addBasketUserOneProduct } from '../../http/basketAPI'
import basket from '../../images/carouselCard/basket2.svg'
import { observer } from "mobx-react-lite"
import { useScreens } from '../../Constants/constants'

const { Paragraph } = Typography

const ButtonGroup = ({ next, previous, product, ...rest }) => {
	const { carouselState: { currentSlide } } = rest
	return (
		<div
			className='absolute -bottom-12 right-2 tut'
		>
			<Button className={currentSlide === 0 ? 'disable bg-transparent' : 'bg-transparent'}
				onClick={() => previous()} >
				<ArrowLeftOutlined />
				Назад
			</Button>
			<Button onClick={() => next()} className='bg-transparent' >
				Вперед
				<ArrowRightOutlined />
			</Button>
		</div>
	)
}
const responsive = {
	superLargeDesktop: {
		breakpoint: { max: 4000, min: 3000 },
		items: 5
	},
	desktop: {
		breakpoint: { max: 3000, min: 1024 },
		items: 4
	},
	tablet: {
		breakpoint: { max: 1024, min: 768 },
		items: 3
	},
	mobile: {
		breakpoint: { max: 768, min: 575 },
		items: 2
	},
	miniMobile: {
		breakpoint: { max: 575, min: 0 },
		items: 2
	}
}



const CarouselCard = observer(({ product, cardItem, title, hit, stok, news }) => {
	const cyrillicToTranslit = new CyrillicToTranslit()
	const { dataApp, user, dataProducts } = useContext(Context)
	const { addList } = useCookieList(null)
	const [dataModal, setDataModal] = useState({})
	const [isModalOpen, setIsModalOpen] = useState(false)
	// const [imgHeigth, setImgHeigth] = useState(0)
	const divRef = useRef()
	const screens = useScreens()

	// useEffect(() => {
	// 	if (imgHeigth < divRef.current.offsetHeight) {
	// 		setImgHeigth(divRef.current.offsetHeight)
	// 	}
	// },[])
	// console.log('divRef:', divRef.current.offsetHeight)
	// console.log('imgHeigth:',imgHeigth)

	let location = useLocation()
	const [minHeigth, setMinHeigth] = useState({
		nameLength: 0,
		descriptionLength: 0
	})
	const [minHeigth2, setMinHeigth2] = useState({
		nameLength: 0,
		descriptionLength: 0
	})

	function scrollToTop() {
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		})
	}


	const addBasket = el => {
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
		<div className='relative pt-6 pb-16 px-1.5 overflow-hidden '>
			{cardItem &&
				<div className='flex justify-between mb-8'>
					<h2 className='text-[#292D51] text-2xl ml-6'>{title}</h2>
					{
						hit &&
						<Link to={{
							pathname: `/assortiment/${cyrillicToTranslit.transform('хит-продаж')}`,
						}}
							state={{ isNew: false, title: title }}
						>
							<p className='text-[#292D51] mt-3 mr-3'>смотреть все</p>
						</Link>
					}
					{
						stok &&
						<Link to={{
							pathname: `/assortiment/${cyrillicToTranslit.transform('акции')}`,
						}}
							state={{ isNew: true, title: title }}
						>
							<p className='text-[#292D51] mt-3 mr-3'>смотреть все</p>
						</Link>
					}
					{news &&
						<Link to={{
							pathname: `/assortiment/${cyrillicToTranslit.transform('новое-поступление')}`,
						}}
							state={{ isNew: true, title: title }}
						>
							<p className='text-[#292D51] mt-3 mr-3'>смотреть все</p>
						</Link>
					}
				</div>
			}

			<Carousel
				arrows={false}
				customButtonGroup={<ButtonGroup product={product} />}
				responsive={responsive}
				className=''
			>



				{product ?
					product.map((el) => {
						if (el.name.length > minHeigth.nameLength) {
							setMinHeigth({ ...minHeigth, nameLength: el.name.length })
						}
						if (el.description.length > minHeigth.descriptionLength) {
							setMinHeigth({ ...minHeigth, descriptionLength: el.description.length })
						}

						return (
							<Badge.Ribbon key={el.id} text={el.discountPercentage ? `скидка ${el.discountPercentage}%` : <FireOutlined />}>
								<Card
									bordered={false}
									hoverable={true}
									style={{
										background: '#fff',
										marginLeft: '1em',
										overflow: 'hidden',
									}}
									className='shadow-xl'
								>
									<div className=''>
										<div className='overflow-hidden xz:h-32 xm:h-[360px] flex justify-center items-center'>
											<img
												src={process.env.REACT_APP_API_URL + JSON.parse(el.img)[0].image}
												className='xz:h-32 xm:h-[360px]  w-auto object-fill '

											/>
										</div>
										<div className='p-2'>
											{el.categories.length
												?
												<>
													<Link to={{
														pathname: `/${el.categories[0].link}/${el.types[0].link}/${cyrillicToTranslit.transform(el.name.split(' ').join('-'))}`,
													}}
														state={{ id: el.id, location: location.pathname }}
														onClick={scrollToTop}
													>
														<div className={`${minHeigth.nameLength > 28 ? 'min-h-[50px]' : 'mb-1'}`}>
															<p className='font-semibold text-lg xm:text-base'>{el.name}</p>
														</div>
														<div className={`${(minHeigth.descriptionLength > 35) || (minHeigth.descriptionLength < 70) ? 'min-h-[48px]' : 'mb-1'} ${minHeigth.descriptionLength >= 70 ? 'min-h-[4.6em]' : 'mb-1'}`}>
															<p className='text-xs xm:text-xs'>{el.description}</p>
														</div>
														<div className='flex'>
															<Rate allowHalf value={el.rating} disabled />
															<span className="mt-1.5 ml-3">
																<Badge style={{ backgroundColor: '#52c41aa8', }} count={el.rating} />
															</span>
														</div>
														<div className='flex justify-between items-start mt-1'>
															<p className='text-xl font-semibold'>{(el.price - el.price * el.discountPercentage / 100).toFixed(2)} BYN</p>
															<div className='text-right pt-0.5'>


																{
																	el.discountPercentage ?
																		<>
																			<p className='uppercase text-base font-extralight line-through decoration-from-font'>{(el.price).toFixed(2)} BYN</p>
																			<p className='font-extralight text-xs'>скидка {el.discountPercentage}%</p>
																		</>
																		:
																		undefined
																}
															</div>
														</div>

													</Link>


													<div className='flex justify-between items-center'>
														<div className='flex justify-between items-center pt-2'>
															<BadgeIconVesy
																cardComp={true}
																addToComparisonList={addList}
																id={el.id}
															/>
															<BadgeIconHeard
																cardComp={true}
																addToLiked={addList}
																id={el.id}
															/>
														</div>
														<div className='mt-2 text-right'>
															{(user.isAuth ? dataProducts.dataBasket.some(elem => elem.productId === el.id) : dataApp.basketArr.some(elem => elem.id === el.id)) ?
																<Link to='/korzina'>
																	<Tooltip title="Товар в корзине">

																		<CheckOutlined className='text-[#292D51] text-3xl pb-1' />
																	</Tooltip>
																</Link>
																:
																<Tooltip title="Добавить в корзину">

																	<Image src={basket}
																		preview={false}
																		width='36px'
																		onClick={() => addBasket(el)}
																	/>
																</Tooltip>
															}
														</div>
													</div>
												</>
												:
												undefined
											}

										</div>
									</div>
								</Card>
							</Badge.Ribbon>
						)
					})
					:
					cardItem.map(el => {
						if (el.name.length > minHeigth2.nameLength) {
							setMinHeigth2({ ...minHeigth2, nameLength: el.name.length })
						}
						if (el.description.length > minHeigth2.descriptionLength) {
							setMinHeigth2({ ...minHeigth2, descriptionLength: el.description.length })
						}

						return (
							<Badge.Ribbon
								key={el.id} text={`${hit && 'хит' || news && 'новое' || stok && 'акции'}`}
								className='uppercase'
							>
								<Card
									bordered={false}
									hoverable={true}
									// cover={<Image src={process.env.REACT_APP_API_URL + JSON.parse(el.img)[0].image}
									// />}
									style={{
										background: '#fff',
										marginLeft: '1em',
										overflow: 'hidden',
									}}
									className='shadow-xl'

								>
									<div className=''>
										{/* <div className={`h - [370px] overflow - hidden`} ref={divRef}>
											<Image src={process.env.REACT_APP_API_URL + JSON.parse(el.img)[0].image}
											/>
										</div> */}
										<div className='overflow-hidden xz:h-32 xm:h-[360px] flex justify-center items-center'>
											<img
												src={process.env.REACT_APP_API_URL + JSON.parse(el.img)[0].image}
												className='xz:h-32 xm:h-[360px]  w-auto object-fill '

											/>
										</div>
										<div className='xz:px-2 xm:px-4 pb-4 pt-2'>
											{el.categories.length
												?
												<>
													<Link to={{
														pathname: `/${el.categories[0].link}/${el.types[0].link}/${cyrillicToTranslit.transform(el.name.split(' ').join('-'))}`,
													}}
														state={{ id: el.id, location: location.pathname }}
													>
														<div className={`${minHeigth2.nameLength > 26 ? 'min-h-[50px]' : 'mb-1'}`}>
															<p className='font-semibold xm:text-base xz:text-xs'>
																{el.name}
															</p>
														</div>


														{/* ${minHeigth2.descriptionLength > 70 ? 'min-h-[65px]' : 'mb-1'}`} */}
														{/* ${minHeigth2.descriptionLength > 40 ? 'min-h-[55px]' : 'mb-1'} */}
														<div className={`mb-1`}>
															<div className='xm:text-xs'>
																<Paragraph
																	ellipsis={true
																		? {
																			rows: 2,
																			// expandable: true,
																			symbol: '...',
																		}
																		: false
																	}
																	style={
																		screens.sm ?
																			{
																				fontSize: ''
																			}
																			:
																			{
																				fontSize: '10px'
																			}}
																>
																	{el.description}
																</Paragraph>
															</div>
														</div>

														<p className='font-thin text-[11px] mb-1 mt-1'>Aртикул:
															{el.id}GR{el.groupId}
														</p>
														<div className='flex'>

															<Rate
																allowHalf
																value={el.rating}
																disabled
																style={
																	screens.xs ? {
																		fontSize: '12px'
																	}
																		:
																		{
																			fontSize: ''
																		}
																}
															/>
															<span className="mt-1.5 ml-3">
																<Badge style={{ backgroundColor: '#52c41aa8', }} count={el.rating} />
															</span>
														</div>
														<div className='flex justify-between items-start mt-1'>
															<p className='text-xl font-semibold'>{(el.price - el.price * el.discountPercentage / 100).toFixed(2)} BYN</p>
															<div className='text-right pt-0.5'>
																{
																	el.discountPercentage ?
																		<>
																			<p className='uppercase text-base font-extralight line-through decoration-from-font'>{(el.price).toFixed(2)} BYN</p>
																			<p className='font-extralight text-xs'>скидка {el.discountPercentage}%</p>
																		</>
																		:
																		undefined
																}
															</div>
														</div>
													</Link>

													<div className='flex justify-between items-center'>
														<div className='flex justify-between items-center pt-2'>
															<BadgeIconVesy
																cardComp={true}
																addToComparisonList={addList}
																id={el.id}
															/>
															<BadgeIconHeard
																cardComp={true}
																addToLiked={addList}
																id={el.id}
															/>
														</div>
														<div className='mt-2 text-right'>
															{(user.isAuth ? dataProducts.dataBasket.some(elem => elem.productId === el.id) : dataApp.basketArr.some(elem => elem.id === el.id)) ?
																<Link to='/korzina'>
																	<Tooltip title="Товар в корзине">

																		<CheckOutlined className='text-[#292D51] text-3xl pb-1' />
																	</Tooltip>
																</Link>
																:
																<Tooltip title="Добавить в корзину">

																	<Image src={basket}
																		preview={false}
																		style={
																			screens.sm ?
																				{
																					width: '36px'
																				}
																				:
																				{
																					width: '28px'
																				}
																		}
																		onClick={() => addBasket(el)}
																	/>
																</Tooltip>
															}
														</div>
													</div>
												</>
												:
												undefined
											}
										</div >
									</div >
								</Card >
							</Badge.Ribbon >
						)
					})
				}
			</Carousel >
		</div >
	)
})
export default CarouselCard