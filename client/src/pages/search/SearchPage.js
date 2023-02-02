import React, { useEffect, useContext } from 'react'
import { useSearchParams, Link, useLocation } from 'react-router-dom'
import useDebounce from '../../hooks/useDebounce'
import { searchProducts } from '../../http/productsAPI'
import { observer } from "mobx-react-lite"
import { Context } from '../../App'
import { Spin, Image, Empty } from 'antd'
import CyrillicToTranslit from 'cyrillic-to-translit-js'

export const SearchPage = observer(() => {
	const [searchParams, setSearchParams] = useSearchParams()
	const debouncedSearch = useDebounce(searchProducts, 1000)
	const { dataProducts,dataApp } = useContext(Context)
	const getQuery = searchParams.get('q') || ''
	const cyrillicToTranslit = new CyrillicToTranslit()
	let location = useLocation()

	useEffect(() => {
		if (getQuery && !dataApp?.isSendSearchForm) {
			debouncedSearch(getQuery)
			dataApp.setIsSendSearchForm(false)
		}
	}, [getQuery])

	if (dataProducts.isSpin) {
		return (
			<section className='min-h-[80vh] flex justify-center items-center'>
				<Spin tip="Ищу ...." size="large">
					<div className="content pt-32">
						<p className=''>выполняется поиск: {getQuery}</p>
					</div>
				</Spin>
			</section>
		)
	}

	return (
		<section className='pt-24 pb-20'>
			<div className=''>
				<div className='container'>
					<div className='text-2xl text-gray-500 font-light flex flex-col'>
						<span className=''>
							По запросу "{getQuery}"</span>
						<span>найдено {dataProducts.dataSearchProducts.length}
						</span>
					</div>
					{dataProducts.dataSearchProducts.length ?

						<div className='mt-20'>
							{dataProducts.dataSearchProducts.map(el => {
								const img = JSON.parse(el.imgMini)
								return (
									<div className='border-gray-400 border border-solid	 flex items-start mb-3' key={el.id}>
										<div className='w-20'>
											<Image src={process.env.REACT_APP_API_URL + img[0].image} preview={false} />
										</div>
										<div className='ml-8 mt-1'>
											<Link to={{
												pathname: `/${el.categories[0].link}/${el.types[0].link}/${cyrillicToTranslit.transform(el.name.split(' ').join('-'))}`,
											}}
												state={{ id: el.id, location: location.pathname }}
												className='no-underline'
											>
												<p className='text-xl font-semibold mb-1 text-[#292D51]'>{el.name}</p>
											</Link>
											<p className='font-light'>{el.description}</p>
											<p className=''>{el.price} BYN</p>
										</div>
									</div>
								)
							})}
						</div>
						:
						<div className='h-[60vh] flex justify-center items-center w-full'>
							<Empty />
						</div>
					}
				</div>
			</div>
		</section>
	)
})
