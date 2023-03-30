import { Tabs, Typography, Button, Tooltip } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import FormOtzyvy from '../forms/formOtzyvy/FormOtzyvy'
import { Context } from '../../App'
import { observer } from "mobx-react-lite"
import Otzyvy from '../otzyvy/Otzyvy'
import VoprosOtvet from '../vopros-otvet/VoprosOtvet'
import Property from './property/Property'
import FormQuestion from '../forms/formQuestion/FormQuestion'
import { isBuyThisProductUser } from '../../http/orderAPI'
import { otzyvRatinOneUserProduct } from '../../http/otzyvyAPI'
import { useScreens } from '../../Constants/constants'
import { getQuestionResponse } from '../../http/questionAPI'
const { Paragraph } = Typography
const BtnAndFormOtzyvy = observer(({ product, isBuyProd, isOtzyvUserProd, setIsOtzyvUserProd }) => {
	const { user } = useContext(Context)
	const [isBtnFormOtzyvy, setIsBtnFormOtzyvy] = useState(false)
	return (
		<>
			{
				user.isAuth ?
					(isBtnFormOtzyvy ?
						<FormOtzyvy product={product} setIsOtzyvUserProd={setIsOtzyvUserProd} setIsBtnFormOtzyvy={setIsBtnFormOtzyvy} />
						:
						(
							isOtzyvUserProd
								?
								(<p>Вы оценили данный товар.</p>)
								:
								(<Tooltip title={isBuyProd ? '' : 'Отзыв можно добавить, только после покупки данного товара!'}>
									<Button
										type='primary'
										disabled={!isBuyProd}
										onClick={() => setIsBtnFormOtzyvy(true)}
									>
										Добавить отзыв
									</Button>
								</Tooltip>)
						)
					)
					:
					<p>Отзывы смогут оставить только зарегистрированные пользователи.</p>
			}
			<hr className='' />
			<Otzyvy product={product} />
		</>
	)
})
const BtnAndFormQuestion = observer(({ product,dataQuestRes }) => {
	const { dataApp } = useContext(Context)
	return (
		<>
			{
				dataApp.isBtnFormQuestion ?
					<FormQuestion product={product} />
					:
					<Button
						type='primary'
						onClick={() => dataApp.setIsBtnFormQuestion(true)}
					>
						Задать вопрос
					</Button>
			}
			<hr className='mt-6' />
			<VoprosOtvet dataQuestRes={dataQuestRes} />
		</>
	)
})

const ListProperty = observer(() => {
	const { dataProducts } = useContext(Context)
	const [editP, setEditP] = useState('')
	useEffect(() => {
		setEditP(dataProducts.dataOneProduct.description_big)
	}, [dataProducts.dataOneProduct])
	return (
		<>
			<Paragraph
				style={{ marginLeft: '1em' }}
			>
				{editP}
			</Paragraph>

			<Property />
		</>
	)
})
const TabsPtoduct = ({ product }) => {
	const [isBuyProd, setIsBuyProd] = useState(false)
	const [isOtzyvUserProd, setIsOtzyvUserProd] = useState(false)
	const [dataQuestRes, setDataQuestRes] = useState([])
	const { user } = useContext(Context)
	const screens = useScreens()
	const onChange = key => {
		if (user.isAuth) {
			if (key === 2) {
				isBuyThisProductUser(product.id)
					.then(data => {
						if (data) {
							setIsBuyProd(true)
						} else {
							setIsBuyProd(false)
						}
					})
				otzyvRatinOneUserProduct(product.id)
					.then(data => {
						if (data) {
							setIsOtzyvUserProd(true)
						} else {
							setIsOtzyvUserProd(false)
						}
					})
			}
			
		}
		if (key === 3) {
			getQuestionResponse(product.id)
				.then(data => {
					setDataQuestRes(data)
			})
		}
	}
	const itemTabsProduct = [
		{
			key: 1,
			label: "Описание",
			children: (
				<ListProperty />
			)
		},
		{
			key: 2,
			label:
				`Отзывы`,
			children: (
				<BtnAndFormOtzyvy
					product={product}
					isBuyProd={isBuyProd}
					isOtzyvUserProd={isOtzyvUserProd}
					setIsOtzyvUserProd={setIsOtzyvUserProd}
				/>
			)
		},
		{
			key: 3,
			label: 'Вопрос-ответ',
			children: (<BtnAndFormQuestion product={product} dataQuestRes={dataQuestRes} />),
		},
	]
	return (
		<Tabs
			onChange={onChange}
			type="card"
			items={itemTabsProduct}
			size={screens.xs ? 'small' : 'large'}
			className='mt-10'
		/>
	)
}
export default TabsPtoduct