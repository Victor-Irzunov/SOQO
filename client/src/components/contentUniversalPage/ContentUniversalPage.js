import React, { useEffect, useState, useContext } from 'react'
import {
	Badge, Empty,
} from 'antd'
// import { getContentPage } from '../../http/contentAPI'
// import { textMenPage } from '../../content/Content'
import { Context } from '../../App'
import { getOneUniqueContent } from '../../http/adminAPI'
import parse from 'html-react-parser'


// const { Paragraph } = Typography

export const ContentUniversalPage = ({ typeId, categoryId }) => {
	const { user } = useContext(Context)
	const [data, setData] = useState({})

	useEffect(() => {
		setData({})
		if (categoryId) {
			getOneUniqueContent({ typeId, categoryId })
				.then(data => {
					console.log('data:', data)
					if (data && !data.message) {
						setData(data)
					} else {
						setData({})
					}
				})
		}
	}, [categoryId, typeId])

	return (

		<article className='mt-32 mb-24'>
			{Object.keys(data).length && data.link !== 'undefined' ?
				<iframe width="100%" height="415" src={data.link} className='mb-20' title={data.title ? data.title : ''} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
				:
				undefined
			}
			{Object.keys(data).length ?
				<div className='relative text-justify'>
					{parse(data.content)}
					{
						user.userData.role === "ADMIN" &&
						<span className='absolute top-0 right-0 text-blue-700 text-xl'>
							<Badge count={data.id} color="#292D51" />
						</span>
					}

				</div>
				:
				undefined
			}
		</article>
	)
}
