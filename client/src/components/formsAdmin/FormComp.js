import React, { useState, useRef,useContext } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { Divider, Input, Select, Space, Button, message } from 'antd'
import CyrillicToTranslit from 'cyrillic-to-translit-js'
import { Context } from '../../App'

const FormComp = ({ data, setIsLoad, fuCreate, fuDelete, text, row, color }) => {
	const [name, setName] = useState('')
	const inputRef = useRef(null)
	const { dataApp } = useContext(Context)
	const cyrillicToTranslit = new CyrillicToTranslit()
	const onNameChange = event => {
		setName(event.target.value)
	}
	const createLink = name => {
		let link = cyrillicToTranslit.transform(name, "-").toLowerCase()
		return link
	}
	const addItem = e => {
		e.preventDefault()
		if (name !== '') {
			fuCreate({ name, link:createLink(name) })
				.then(data => {
					message.success(data.message)
					setIsLoad(i => !i)
					dataApp.setIsInfoTitle(i => !i)
				})
				.catch(data => {
					message.error(data.response.data.message)
				})
			setName('')
			setTimeout(() => {
				inputRef.current?.focus()
			}, 0)
		} else {
			message.warning(`Введите ${text} для добавления!`)
		}
	}
	const deleteItem = id => {
		fuDelete(id)
			.then(data => {
				message.success(data.message)
				setIsLoad(i => !i)
				dataApp.setIsInfoTitle(i => !i)
			})
			.catch(data => {
				message.error(data.message)
			})
		setName('')
	}
	return (
		<Select
			style={{
				width: 370,
			}}
			showSearch
			placeholder={`${text}`}
			dropdownRender={(menu) => (
				<>
					{menu}
					<Divider
						style={{
							margin: '15px 0',
						}}
					/>
					<Space
						style={{
							padding: '10px 8px 8px',
						}}
					>
						{
							<>
								<Input
									placeholder={`Введите ${text}`}
									ref={inputRef}
									value={name}
									onChange={onNameChange}
								/>
								<Button
									type="text"
									icon={<PlusOutlined />}
									onClick={addItem}
									className='text-green-600 pr-0'
								>
									Добавить {text}
								</Button>
							</>
						}
					</Space>
				</>
			)}
			status={!data && "warning"}
		>
			{data.map(el => {
				return (
					<Select.Option
						key={el.id}
						value={el.name}
						label=''
						disabled
						className='text-black'
					>
						<div className='flex justify-between'>
							<div>
								{el.name}
							</div>
							<div>
								<Button
									type='text'
									className='text-red-600 pr-0 text-xs'
									onClick={() => deleteItem(el.id)}
								>
									Удалить
								</Button>
							</div>
						</div>
					</Select.Option>
				)
			})
			}
		</Select>
	)
}
export default FormComp