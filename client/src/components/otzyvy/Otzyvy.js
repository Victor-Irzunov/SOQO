import { DislikeFilled, DislikeOutlined, LikeFilled, LikeOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Tooltip, Rate } from 'antd'
import React, { createElement, useState } from 'react'
import moment from 'moment'
// import { Helmet } from "react-helmet"
const Otzyvy = ({ product }) => {

	return (
		<>
			<section className='container'>
				<article>
					{
						product.feedbacks.map(el => {
							return (
								<div className=''>
									<div>

									</div>
									<Avatar icon={<UserOutlined />} />
									<span className='ml-2 mr-2'>{el.name}</span>
									<Tooltip title={el.createdAt}>
										<span className='text-gray-400 text-xs'>{moment(el.createdAt).fromNow()}</span>
									</Tooltip>
									<div key="comment-basic-reply-to">
										<Rate allowHalf value={+el.rating.rate} />
									</div>
									
									<p>
										{el.description}
									</p>
									{el.plus !== 'undefined' ?
										<p className='text-xs'>Плюсы: {el.plus}</p>
										:
										undefined
									}
									{el.minus !== 'undefined' ?
										<p className='text-xs'>Минусы: {el.minus}</p>
										:
										undefined
									}
								</div>
							)
						})
					}
				</article>
			</section>
		</>
	)
}
export default Otzyvy