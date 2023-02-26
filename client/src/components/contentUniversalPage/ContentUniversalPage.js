import React, { useEffect, useState, useContext } from 'react'
import {
	Typography,
} from 'antd'
// import { getContentPage } from '../../http/contentAPI'
import { textMenPage } from '../../content/Content'
import { Context } from '../../App'


const { Paragraph } = Typography

export const ContentUniversalPage = ({ typeId, categoryId }) => {
	const { user } = useContext(Context)
	const [editH2, setEditH2] = useState(textMenPage.h2)
	const [editH3, setEditH3] = useState(textMenPage.h3)
	const [editContent, setEditContent] = useState(textMenPage.p)
	const [editContentH2, setEditContentH2] = useState(textMenPage.p2)
	const [editContentH3, setEditContentH3] = useState(textMenPage.p3)

	// useEffect(() => {
	// 	getContentPage(typeId, categoryId)
	// 		.then(data => {
	// 			console.log('data: ', data)
	// 		})
	// }, [])

	return (
		<div className='mt-32'>
			<Paragraph
				editable={
					user.userData.role === "ADMIN" &&
					{
						onChange: setEditContent,
					}
				}
			>
				{editContent}
			</Paragraph>


			<Typography.Title
				editable={
					user.userData.role === "ADMIN" &&
					{
						onChange: setEditH2,
					}
				}
				level={2}
			>
				{editH2}
			</Typography.Title>

			<Paragraph
				editable={
					user.userData.role === "ADMIN" &&
					{
						onChange: setEditContentH2,
					}
				}
			>
				{editContentH2}
			</Paragraph>


			<Typography.Title
				level={3}

				editable={
					user.userData.role === "ADMIN" &&
					{
						onChange: setEditH3,
					}}
			>
				{editH3}
			</Typography.Title>

			<Paragraph
				editable={
					user.userData.role === "ADMIN" &&
					{
						onChange: setEditContentH3,
					}}
			>
				{editContentH3}
			</Paragraph>
		</div>
	)
}
