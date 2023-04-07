import React, { useState, useEffect } from 'react'
import ReactQuill, { Quill } from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import parse from 'html-react-parser'
import ImageResize from 'quill-image-resize-module-react'
import { Button } from 'antd'

Quill.register('modules/imageResize', ImageResize)

function ReactEditor({ onChange, setValue, isGetOne, value }) {
	const [isActive, setIsActive] = useState(false)

	var toolbarOptions = [
		['bold', 'italic', 'underline', 'strike'],
		['blockquote', 'code-block'],
		[{ 'header': 2 }],
		[
			{ list: "ordered" },
			{ list: "bullet" },
			{ indent: "-1" },
			{ indent: "+1" },
		],
		[{ 'script': 'sub' }, { 'script': 'super' }],
		[{ 'direction': 'rtl' }],
		[{ 'size': ['small', false, 'large', 'huge'] }],
		[{ 'header': [2, 3, 4, 5, 6, false] }],
		[{ 'color': [] }, { 'background': [] }],
		[{ 'font': [] }],
		['clean'],
		['link', 'image'],
		[{ align: '' }, { align: 'center' }, { align: 'right' }, { align: 'justify' }],
	]
	
	return (
		<>
				<ReactQuill
				theme="snow"
				value={value}
				onChange={e => {
					if (!isGetOne) {
						onChange(e)
					}
					setValue(e)
				}}
				modules={
					{
						toolbar: toolbarOptions,
						imageResize: {
							parchment: Quill.import('parchment'),
						}
					}
				}
				style={{ background: '#fff', borderRadius: '10px' }}
			// formats={formats}
					/>
		
			<Button
				type='primary'
				ghost
				onClick={() => setIsActive(i => !i)}
				className='mt-6'
			>
				{isActive ? 'закрыть' : 'смотреть'}
			</Button>
			{
				isActive ?
					<div className='mt-20 editors bg-white rounded-lg p-2 min-h-screen'>
						{parse(value)}
					</div>
					:
					undefined
			}
		</>
	)
}

export default ReactEditor