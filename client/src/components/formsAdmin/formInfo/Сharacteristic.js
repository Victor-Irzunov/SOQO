import React, { useEffect, useState, useContext } from 'react'
import FormInfo from './FormInfo'
import { Button, message } from 'antd'
import { fetchInfo, fetchInfoTitle } from '../../../http/productsAPI'
import ListInfo from '../../listAdminInfo/ListInfo'
import { Context } from '../../../App'
import { observer } from "mobx-react-lite"

const Сharacteristic = observer(() => {
	const [data, setData] = useState([])
	const [dataTitleInfo, setDataTitleInfo] = useState([])
	const [isActive, setIsActive] = useState(false)
	const [isUpdate, setIsUpdate] = useState(false)
	const [messages, setMessages] = useState(false)
	const { dataApp } = useContext(Context)


	useEffect(() => {
		fetchInfo()
			.then(data => {
				setData(data)
			})
			.catch(error => {
				message.error(error)
			})
		fetchInfoTitle()
			.then(data => setDataTitleInfo(data))
	}, [messages, dataApp.isInfoTitle, isUpdate])

	return (
		<div>
			<p className='mb-4 text-base'>Добавить характеристики</p>
			<FormInfo data={data} setMessages={setMessages} />
			<Button
				type='text'
				className='font-bold mb-8'
				onClick={() => setIsActive(i => !i)}
			>Смотреть характеристики</Button>
			<div>
				{isActive &&
					<ListInfo data={data} setMessages={setMessages} dataTitleInfo={dataTitleInfo} setIsUpdate={setIsUpdate} />
				}
			</div>
		</div>
	)
})

export default Сharacteristic