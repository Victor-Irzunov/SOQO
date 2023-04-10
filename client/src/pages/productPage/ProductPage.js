import React, { useState, useContext, useEffect } from 'react'
import CourouselComp from '../../components/react-image-gallery/CurouselComp'
import { Typography, Row, Col, Rate, Badge, Button, BackTop, message, Empty, Divider, Image } from 'antd'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { Context } from "../../App"
import { CarOutlined, ArrowLeftOutlined, CheckOutlined, DownCircleOutlined } from '@ant-design/icons'
import { Helmet } from "react-helmet"
import BadgeIconHeard from '../../components/badgeIcon/badgeIconHeard/BadgeIconHeard'
import BadgeIconVesy from '../../components/badgeIcon/badgeIconVesy/BadgeIconVesy'
import TabsPtoduct from '../../components/tabsProduct/TabsPtoduct'
import PohozhieTovary from '../../components/pohozhieTovary/PohozhieTovary'
import Content from '../../components/content/Content'
import { useCookieList } from '../../hooks/useCookieList'
import { observer } from "mobx-react-lite"
import { fetchOneProduct, fetchProductsPohozhie } from '../../http/productsAPI'
import { addBasketUserOneProduct } from '../../http/basketAPI'
import delivery from '../../images/productPage/delivery.svg'
import CyrillicToTranslit from 'cyrillic-to-translit-js'


