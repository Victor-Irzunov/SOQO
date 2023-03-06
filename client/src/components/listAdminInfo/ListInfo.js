import React, { useState } from 'react'
import { Button, message, Space, } from 'antd'
import { deleteInfo } from '../../http/adminAPI'
import { ArrowUpOutlined } from '@ant-design/icons'
import FormAddInfo from '../formsAdmin/formAddInfo/FormAddInfo'


const ListInfo = ({ data, setMessages, dataTitleInfo,setIsUpdate }) => {
	const [isActive, setIsActive] = useState(false)
	const [isId, setIsId] = useState('')


	const deleteFu = id => {
		deleteInfo(id)
			.then(data => {
				setMessages(i => !i)
			})
			.catch(err => {
				message.error(err.message)
			})
	}
	return (
		dataTitleInfo.map(el => {
			return (
				<React.Fragment key={el.id}>
					<p className='text-base font-bold mb-2'>{el.name}</p>
					<Space align='start' size='large' wrap key={el.id}>
						{data.map(elem => {
							if (el.id === elem.infoTitleId) {
								return (
									<div className='mb-5' >
										<p className='text-sm font-semibold'>{elem.name}</p>
										{elem.content.map((item, idx) => {
											return (
												<p key={idx}>{item}</p>
											)
										})}
										<Button
											type='text'
											className='text-green-600 font-light text-xs pl-0'
											onClick={() => {
												setIsActive(i => !i)
												setIsId(el.id)
											}}
										>
											добавить
										</Button>
										<Button
											type='text'
											className='text-red-600 font-light text-xs'
											onClick={() => deleteFu(elem.id)}
										>
											удалить всё
										</Button>
										{
											isActive && el.id === isId ?
												(
													<>
														<FormAddInfo id={el.id} setIsActive={setIsActive} setIsId={setIsId} setIsUpdate={setIsUpdate} />
														<Button
															type='text'
															className='text-blue-600 font-light text-xs'
															onClick={() => {
																setIsActive(i => !i)
																setIsId('')
															}}

														>
															скрыть форму <ArrowUpOutlined />
														</Button>
													</>
												)
												:
												undefined
										}
									</div>
								)
							}
						})}
					</Space>

				</React.Fragment>
			)
		})
	)
}
export default ListInfo

