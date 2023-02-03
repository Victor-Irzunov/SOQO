import React, { useContext, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Image, Button, Empty, Typography, message } from 'antd'
import { MinusOutlined, PlusOutlined, CloseOutlined } from '@ant-design/icons'
import { Context } from '../../App'
import { useCookieList } from '../../hooks/useCookieList'
import { Link, useLocation } from 'react-router-dom'
import {
	deleteBasketUserOneProduct,
	minusBasketUserOneProduct,
	plusBasketUserOneProduct
} from '../../http/basketAPI'
import CyrillicToTranslit from 'cyrillic-to-translit-js'
import { useScreens } from '../../Constants/constants'

const ButtonGroup = Button.Group
const { Text } = Typography


const BasketCard = observer((
	{
		data,
		isActive,
		setData,
		priceDostavki,

	}
) => {
	const { dataApp, dataProducts, user } = useContext(Context)
	const { addList, minusList, deleteOneList } = useCookieList(null)
	const [totalWithoutDiscount, setTotalWithoutDiscount] = useState(0)
	const [totalDiscount, setTotalDiscount] = useState(0)
	const [total, setTotal] = useState(0)
	const [totalPlusDostavka, setTotalPlusDostavka] = useState(0)
	const cyrillicToTranslit = new CyrillicToTranslit()
	const [isUpload, setUpload] = useState(false)
	const location = useLocation()
	const screens = useScreens()


	useEffect(() => {
		let totalCost = 0
		let discount = 0
		const sendData = []
		if (data.length > 0) {

			if (!user.isAuth) {
				data.forEach(el => {
					dataApp.basketArr.forEach(elem => {
						if (el.id === elem.id) {
							totalCost += el.price * elem.count
							if (el.discountPercentage) discount += +(el.price * elem.count) * el.discountPercentage / 100
							sendData.push({ poductId: el.id, price: el.price, count: elem.count })
						}
					})
				})
			} else {
				data.forEach(el => {
					totalCost += el.price * el.countBasket
					if (el.discountPercentage) discount += +(el.price * el.countBasket) * el.discountPercentage / 100
					sendData.push({ poductId: el.id, price: el.price, count: el.countBasket })
				})
			}
			let total = totalCost - discount
			let totalWithDostavka = totalCost - discount + priceDostavki
			setTotalPlusDostavka(totalWithDostavka)
			setTotalWithoutDiscount((totalCost.toFixed(2)))
			setTotalDiscount((discount).toFixed(2))
			setTotal((total).toFixed(2))
			dataProducts.setSendData(sendData)

			if (priceDostavki) {
				dataApp.setTotalOrder(totalWithDostavka)
			} else {
				dataApp.setTotalOrder(total)
			}
		}
	}, [
		data.length,
		isUpload,
		data,
		priceDostavki
	])

	const plusBasket = id => {
		if (!user.isAuth) {
			addList('BasketProduct', id)
			// setUpload(i => !i)
		} else {
			plusBasketUserOneProduct(id)
				.then(data => {
					dataProducts.setDataBasket(data)
					setUpload(i => !i)
				})
		}
	}
	const minusBasket = id => {
		if (!user.isAuth) {
			minusList('BasketProduct', id)
			setUpload(i => !i)
		} else {
			minusBasketUserOneProduct(id)
				.then(data => {
					dataProducts.setDataBasket(data)
					setUpload(i => !i)
				})
		}
	}
	const deleteBasket = id => {
		if (!user.isAuth) {
			deleteOneList('BasketProduct', id)
			setUpload(i => !i)
		} else {
			deleteBasketUserOneProduct(id)
				.then(data => {
					if (data.length) {
						const dataArr = []
						data.forEach(el => {
							dataArr.push({ ...el.product, countBasket: el.count })
						})
						dataProducts.setDataBasket(dataArr)
						message.success('Удалён один товар')
					} else {
						setData([])
						message.warning('В корзине пусто')
					}
					dataApp.setBasketLength(data.length)
				})
		}
	}

	return (
		<div className='p-2 mt-10'>
			{data.length ?
				data.map((el, idx) => {
					let count
					if (!user.isAuth) {
						if (dataApp.basketLength) count = dataApp.basketArr[idx]?.count
					} else {
						count = el.countBasket
					}
					return (
						<div key={el.id} className='mb-4 flex justify-between bg-white border'>
							<div className='p-2 w-1/2'>
								<div className='flex'>
									<Image
										preview={false}
										width={130}
										src={process.env.REACT_APP_API_URL + JSON.parse(el.img)[0].image} />
									<div className='ml-5 flex flex-col justify-between'>
										<div>
											<Link to={{
												pathname: `/${el.categories[0].link}/${el.types[0].link}/${cyrillicToTranslit.transform(el.name.split(' ').join('-'))}`,
											}}
												state={{ id: el.id, location: location.pathname }}>
												<p className='text-lg xs:text-base xx:text-sm xy:text-sm '>{el.name}</p>
											</Link>
											<p className='text-xs text-slate-400 font-light xx:mt-2 xy:text-[12px]'>Артикул: {el.id}GR{el.groupId}</p>
										</div>
										<p className='text-xs text-slate-300 font-light xx:text-[10px] xy:text-[10px]'>На складе: {el.count}</p>
									</div>
								</div>
							</div>
							<div className='flex justify-center items-center xs:mr-1 xx:mr-1 xy:mr-1'>
								<ButtonGroup>
									<Button
										onClick={() => minusBasket(el.id)}
										size={isActive || screens.sm || screens.xs ? 'small' : 'large'}
										disabled={count === 1}
									>
										<MinusOutlined />
									</Button>
									<Button
										size={isActive || screens.sm || screens.xs ? 'small' : 'large'}
									>
										{count}
									</Button>

									<Button
										onClick={() => {
											plusBasket(el.id)
										}}
										size={isActive || screens.sm || screens.xs ? 'small' : 'large'}
										disabled={el.count === count}
									>
										<PlusOutlined />
									</Button>
								</ButtonGroup>
							</div>
							<div className='border-l w-44 flex items-center sm:px-5 xs:px-2 xx:px-2 xy:pl-2 bg-gray-100 relative'>
								<div className=''>
									<p className='font-extralight'>Цена:</p>
									<p className='text-2xl xs:text-xl xx:text-lg xy:text-base mt-2'>
										{(el.price * count).toFixed(2)}
										<span className='text-xl xx:text-sm xy:text-xs font-light'>BYN</span></p>
								</div>
								<Button
									onClick={() => deleteBasket(el.id)}
									className='absolute top-0 right-0'
									size={screens.xs && 'small'}
									icon={<CloseOutlined className='text-red-500' />}
								/>
							</div>
						</div>
					)
				})
				:
				<div className='w-full'>
					<Empty />
				</div>
			}
			<div className={`mb-6 w-full flex flex-col items-end mt-20 ${!data.length && 'hidden'}`}>
				<p className='text-lg font-semibold'>
					Ваш заказ:
				</p>
				<p className='text-sm'>Общая стоимость:</p>
				<span className='text-lg font-light mb-2'>{totalWithoutDiscount} <span className='text-base font-light'>BYN</span></span>
				<p className='text-sm'>Скидка:</p>
				<p className=''>{totalDiscount} BYN</p>

				{
					priceDostavki ?
						<>
							<p className='mt-2 text-sm'>Стоимость со скидкой</p>
							<p className=''>{total} BYN</p>
							<br />
							<p className='text-sm'>Доставка:</p>
							<p className=''>{(priceDostavki).toFixed(2)} BYN</p>
							<p className='text-xl xs:text-lg xx:text-base mt-5 uppercase'>Итоговая стоимость:</p>
							<span className='text-2xl xs:text-xl xx:text-lg font-light'>{(totalPlusDostavka).toFixed(2)}
								<span className='text-xl xs:text-lg font-light'>&nbsp;BYN</span>
							</span>
						</>
						:
						<>
							<p className='text-lg xs:text-base xx:text-sm mt-5 uppercase'>Итоговая стоимость:</p>
							<span className='text-2xl xs:text-xl xx:text-lg font-light'>{total}
								<span className='text-xl xs:text-lg font-light'>&nbsp;BYN</span>
							</span>
						</>
				}

			</div>
		</div>

	)
})

export default BasketCard