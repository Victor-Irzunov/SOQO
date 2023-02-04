import { Image, Typography, Divider } from 'antd'
import React from 'react'
import logo from '../../images/logo/Logo.png'
import img from '../../images/mainHistory/Img.jpg'
import img2 from '../../images/mainHistory/Img2.jpg'
import img3 from '../../images/mainHistory/Img3.jpg'
import img4 from '../../images/mainHistory/Img4.jpg'
import img5 from '../../images/mainHistory/Img5.jpg'
import history from '../../images/historyStore/history.webp'

// const { Paragraph } = Typography
function HisotyStore() {

	return (
		<section className='mt-20 bg-[#EDEAEA] rounded-lg p-6 mb-10'>
			<div className='container'>
				<div className=''>
					<h3 className='text-[#292D51] text-2xl mb-6'>
						О компании SOQO
					</h3>
				</div>
				<div className='xm:flex xm:justify-between xs:justify-center xx:justify-center xy:justify-center pb-3'>
					<div className='bg-[#3E3E44] p-6 ss:w-[47%] xm:w-full text-center rounded-3xl'>
						<div className='ss:hidden xs:flex xx:flex xy:flex justify-evenly items-center'>
							<Image src={logo} className='mb-3' />
							<Image src={history} className='rounded-lg' width='100px' />
						</div>
						<div className='xs:hidden xx:hidden xy:hidden xz:hidden ss:block'>
							<Image src={logo}  />
						</div>
						<p className='text-white xy:text-sm xz:text-[11px] mt-5 font-light'>
							Компания SOQO основано в 1997 г., головной офис находится в Китае, пров. Фуцзянь. Это транснациональное предприятие сантехники специализируется на производстве, реализации, предоставлении услуг. Компания сантехники SOQO полностью соответствует системам менеджмента качества международного стандарта ISO-9002, предоставляет покупателям экологически безопасную, современную и качественную сантехнику. Мы являемся прямым представителем компании в РБ и стремимся подарить клиентам приятные впечатления от магазина, товара, услуги, да и просто от общения с нами. Именно положительные эмоции покупателей делают нас сильной командой, а наш бренд − востребованным. Успех «SOQO» измеряется не только бизнес-достижениями, но и радостью клиентов от покупок в нашем магазине.
						</p>
					</div>
					<div className='w-[47%] xs:hidden xx:hidden xy:hidden xz:hidden ss:block rounded-3xl h-96 overflow-hidden'>
						<Image src={history} className='rounded-3xl' />
					</div>
				</div>

				<Divider />

				<div className='justify-between sm:justify-between items-start mt-6 xs:hidden xx:hidden xy:hidden xz:hidden xm:hidden ss:hidden sm:flex'>
					<div className='text-center w-2/12'>
						<Image src={img} />
						<p className='text-xs font-light mt-3'>
							Ассоциация производителей сантехники Веньчжоуской зоны экономического и технологического развития 2018 г
						</p>
					</div>
					<div className='text-center w-2/12'>
						<Image src={img2} />
						<p className='text-xs font-light mt-3'>
							Почетная грамота
							Качественный сервис и репутация
							Спасибо за Ваше любезное спонсорство и общее развитие
							сентябрь 2014
						</p>
					</div>
					<div className='text-center w-2/12'>
						<Image src={img3} />
						<p className='text-xs font-light mt-3'>
							Почетная грамота
							Качественный сервис и репутация
							Предприятие уровня АААА
							Китайская ассоциация по качеству и безопасности продукции 2015г.
						</p>
					</div>
					<div className='text-center w-2/12'>
						<Image src={img4} />
						<p className='text-xs font-light mt-3'>
							Почетная грамота
							Качественное и честное
							Отличное модельное предприятие
							Китайская ассоциация по качеству и безопасности продукции 2015г.
						</p>
					</div>
					<div className='text-center w-2/12'>
						<Image src={img5} />
						<p className='text-xs font-light mt-3'>
							Письмо о назначении
							Луо Сяоцзюнь назначается заместителем директора Профессионального
							комитета сантехники Китайской ассоциации ежедневных потребностей
						</p>
					</div>
				</div>
			</div>
		</section>
	)
}
export default HisotyStore