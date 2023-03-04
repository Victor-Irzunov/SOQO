import React, { useState, useRef, useEffect, useContext } from 'react'
import { MinusCircleOutlined, DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons'
import { Button, Form, Input, Space, message, Radio } from 'antd'
import { createInfo } from '../../../http/adminAPI'
import { fetchInfoTitle } from '../../../http/productsAPI'
import { Context } from '../../../App'
import { observer } from "mobx-react-lite"


const FormInfo = observer(({ setMessages }) => {
	const [form] = Form.useForm()
	const ref = useRef('')
	const [arr, setArr] = useState({})
	const [data, setData] = useState([{ id: 1, }])
	const [infoTitle, setInfoTitle] = useState([])
	const { dataApp } = useContext(Context)

	useEffect(() => {
		fetchInfoTitle()
			.then(data => {
				setInfoTitle(data)
			})
	}, [dataApp.isInfoTitle])


	const onFinish = values => {
		const array = [{ name: values.name, content: Object.values(arr), infoTitleId: values.infoTitleId }]
		createInfo(array)
			.then(data => {
				message.success(data.message)
				setTimeout(() => { clearForm() }, [500])
				setMessages(i => !i)
				setArr({})
			})
			.catch(error => {
				message.error(error)
			})
	}

	const addArr = e => {
		setArr(st => ({ ...st, [e.target.name]: e.target.value }))
	}
	const delElemArr = (el) => {
		if (data.length > 1) {
			setData((previousArr) => (previousArr.slice(0, -1)))
			setArr(current => {
				const copy = { ...current }
				delete copy[el]
				return copy
			})
		}
	}
	const fu = (num) => {
		setData([...data, { id: num }])
	}
	const clearForm = () => {
		form.resetFields()
		if (data.length > 1) setData([{ id: 1, }])
	}

	return (
		<Form
			name="dynamic_form_nest_item"
			onFinish={onFinish}
			autoComplete="off"
			form={form}
			className='mt-6'
		>
			<Form.Item
				name="infoTitleId"
				label="Выберите заголовок характеристики"
				hasFeedback
				labelCol={{
					span: 24
				}}
				wrapperCol={{
					span: 14,
				}}
				rules={[
					{
						required: true,
						message: 'Выберите заголовок!',
					},
				]}
			>
				<Radio.Group buttonStyle="solid">
					{infoTitle.map(el => {
						return (
							<Radio.Button key={el.id} className='mr-1 mb-1' value={el.id}>{el.name}</Radio.Button>
						)
					})
					}
				</Radio.Group>
			</Form.Item>

			<Space
				style={{
					display: 'flex',
					marginBottom: 8,
					marginTop: '4em'
				}}
				align="baseline"
			>
				<Form.Item
					name='name'
					rules={[
						{
							required: true,
							message: 'Напишите тип!',
						},
					]}
				>
					<Input placeholder="Тип характеристики" className='w-48' allowClear />
				</Form.Item>
				<div className='flex flex-col'>
					{
						data.map((el, idx) => {
							return (
								<React.Fragment key={el.id} >
									<Form.Item
										name={String(el.id)}
										rules={[
											{
												required: true,
												message: 'Введите характеристику!',
											},
										]}
									>
										<Input
											placeholder="Введите характеристику"
											className=''
											onBlur={addArr}
											name={String(el.id + 1)}
											ref={ref}
											allowClear
										/>
									</Form.Item>
									{idx === data.length - 1 &&
										<div className='flex'>
											<PlusCircleOutlined
												onClick={() => fu(el.id + 1)}
												className='ml-1 mr-4'
											/>
											{data.length > 1 &&
												<MinusCircleOutlined onClick={() => delElemArr(el.id + 1)} />
											}
										</div>
									}
								</React.Fragment>
							)
						})
					}
				</div>
				<DeleteOutlined onClick={clearForm} />
			</Space>
			<Form.Item>
				<Button type="primary" htmlType="submit" >
					Сохранить характеристики
				</Button>
			</Form.Item>

		</Form >
	)
})
export default FormInfo