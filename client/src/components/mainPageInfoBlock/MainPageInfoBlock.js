import React from 'react'
import {Image} from 'antd'
import img1 from '../../images/mainInfo/info1.webp'
import img2 from '../../images/mainInfo/info2.webp'
import img3 from '../../images/mainInfo/info3.webp'
import img4 from '../../images/mainInfo/info4.webp'
import img5 from '../../images/mainInfo/info5.webp'

export const MainPageInfoBlock = () => {
	return (
		<section className='bg-[#3E3E44] h-auto mt-10'>
			<div className='container'>
				<div className='flex justify-between items-center xs:items-start xx:items-start xy:items-start xz:items-start p-4 pt-6'>
					<div className='xm:w-40 rounded-2xl text-center ss:hidden sm:block xm:hidden xs:hidden xx:hidden xy:hidden xz:hidden'>
						<Image src={img1} className='rounded-2xl' />
						<p className='text-white text-xs mt-3'>Постоянные скидки на наши товары</p>
					</div>
					<div className='xm:w-40 xs:w-28 xx:w-28 xy:w-28 xz:w-20 rounded-2xl text-center'>
						<Image src={img2}className='rounded-2xl' />
						<p className='text-white xy:text-xs xz:text-[10px] mt-3'>Доставка по Минску и почтовыми отделениями по всей Беларуси</p>
					</div>
					<div className='xm:w-40 xs:w-28 xx:w-28 xy:w-28 xz:w-20 rounded-2xl text-center'>
						<Image src={img3} className='rounded-2xl'/>
						<p className='text-white xy:text-xs xz:text-[10px] mt-3'>Наши цены вас приятно удивят</p>
					</div>
					<div className='xm:w-40 xs:w-28 xx:w-28 xy:w-28 xz:w-20 rounded-2xl text-center'>
						<Image src={img4} className='rounded-2xl'/>
						<p className='text-white xy:text-xs xz:text-[10px] mt-3'>В ассортименте только на лучшая сантехника из Китая</p>
					</div>
					<div className='xm:w-40 rounded-2xl xs:hidden xx:hidden xy:hidden xz:hidden xm:block text-center'>
						<Image src={img5} className='rounded-2xl'/>
						<p className='text-white text-xs mt-3'>Удобное расположение нашего магазина</p>
					</div>
				</div>
			</div>
		</section>
	)
}
