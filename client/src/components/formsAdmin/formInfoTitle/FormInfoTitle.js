import React, { useState, useEffect } from 'react'
import FormComp from '../FormComp'
import { fetchInfoTitle } from '../../../http/productsAPI'
import { createInfoTitle, deleteeInfoTitle } from '../../../http/adminAPI'
import { observer } from "mobx-react-lite"


const FormInfoTitle = () => {
	const [isLoad, setIsLoad] = useState(false)
	const [data, setData] = useState([])

	useEffect(() => {
		fetchInfoTitle().then(data => {
			setData(data)
		})
	}, [isLoad])

	return (
		<div>
			<p className='mb-4'>Добавить / Удалить заголовок характеристик</p>
			<FormComp
				setIsLoad={setIsLoad}
				data={data}
				fuCreate={createInfoTitle}
				fuDelete={deleteeInfoTitle}
				text='заголовок'
				row='name'
			/>
		</div>
	)
}
export default FormInfoTitle