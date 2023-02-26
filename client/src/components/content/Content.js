import { Typography} from 'antd'
import React, { useContext,useState } from 'react'
import { Context } from '../../App'
import { observer } from "mobx-react-lite"
import { HighlightOutlined, } from '@ant-design/icons'

const { Paragraph } = Typography

const Content = observer(() => {
	const { isAdmin } = useContext(Context)
	const [editH2, setEditH2] = useState('Как подобрать сантехническое оборудование в Минске')
	const [editH3, setEditH3] = useState('Описание сантехнического оборудования фирмы SOQO')
	const [editP2, setEditP2] = useState('Сантехническое оборудование для вашего дома фирмы SOQO! Это транснациональное предприятие сантехники специализируется на производстве, реализации, предоставлении услуг, имеет дистрибьюторов в Китае, Америке, Германии, Корее, России, Беларуси и других Евроазиатских регионах. Модели выполнена с использованием современных методах производства. Приятных покупок!')
	const [editP3, setEditP3] = useState('Компания сантехники SOQO полностью соответствует системам менеджмента качества международного стандарта ISO-9002, предоставляет покупателям экологически безопасную, современную и качественную сантехнику.')

	const [editH4, setEditH4] = useState('Каковы преимущества удобства онлайн покупок?')
	const [editP4, setEditP4] = useState(`В интернет-магазинах часто можно найти более низкие цены на товары для ванной комнаты, а ассортимент продукции в разы шире. Даже если выбранной модели сантехники нет в наличии, ее можно купить по предварительному заказу. Все интернет-магазины сантехники предлагают доставку.Вы можете сэкономить время, купив высококачественную сантехнику в интернет-магазине с доставкой на дом.
	`)

	return (
		<div className='mt-20 border-t pt-3'>
			
			<Typography.Title
				editable={isAdmin && {
					onChange: setEditH2,
					icon: <HighlightOutlined />,
				}}
				level={2}
				style={{
					margin: 0,
				}}
			>
				{editH2}
			</Typography.Title>
			<Paragraph
				editable={isAdmin &&{
					onChange: setEditP2,
				}}
			>
				{editP2}
			</Paragraph>
			<Typography.Title
				editable={isAdmin && {
					onChange: setEditH3,
					icon: <HighlightOutlined />,
				}}
				level={3}
				style={{
					margin: 0,
				}}
			>
				{editH3}
			</Typography.Title>
			<Paragraph
				editable={isAdmin &&{
					onChange: setEditP3,
				}}
			>
				{editP3}
			</Paragraph>

			<Typography.Title
				editable={isAdmin && {
					onChange: setEditH4,
					icon: <HighlightOutlined />,
				}}
				level={4}
				style={{
					margin: 0,
				}}
			>
				{editH4}
			</Typography.Title>
			<Paragraph
				editable={isAdmin &&{
					onChange: setEditP4,
				}}
			>
				{editP4}
			</Paragraph>
		</div>
	)
})

export default Content