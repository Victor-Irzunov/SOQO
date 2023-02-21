import React, { useContext, useState } from 'react'
import { Button, Typography, Popover, Badge } from 'antd'
import {
	HistoryOutlined,
	PhoneOutlined,
	UserOutlined,
	ReadOutlined,
	ExportOutlined,
	EyeOutlined,
} from '@ant-design/icons'
import { Context } from '../App'
import { Link } from 'react-router-dom'
import { observer } from "mobx-react-lite"
// import { useScreens } from '../../../../Constants/constants'
import heart from '../images/menuIcon/heart6.svg'
import vesy from '../images/menuIcon/scale2.svg'




export const titles = {
	'/': {
		title: 'Крупный онлайн-магазин сантехники в Минске',
		description: 'Первый поставщик качественной недорогой сантехники SOQO в Беларуси.'
	},
}

export const textMenPage = {
	h1: 'Сантехника SOQO',
	h2: 'Где купить сантехнику SOQO?',
	h3: 'Преимущества покупки на этом сайте',
	p: 'Сантехника SOQO – креативный подарок. Сегодня комфорт ценится превыше всего, а активный образ жизни диктует свои правила. Поэтому любой человек, который предпочитает удобство и стиль в одном флаконе, отдает предпочтение кроссовкам.',
	p2: `Чтобы быстро сориентироваться в широком ассортименте мужских кроссовок, необходимо обратить внимание на целевое предназначение этого важного элемента гардероба. Для офисного использования и прогулок нужно ориентироваться на элегантные модели с эластичными мягкими стельками и гибкой подошвой. Если необходимы кроссовки для активного занятия спортом необходимо обратить внимание на вес обуви, её эргономичность и удобство. Они надежно зафиксируют стопу, и не будут ограничивать движения. В интернет-магазине sneakers.by представлены модели из последних брендовых коллекций и цветовой гаммы, различающиеся по функциональности. В каталоге представлена мужская продукция от Nike, Adidas, Puma и других производителей.

	Если у покупателя остаются сомнения по выбору подходящего товара можно обратиться за консультацией к менеджерам, которые предоставят исчерпывающую информацию о продукции, способах покупки и доставки. Покупатель сможет найти в каталоге модель, подходящую для занятия спортом и активного отдыха. Вся продукция создается из надежных и долговечных материалов. У покупателей есть возможность подобрать соответствующего цвета, дизайна, размера. На мужские кроссовки цена оптимальная.`,
	p3: `В Минске купить сантехнику достаточно легко. Всего-то стоит написать в поисковой строке «купить мужские кроссовки» и поисковик сразу выдаст вам как минимум 10 Интернет-магазинов, где спортивная обувь представлена в большом разнообразии. Естественно, в первую очередь мы обращаем внимание на кроссовки известных брендов. В этом нет ничего удивительного, потому как только у них можно найти обувь, которая будет не только выполнена из качественных материалов, но и обеспечит полный комфорт при ходьбе.
	Однако как выбрать мужские кроссовки в Беларуси? На что обращать внимание? В этой статье мы бы хотели дань несколько дельных советов, которые помогут вам выбрать идеально сидящую на ноге пару спортивной обуви.
	·Совет № 1 Лучше всего примерять кроссовки вечером, так как под конец дня ноги устают, а значит становятся больше в размере. Обувь, которая не доставит вам дискомфорта вечером, будет отлично носится и не будет натирать.
	·Совет № 2 Обувь должна быть максимально легкой, поэтому просто сравните несколько понравившихся моделей, держа их в руках.
	·Совет № 3 Лучше выбрать модель со съемной стелькой.
	·Совет № 4 Если вы ищете кроссовки для занятий спортом, то выбирайте модели со шнурками, так как они лучше фиксируют ногу.
	·Совет № 5 Пройдитесь в новой паре по магазину. Обувь не должна нигде давить, но и болтаться на ней тоже не должна.`
}

export const Content = observer(() => {
	const { user, dataApp } = useContext(Context)
	const exit = () => {
		localStorage.removeItem('token')
		user.setIsAuth(false)
		user.setUser(false)
	}
	return (
		<div className='h-auto w-52'>
			<div className='text-center mb-3'>
				<p className='text-lg font-semibold'>Аккаунт</p>
				<p className='text-gray-500'>{user.userData.login ? user.userData.login : ''}</p>
			</div>
			<p className='text-base py-1'>
				<UserOutlined />
				<Link to='/moi-dannye' className='ml-1.5'>Мои данные</Link>
			</p>
			<p className='text-base py-1'>
				<ReadOutlined />
				<Link to='/istoriya-zakazov' className='ml-1.5'>История заказов</Link>
			</p>
			<div className='flex justify-start items-center'>
				<img
					src={vesy}
					className='w-4 hover:scale-110 duration-500 mr-1.5'
					alt='список избранных'
				/>
				<p className='text-base py-1 mr-2'>
					<Link to='/cpisok-sravneniya'>Список сравнения</Link>
				</p>
				<Badge count={dataApp.vesyLength} showZero color='#292D51' />
			</div>
			<div className='flex justify-start items-center'>
				<img
					src={heart}
					className='w-4 hover:scale-110 duration-500 mr-1.5'
					alt='список избранных'
				/>
				<p className='text-base py-1 mr-2'>
					<Link to='/spisok-ponravivshikhsya'>Избранные</Link>
				</p>
				<Badge count={dataApp.likedLength} showZero color='#292D51' />
			</div>
			<div className='flex justify-start items-center'>
				<EyeOutlined />
				<p className='text-base py-1 mr-2 ml-1.5'>
					<Link to='/prosmotrennye-tovari'>Просмотренные</Link>
				</p>
				<Badge count={dataApp.viewLength} showZero color='#292D51' />
			</div>
			<hr />
			<div className='flex items-center'>
				<ExportOutlined />
				<p className='ml-1.5'>
					<Button
						type='text'
						className='p-0 text-base'
						onClick={exit}
					>Выход</Button>
				</p>
			</div>
		</div>
	)
})

