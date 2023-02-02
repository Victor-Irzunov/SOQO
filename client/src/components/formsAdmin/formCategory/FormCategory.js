import React, { useState, useEffect } from 'react'
import FormComp from '../FormComp'
import { fetchCategory } from '../../../http/productsAPI'
import { createCategory, deleteCategory } from '../../../http/adminAPI'

const FormCategory = () => {
	const [isLoad, setIsLoad] = useState(false)
	const [data, setData] = useState([])

	useEffect(() => {
		fetchCategory().then(data => {
			setData(data)
		})
	}, [isLoad])

	return (
		<div>
			<p className='mb-4'>Добавить / Удалить категорию товара</p>
			<FormComp
				setIsLoad={setIsLoad}
				data={data}
				fuCreate={createCategory}
				fuDelete={deleteCategory}
				text='категорию'
				row={'name'}
			/>
		</div>
	)
}
export default FormCategory