import { List, Button } from 'antd'
import React from 'react'

const FooterList = ({ data, title }) => {
	return (
		<List
			size="small"
			header={<div className='text-white font-light 
			text-base border-b border-t-transparent border-l-transparent
			border-r-transparent border-white/60 border-solid'
			>
				{title}
			</div>}
			dataSource={data}
			renderItem={(item) => <List.Item key={item.key}>
				<Button type="link" className='text-white hover:text-[#ccc] text-base font-light'>
					{item.label}
				</Button>
			</List.Item>}
		/>
	)
}
export default FooterList