const ProductPage = observer(() => {
	const { dataApp, dataProducts, user } = useContext(Context)
	const cyrillicToTranslit = new CyrillicToTranslit()
	let location = useLocation()
	const localPath = location.pathname.split('/').join(' ')
	const arrLocalPath = location.pathname.split('/').filter(function (el) {
		return (el != null && el != "" || el === 0)
	})

	const navigate = useNavigate()
	const [editH1, setEditH1] = useState('')
	const [product, setProduct] = useState({})
	const [imgArr, setImgArr] = useState([])
	const [review, setReview] = useState('')
	const { addList, deleteOneList } = useCookieList(null)
	const id = location.state?.id
	const loca = location.state?.location
	const [productData, setProductData] = useState([])

	// console.log('location:', location)
	// console.log('localPath:', localPath)
	// console.log('arrLocalPath:', arrLocalPath)


	useEffect(() => {
		fetchOneProduct(arrLocalPath[2])
			.then(data => {
				if (data) {
					console.log('data-: ', data)
					setProduct(data)
					setEditH1(data.name)
					dataProducts.setDataOneProduct(data)
					declOfNum(data.feedbacks.length, ['отзывов', 'отзыва', 'отзыв'])
					setImgArr(fuImg(data))

				}
			})
	}, [id, dataProducts])

	useEffect(() => {
		if (Object.keys(product).length) {
			if (product.groupId) {
				fetchProductsPohozhie({ groupId: product.groupId, id: product.id })
					.then(data => {
						setProductData(data)
					})
			} else {
				setProductData([])
			}
		}
	}, [product, id])

	const addBasket = id => {
		if (!user.isAuth) {
			addList('BasketProduct', id)
			message.success('Товар добавлен в корзину')
		} else {
			addBasketUserOneProduct(id)
				.then(data => {
					dataApp.setBasketLength(data.length)
					dataProducts.setDataBasket(data)
					message.success('Товар добавлен в корзину')
				})
		}
	}



	function fuImg(data) {
		const img = JSON.parse(data.img)
		const imgMini = JSON.parse(data.imgMini)
		const imgArray = []
		img.forEach((el, idx) => {
			imgMini.forEach((elem, i) => {
				if (idx === i) {
					imgArray.push({ original: process.env.REACT_APP_API_URL + el.image, thumbnail: process.env.REACT_APP_API_URL + elem.image })
					return
				}
				return
			})
		})
		return imgArray
	}
	function declOfNum(n, text_forms) {
		n = Math.abs(n) % 100;
		var n1 = n % 10;
		if (n > 10 && n < 20) setReview(text_forms[0])
		if (n1 > 1 && n1 < 5) setReview(text_forms[1])
		if (n1 === 5) setReview(text_forms[0])
		if (n1 === 1) setReview(text_forms[2])
		if (n1 === 0) setReview(text_forms[0])
	}
	const clickScroll = (params) => {
		setTimeout(() => window.scrollBy({
			top: params,
			left: 0,
			behavior: 'smooth',
		}), 150)
	}
	const goBack = () => navigate(
		`${loca}`
	)
	return (
		<>
			<Helmet>
				<title>{editH1}</title>
				<meta name="description" content={editH1} />
			</Helmet>
			<BackTop />
			<section className='container pt-5 pb-20'>
				<Button
					type='link'
					className='text-sm text-slate-500 font-thin mb-6 pl-0'
					onClick={goBack}
				>
					<ArrowLeftOutlined /> назад
				</Button>
				<Typography.Title
				>
					{editH1}
				</Typography.Title>

				{Object.keys(product).length
					?
					<>
						<div className='flex  sm:w-full xs:w-full xx:w-full xy:w-full xz:w-full justify-start'>
							<div className='flex items-center'>
								<Rate allowHalf value={product.rating} disabled />
								<span className="ml-3 mr-3">
									<Badge style={{ backgroundColor: '#52c41aa8', }} count={product.rating} />
								</span>
								<p
									className='text-slate-400 mt-1.5 sm:text-base xz:text-xs xy:text-xs underline cursor-pointer'
									onClick={() => clickScroll(1500)}
								>
									{product.feedbacks && product.feedbacks.length} {review}
								</p>
							</div>

						</div>
						<Row gutter={[56, 56]}>
							<Col xl={14} className='mt-10'>
								<CourouselComp imgArr={imgArr} />

								<Button
									type='text'
									className='mt-3'
									onClick={() => clickScroll(900)}
								>
									похожие товары<DownCircleOutlined className="animate-bounce" />
								</Button>

							</Col>
							<Col xl={10} className='p-2 mt-10'>
								<div className=''>
									<div className='flex justify-between'>
										<div>
											<p className='font-thin text-sm'>Артикул: {product.id}GR{product.groupId}</p>
										</div>
										<div className='flex w-16 justify-between'>
											<BadgeIconVesy
												productPage={true}
												addToComparisonList={addList}
												id={product.id}
											/>
											<BadgeIconHeard
												productPage={true}
												addToLiked={addList}
												id={product.id}
											/>
										</div>
									</div>
									<div className='mt-10'>
										<p>{product.description}</p>
									</div>
								</div>
								<Divider className='mt-3 mb-3' />

								<div className='flex mb-5'>
									{productData.map(el => {
										return (
											<Link to={{
												pathname: `/${el.categories[0].link}/${el.types[0].link}/${cyrillicToTranslit.transform(el.name.split(' ').join('-'))}`,
											}}
												state={{ id: el.id, location: location.pathname }}
												className='mr-3'
											>
												<Image src={process.env.REACT_APP_API_URL + JSON.parse(el.imgMini)[0].image}
													width='45px' preview={false}
												/>
											</Link>
										)
									})}
								</div>

								<div className='border-b pb-6 pt-6'>
									<p className='text-base text-slate-700 font-light pb-2'>Цена:</p>
									<div className='flex justify-between'>
										<p className='text-3xl'>{(product.price - product.price * product.discountPercentage / 100).toFixed(2)} BYN</p>
										{product.discountPercentage ?
											<div className='text-right'>
												<p className='uppercase text-xl font-extralight line-through decoration-from-font'>{(product.price).toFixed(2)} BYN</p>
												<p className='font-extralight text-sm'>скидка : {product.discountPercentage}%</p>
											</div>
											: ''
										}
									</div>
									<div
										className='flex justify-start mt-8'
									>
										<Button
											type="primary"
											shape="round"
											size={'large'}
											block
											disabled={(user.isAuth ? dataProducts.dataBasket.some(elem => elem.productId === product.id) : dataApp.basketArr.some(elem => elem.id === product.id))}
											icon={(user.isAuth ? dataProducts.dataBasket.some(elem => elem.productId === product.id) : dataApp.basketArr.some(elem => elem.id === product.id)) && <CheckOutlined />}
											className='mr-4'
											onClick={() => addBasket(product.id)}
										>
											{(user.isAuth ? dataProducts.dataBasket.some(elem => elem.productId === product.id) : dataApp.basketArr.some(elem => elem.id === product.id)) ? 'В корзине' : 'В корзину'}
										</Button>
									</div>
								</div>
								<Divider className='mt-2 mb-2' />
								<div className='pb-4 pt-2'>
									<div>
										<Button type="link" size='small'>
											Доставка
										</Button>
										<span>по Минску и Беларуси</span>
									</div>
									<Button type='text' size='small'>Гарантия:{' '}
										{product.info.map(i => {
											if (i.title === "Гарантия") {
												return (
													i.description
												)
											}
										})}
									</Button>
								</div>
								<Divider className='mt-3 mb-2' />
								<div className='flex pt-2 justify-evenly sm:flex-row xz:flex-col'>
									<div className='flex items-center'>
										<CarOutlined style={{ fontSize: '1.7em', color: 'gray' }} className='mt-1' />
										<Button type='link' className='xz:text-xs md:text-base'>Доставка по Минску</Button>
									</div>
									<div className='flex items-center'>
										<Image src={delivery} width="1.8em" />
										<Button type='link' className='xz:text-xs md:text-base'>Доставка по Беларуси</Button>
									</div>
								</div>
							</Col>
						</Row>
					</>
					:
					<Empty />
				}
				<div className='mt-28' id='box' />
				{Object.keys(product).length ?
					<>
						<PohozhieTovary product={product} />
						<TabsPtoduct product={product} />
					</>
					:
					undefined
				}
				<Content />
			</section>
		</>
	)
})
export default ProductPage