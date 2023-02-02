import { List, Tooltip, Avatar, Spin, Empty } from 'antd'
import { UserSwitchOutlined } from '@ant-design/icons'
import moment from 'moment'
import React from 'react'
import 'moment/locale/ru'
moment.locale('ru')


const VoprosOtvet = ({ dataQuestRes = null }) => {


	if (!dataQuestRes) {
		return <Spin />
	}


	return (
		dataQuestRes ?
			<List
				className="comment-list"
				header={`Количество диалогов: ${dataQuestRes.length}`}
				itemLayout="horizontal"
				dataSource={dataQuestRes}
				renderItem={(item) => (
					<li className='mt-4'>
						<div className='flex justify-start items-center'>
							<Avatar>{item.name.slice(0,1)}</Avatar>
							<p className='ml-2 mr-2 text-base'>{item.name}</p>
							<Tooltip title={item.createdAt}>
								<span className='text-xs text-gray-400'>{moment(item.createdAt).fromNow()}</span>
							</Tooltip>
						</div>
						<div className='pl-10 mt-3'>
							<p className=''>{item.question}</p>
							<div className='flex items-center mt-3'>
								<Avatar icon={<UserSwitchOutlined />} size='small' />
								<p className='text-gray-500 text-xs ml-2'>Администратор</p>
							</div>
							<p className='text-gray-500 ml-8 mt-2'>{item.response}</p>
						</div>


					</li>
				)}
			/>
			:
			<Empty />
	)
}
export default VoprosOtvet