import React, { useEffect, useState, useContext } from 'react'
import { getAllStocks } from '../../http/stocksAPI'
import { Badge, Image,FloatButton } from 'antd'
import { Context } from '../../App'

export const StoksPage = () => {
	const [data, setData] = useState([])
	const { user } = useContext(Context)

	useEffect(() => {
		getAllStocks()
			.then(data => {
				if (data) {
					setData(data)
				}
			})
	}, [])

	return (
		<section className='pt-10 pb-20'>
			<FloatButton.BackTop />
			<div className='container'>
				<div className=''>
					<h1 className='text-4xl text-[#0F0E0E]'>
						Акции
					</h1>
				</div>

				<div className='flex justify-between items-center flex-wrap'>
					{data.map(el => {
						const img = JSON.parse(el.img)
						return (
							<div key={el.id} className='mt-12'>

								<div className='flex justify-between'>
									<p className='text-gray-600'>
										Период проведения: {el.date1} - {el.date2}
									</p>
									{el.status ?
										<div className='flex'>
											<Badge status="processing" color='green' />
											<p className='text-green-600 ml-2'>
												Действует
											</p>
										</div>
										:
										<div className='flex'>
											<Badge status="error" />
											<p className='text-red-400 ml-2'>
												Закончилась
											</p>
										</div>
									}
								</div>
								<div className='relative'>
									<Image src={process.env.REACT_APP_API_URL + img[0].img} />
									{
										user.userData.role === 'ADMIN' &&
										(
											<div className='absolute top-0 right-0 w-10 h-10 bg-white flex justify-center items-center'>
												<p className='mb-0'>№ {el.id}</p>
											</div>
										)
									}
								</div>
								<div className='mt-3'>
									<p className='text-xl font-semibold'>
										{el.title}
									</p>
									<p className='text-gray-500 font-light'>
										{el.text}
									</p>
								</div>
							</div>
						)
					})}
				</div>
			</div>
		</section>
	)
}
