import React, { useEffect, useState } from 'react'
import {
	Button, Popconfirm, message, Checkbox, Image
} from 'antd'
import { deleteOneBannerPage, getAllBannerPage } from '../../../../http/imgAPI'

function FormDeleteBannerPage() {
	const [data, setData] = useState([])
	const [elId, setElId] = useState([])
	const [isLoad, setIsLoad] = useState(true)
	useEffect(() => {
		getAllBannerPage()
			.then(data => {
				setData(data)
			})
	}, [isLoad])
	const onChange = checkedValues => {
		setElId(checkedValues)
	}
	const deleteImg = () => {
		if (elId.length) {
			deleteOneBannerPage({ dataId: JSON.stringify(elId) })
				.then(data => {
					message.success(data.message)
					setIsLoad(!isLoad)
				})
		} else {
			message.warning('Выберите банер для удаления!')
		}
	}
	return (
		<div className='pb-12'>
			{data.length ? <p>Выберите банер для удаления</p> : <p className='ml-10 text-orange-600'>Нет картинок</p>}
			
			<Checkbox.Group onChange={onChange}>
				<div className='flex justify-between'>
					{data.map(el => {
						return (
							<div className={`mr-1 text-center`}>
								<Image src={process.env.REACT_APP_API_URL + JSON.parse(el.img)[0].img} />
								<Checkbox value={el.id} className='mt-2'></Checkbox>
							</div>
						)
					})}
				</div>
			</Checkbox.Group>
			<Popconfirm
				title={elId.length > 1 ? "Удалить банер" : "Удалить банер"}
				onConfirm={deleteImg}
				okText="Да"
				cancelText="Нет"
			>
				<Button type='primary' className='mt-4 float-right'>
					Удалить
				</Button>
			</Popconfirm>
		</div>
	)
}
export default FormDeleteBannerPage