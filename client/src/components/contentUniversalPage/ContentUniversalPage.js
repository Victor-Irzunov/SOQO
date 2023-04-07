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
	// const [editH2, setEditH2] = useState(textMenPage.h2)
	// const [editH3, setEditH3] = useState(textMenPage.h3)
	// const [editContent, setEditContent] = useState(textMenPage.p)
	// const [editContentH2, setEditContentH2] = useState(textMenPage.p2)
	// const [editContentH3, setEditContentH3] = useState(textMenPage.p3)
	const [data, setData] = useState({})

	// console.log('typeId: ', typeId)
	// console.log('categoryId: ', categoryId)


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
		// <div className='mt-32'>
		// 	<Paragraph
		// 		editable={
		// 			user.userData.role === "ADMIN" &&
		// 			{
		// 				onChange: setEditContent,
		// 			}
		// 		}
		// 	>
		// 		{editContent}
		// 	</Paragraph>


		// 	<Typography.Title
		// 		editable={
		// 			user.userData.role === "ADMIN" &&
		// 			{
		// 				onChange: setEditH2,
		// 			}
		// 		}
		// 		level={2}
		// 	>
		// 		{editH2}
		// 	</Typography.Title>

		// 	<Paragraph
		// 		editable={
		// 			user.userData.role === "ADMIN" &&
		// 			{
		// 				onChange: setEditContentH2,
		// 			}
		// 		}
		// 	>
		// 		{editContentH2}
		// 	</Paragraph>


		// 	<Typography.Title
		// 		level={3}

		// 		editable={
		// 			user.userData.role === "ADMIN" &&
		// 			{
		// 				onChange: setEditH3,
		// 			}}
		// 	>
		// 		{editH3}
		// 	</Typography.Title>

		// 	<Paragraph
		// 		editable={
		// 			user.userData.role === "ADMIN" &&
		// 			{
		// 				onChange: setEditContentH3,
		// 			}}
		// 	>
		// 		{editContentH3}
		// 	</Paragraph>
		// </div>
		<article className='mt-32 mb-24'>
			{Object.keys(data).length && data.link !== 'undefined' ?
				// 	<video src={data.link}
				// 	autoPlay
				// 	playsInline
				// 	muted
				// 	loop
				// 	defaultMuted
				// 	className='rounded-lg m-auto'
				// />
				<iframe width="100%" height="415" src={data.link} className='mb-20' title={data.title ? data.title : ''} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
				:
				undefined
			}
			{Object.keys(data).length ?
				<div className='relative'>
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
