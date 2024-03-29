import { Rate, Card, Row, Col, Button, Tooltip, Badge, Image, message, Typography } from 'antd'
import React, { useContext, useState } from 'react'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import BadgeIconVesy from '../badgeIcon/badgeIconVesy/BadgeIconVesy'
import BadgeIconHeard from '../badgeIcon/badgeIconHeard/BadgeIconHeard'
import { Context } from '../../App'
import { useCookieList } from '../../hooks/useCookieList'
import CyrillicToTranslit from 'cyrillic-to-translit-js'
import ModalCookies from '../modalCookies/ModalCookies'
import { addBasketUserOneProduct } from '../../http/basketAPI'
import basket from '../../images/carouselCard/cart4.svg'
import { useScreens } from '../../Constants/constants'

const { Paragraph } = Typography

const CardComp = ({ itemCard, page, location, deleteOneElCookies }) => {
	const { dataApp, user, dataProducts } = useContext(Context)
	const screens = useScreens()
	const [visible, setVisible] = useState(false)
	const [idPreviewGroup, setIdPreviewGroup] = useState(null)
	const cyrillicToTranslit = new CyrillicToTranslit()
	const { addList, addViewedProduct, deleteOneList } = useCookieList(null)
	const [dataModal, setDataModal] = useState({})
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [minHeigth, setMinHeigth] = useState({
		nameLength: 0,
		descriptionLength: 0
	})


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
		<Row gutter={[0, 0]}>
			{itemCard && itemCard.map((el, idx) => {
				if (el.name.length > minHeigth.nameLength) setMinHeigth({ ...minHeigth, nameLength: el.name.length })
				if (el.description.length > minHeigth.descriptionLength) setMinHeigth({ ...minHeigth, descriptionLength: el.description.length })
				const img = JSON.parse(el.img)

				return (
					<React.Fragment key={el.id}>
						<Col
							xl={8}
							sm={12}
							xs={12}
							key={el.id}
							md={12}
						>
							<Card
								className='hover:border-[#292D51] relative'
								key={el.id}
							>
								<div className='overflow-hidden xz:h-32 xm:h-[360px] flex justify-center items-center'>
									<img
										src={process.env.REACT_APP_API_URL + img[0].image}
										onClick={
											() => {
												setVisible(true)
												setIdPreviewGroup(el.id)
											}
										}
										className='xz:h-32 xm:h-[360px] w-auto object-fill'
									/>
									<div
										style={{
											display: 'none',
										}}
									>
										<Image.PreviewGroup
											preview={{
												visible: idPreviewGroup === el.id && visible,
												onVisibleChange: (vis) => setVisible(vis),

											}}
										>
											{img.map((elem, idx) => {
												return (
													<Image
														src={process.env.REACT_APP_API_URL + elem.image}
														key={idx}
													/>
												)
											})}
										</Image.PreviewGroup>
									</div>
								</div>
								<div className='px-3 pb-3 pt-1 cursor-pointer'>
									<Link to={{
										pathname: `/${el.categories[0].link}/${el.types[0].link}/${cyrillicToTranslit.transform(el.name.split(' ').join('-'))}`,
									}}
										state={{ page: page, id: el.id, location: location.pathname }}
										className='text-[#292D51]'
										onClick={() => addViewedProduct('view_product', el.id)}
									>
										<div className='flex flex-col justify-between'>
											<div className={`${minHeigth.nameLength > 28 ? 'min-h-[4em]' : 'mb-1'}`}>
												<p className='font-bold xm:text-lg xz:text-sm'>{el.name}</p>
											</div>
											<div
												className={
													`${minHeigth.descriptionLength > 40 ? 'min-h-[3em]' : 'mb-1'}
													 ${minHeigth.descriptionLength > 70 ? 'min-h-[4.5em]' : 'mb-1'}
													  xm:text-sm xz:text-xs`
												}
											>
												<Paragraph
													ellipsis={true
														? {
															rows: 2,
															// expandable: true,
															symbol: '...',
														}
														: false
													}
												>
													{el.description}
												</Paragraph>
											</div>
											<p className='font-thin xm:text-xs xz:text-[9px] mb-1'>Aртикул:
												{el.id}GR{el.groupId}
											</p>
											<div>
												<Rate
													allowHalf
													defaultValue={el.rating}
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
												<span className="ant-rate-text">
													<Badge style={{ backgroundColor: '#1cac32' }} count={el.rating} />
												</span>
											</div>
										</div>
									</Link>

									<div>
										<Badge
											status="success"
											text="в наличии"
											style={{
												fontSize: '8px'
											}}
										/>

										<div className='mt-1 flex justify-between items-top'>
											<p className='uppercase xm:text-2xl xy:text-lg font-semibold'>{(el.price - el.price * el.discountPercentage / 100).toFixed(2)} BYN</p>
											<div className='text-right'>
												{
													el.discountPercentage ?
														<>
															<p className='uppercase text-xl font-extralight line-through decoration-from-font mb-0'>{(el.price).toFixed(2)} BYN</p>
															<p className='font-extralight text-xs'>скидка {el.discountPercentage}%</p>
														</>
														:
														undefined
												}
											</div>
										</div>

										<div className='flex justify-between items-center mt-2'>
											<div className='flex justify-center items-center'>
												<BadgeIconVesy
													cardComp={true}
													id={el.id}
												/>
												{location.pathname !== "/spisok-ponravivshikhsya"
													?
													<BadgeIconHeard
														cardComp={true}
														addToLiked={addList}
														deleteOneList={deleteOneList}
														id={el.id}
													/>
													:
													<div className='absolute top-0 right-0 bg-white cursor-pointer z-[2]'>
														<Tooltip title="удалить">
															<Button type="text"
																danger
																onClick={() => deleteOneElCookies(el.id, idx)}
																size='small'
															>
																<CloseOutlined />
															</Button>
														</Tooltip>
													</div>
												}
											</div>
											<div className='text-right'>
												{(user.isAuth
													? dataProducts.dataBasket.some(elem => elem.productId === el.id) : dataApp.basketArr.some(elem => elem.id === el.id)) ?
													<Link to='/korzina'>
														<Tooltip title="Товар в корзине">
															<Button
																type="primary"
																shape="round"
																size={screens.xs ? 'small' : "large"}
																// size='small'
																icon={<CheckOutlined />}
																style={{ boxShadow: 'none' }}
															/>
														</Tooltip>
													</Link>
													:
													<Tooltip title="Добавить в корзину">

														<div
															className='py-1 xm:px-4 xz:px-3 bg-[#292D51] rounded-3xl'
															onClick={() => addBasket(el)}
														>
															<Image
																src={basket}
																preview={false}
																className=''
																style={
																	screens.xs ?
																		{
																			width: '16px'
																		}
																		: {
																			width: '32px'
																		}
																}
															/>
														</div>
													</Tooltip>
												}
											</div>
										</div>
									</div>
								</div>

							</Card>
						</Col>
					</React.Fragment>
				)
			})}
			{
				Object.keys(dataModal).length !== 0
				&&
				<ModalCookies isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} data={dataModal} />
			}
		</Row >

	)
}
export default CardComp