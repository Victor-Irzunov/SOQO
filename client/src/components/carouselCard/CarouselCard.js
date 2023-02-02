import React, { useState, useContext } from 'react'
import { Card, Rate, Button, Image, Badge, message, Tooltip } from 'antd'
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
// import ModalCookies from '../modalCookies/ModalCookies'
import { Context } from '../../App'
import { addBasketUserOneProduct } from '../../http/basketAPI'
// import Svg from '../../images/menuIcon/Svg'
import basket from '../../images/carouselCard/basket2.svg'
import { observer } from "mobx-react-lite"

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
		breakpoint: { max: 1024, min: 464 },
		items: 3
	},
	mobile: {
		breakpoint: { max: 620, min: 0 },
		items: 1
	}
}

const CarouselCard = observer(({ product, cardItem, title, hit }) => {
	const cyrillicToTranslit = new CyrillicToTranslit()
	const { dataApp, user, dataProducts } = useContext(Context)
	const { addList } = useCookieList(null)
	const [dataModal, setDataModal] = useState({})
	const [isModalOpen, setIsModalOpen] = useState(false)
	// const [visible, setVisible] = useState(false)
	let location = useLocation()

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
				(
					<div className='flex justify-between mb-8'>
						<h2 className='text-[#292D51] text-2xl ml-6'>{title}</h2>
						<Link to={{
							pathname: `/assortiment/${hit ? cyrillicToTranslit.transform('хит-продаж') : cyrillicToTranslit.transform('новое-поступление')}`,
						}}
							state={{ isNew: true, title: title }}
						>
							<p className='text-[#292D51] mt-3 mr-3'>смотреть все</p>
						</Link>
					</div>
				)
			}

			<Carousel
				arrows={false}
				customButtonGroup={<ButtonGroup product={product} />}
				responsive={responsive}
				className=''
			>
				{product ?
					product.map((el) => {
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
										<div className='w-full min-h-[180px]'>
											<Image src={process.env.REACT_APP_API_URL + JSON.parse(el.img)[0].image}
												width='100%'
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
														<div className='min-h-[50px]'>
															<p className='font-semibold text-lg xm:text-base mb-2'>{el.name}</p>
														</div>
														<p className='text-xs xm:text-xs mb-1'>{el.description}</p>
														<div className='flex'>
															<Rate allowHalf value={el.rating} disabled />
															<span className="mt-1.5 ml-3">
																<Badge style={{ backgroundColor: '#52c41aa8', }} count={el.rating} />
															</span>
														</div>
														<div className='flex justify-between items-start mt-1'>
															<p className='text-xl font-semibold'>{(el.price - el.price * el.discountPercentage / 100).toFixed(2)} BYN</p>
															<div className='text-right pt-0.5'>
																<p className='uppercase text-base font-extralight line-through decoration-from-font'>{(el.price).toFixed(2)} BYN</p>
																<p className='font-extralight text-xs'>скидка {el.discountPercentage}%</p>
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
																		{/* <Button
																			type="primary"
																			shape="round"
																			size="large"
																			icon={<CheckOutlined />}
																		/> */}
																		<CheckOutlined className='text-[#292D51] text-3xl pb-1' />
																	</Tooltip>
																</Link>
																:
																<Tooltip title="Добавить в корзину">
																	{/* <Button
																		type="primary"
																		shape="round"
																		size="large"
																		onClick={() => addBasket(el)}
																		icon={<Svg />}
																	/> */}
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
						return (
							<Badge.Ribbon
								key={el.id} text={`${hit ? 'хит' : 'новое'}`}
								className='uppercase'
							>
								<Card
									bordered={false}
									hoverable={true}
									cover={<Image src={process.env.REACT_APP_API_URL + JSON.parse(el.img)[0].image}
									/>}
									style={{
										background: '#fff',
										marginLeft: '1em',
										overflow: 'hidden',
									}}
									className='shadow-xl'
								>
									<div className=''>
										{/* <div className='w-full min-h-[180px]'>
											
											<Image src={process.env.REACT_APP_API_URL + JSON.parse(el.img)[0].image}
											/>
										</div> */}

										<div className='p-4'>
											{el.categories.length
												?
												<>
													<Link to={{
														pathname: `/${el.categories[0].link}/${el.types[0].link}/${cyrillicToTranslit.transform(el.name.split(' ').join('-'))}`,
													}}
														state={{ id: el.id, location: location.pathname }}
													>
														<div className='min-h-[50px]'>
															<p className='font-semibold text-lg xm:text-base mb-2'>{el.name}</p>
														</div>
														<p className='text-xs xm:text-xs mb-2'>{el.description}</p>
														<div className='flex'>
															<Rate allowHalf value={el.rating} disabled />
															<span className="mt-1.5 ml-3">
																<Badge style={{ backgroundColor: '#52c41aa8', }} count={el.rating} />
															</span>
														</div>
														<div className='flex justify-between items-start mt-1'>
															<p className='text-xl font-semibold'>{(el.price - el.price * el.discountPercentage / 100).toFixed(2)} BYN</p>
															<div className='text-right pt-0.5'>
																<p className='uppercase text-base font-extralight line-through decoration-from-font'>{(el.price).toFixed(2)} BYN</p>
																<p className='font-extralight text-xs'>скидка {el.discountPercentage}%</p>
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
																		{/* <Button
																			type="primary"
																			shape="round"
																			size="large"
																			icon={<CheckOutlined />}
																		/> */}
																		<CheckOutlined className='text-[#292D51] text-3xl pb-1' />
																	</Tooltip>
																</Link>
																:
																<Tooltip title="Добавить в корзину">
																	{/* <Button
																		type="primary"
																		shape="round"
																		size="large"
																		onClick={() => addBasket(el)}
																		icon={<Svg />}
																	/> */}
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
				}
			</Carousel>
		</div>
	)
})
export default CarouselCard