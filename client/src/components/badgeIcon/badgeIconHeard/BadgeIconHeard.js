// import { HeartOutlined } from '@ant-design/icons'
import { Badge, Tooltip } from 'antd'
import heart from '../../../images/menuIcon/heart.svg'
import React, { useContext } from 'react'
import { ReactComponent as Heart } from '../../../images/menuIcon/heart.svg'
import './BadgeIconHeard.css'
import { Link } from 'react-router-dom'
import { Context } from '../../../App'
import { observer } from "mobx-react-lite"
import CyrillicToTranslit from 'cyrillic-to-translit-js'
const BadgeIconHeard = observer(({ cardComp, header, productPage, addToLiked, id, mobil }) => {
	const { dataApp } = useContext(Context)
	const cyrillicToTranslit = new CyrillicToTranslit()
	return (
		<>
			{cardComp &&
				<div
					className='cursor-pointer ml-5'
					onClick={() => addToLiked('LikedList', id)}
				>
					{
						dataApp.likedArr.includes(id) ?
							<Tooltip title="Товар уже Вам нравится">
								<Link to={`/${cyrillicToTranslit.transform(('список понравившихся').split(' ').join('-'))}`}>
									<Heart className={dataApp.likedArr.includes(id) ? 'icon-heart activeliked' : 'icon-heart'} />
								</Link>
							</Tooltip>
							:
							<Tooltip title="Нравится">
								<Heart className={dataApp.likedArr.includes(id) ? 'icon-heart activeliked' : 'icon-heart'} />
							</Tooltip>
					}
				</div>
			}
			{
				header &&
				<div className='cursor-pointer mr-5'>
					<Link to={`/${cyrillicToTranslit.transform(('список понравившихся').split(' ').join('-'))}`}>
						<Badge count={dataApp.likedLength} size="small">
							<img
								src={heart}
									className='w-6 hover:scale-110 duration-500'
									alt='список избранных'
							/>
						</Badge>
					</Link>
				</div>
			}

			{productPage &&
				<div
					className='cursor-pointer'
					onClick={() => addToLiked('LikedList', id)}
				>
					{
						dataApp.likedArr.includes(id) ?
							<Tooltip title='Товар Вам нравится'>
								<Link to={`/${cyrillicToTranslit.transform(('список понравившихся').split(' ').join('-'))}`}>
									<Heart className={dataApp.likedArr.includes(id) ? 'icon-heart activeliked' : 'icon-heart'} />
								</Link>
							</Tooltip>
							:
							<Tooltip title="Нравится">
								<Heart className={dataApp.likedArr.includes(id) ? 'icon-heart activeliked' : 'icon-heart'} />
							</Tooltip>
					}
				</div>
			}
			{
				mobil &&
				<div className='cursor-pointer mr-4'>
					<Link to={`/${cyrillicToTranslit.transform(('список понравившихся').split(' ').join('-'))}`}>
						<Badge count={dataApp.likedLength} size="small">
							<img
								src={heart}
									className='w-6 hover:scale-110 duration-500'
									alt='список избранных'
							/>
						</Badge>
					</Link>
				</div>
			}
		</>
	)
})
export default BadgeIconHeard