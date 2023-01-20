
import { Badge } from 'antd'
import React, { useContext } from 'react'
import { observer } from "mobx-react-lite"
import vesy from '../../../images/menuIcon/scale.svg'
import { ReactComponent as Vesy } from '../../../images/menuIcon/scale.svg'
import './BadgeIconVesy.css'
import { Context } from '../../../App'
import { Tooltip } from 'antd'
import { Link } from 'react-router-dom'
import CyrillicToTranslit from 'cyrillic-to-translit-js'
const BadgeIconVesy = observer(({ cardComp, header, productPage, addToComparisonList, id, mobil }) => {
	const { dataApp } = useContext(Context)
	const cyrillicToTranslit = new CyrillicToTranslit()
	return (
		<>
			{
				cardComp &&
				<div
					className='cursor-pointer'
					onClick={() => addToComparisonList('ComparisonList', id)}
				>
					{
						dataApp.vesyArr.includes(id) ?
							<Tooltip title='Товар в сравнении'>
								<Link to={`/${cyrillicToTranslit.transform(('cписок сравнения').split(' ').join('-'))}`}>
									<Vesy className={dataApp.vesyArr.includes(id) ? 'icon-vesy activevesy' : 'icon-vesy'} />
								</Link>
							</Tooltip>
							:
							<Tooltip title="Добавить в сравнение">
								<Vesy className={dataApp.vesyArr.includes(id) ? 'icon-vesy activevesy' : 'icon-vesy'} />
							</Tooltip>
					}
				</div>
			}
			{
				header &&
				<div className={`absolute top-5 right-60 md:right-48 sm:right-28 cursor-pointer`}>
					<Link to={`/${cyrillicToTranslit.transform(('cписок сравнения').split(' ').join('-'))}`}>
						<Badge count={dataApp.vesyLength} size="small">
							<img
								src={vesy}
									className='w-6 hover:scale-110 duration-500'
									alt='список сравнения'
							/>
						</Badge>
					</Link>
				</div>
			}
			{
				productPage &&
				<div
					className='cursor-pointer'
					onClick={() => addToComparisonList('ComparisonList', id)}
				>
					{
						dataApp.vesyArr.includes(id) ?
							<Tooltip title='Товар в сравнении'>
								<Link to={`/${cyrillicToTranslit.transform(('cписок сравнения').split(' ').join('-'))}`}>
									<Vesy className={dataApp.vesyArr.includes(id) ? 'icon-vesy activevesy' : 'icon-vesy'} />
								</Link>
							</Tooltip>
							:
							<Tooltip title="Добавить в сравнение">
								<Vesy className={dataApp.vesyArr.includes(id) ? 'icon-vesy activevesy' : 'icon-vesy'} />
							</Tooltip>
					}
				</div>
			}
			{
				mobil &&
				<div className='cursor-pointer mr-3'>
					<Link to={`/${cyrillicToTranslit.transform(('cписок сравнения').split(' ').join('-'))}`}>
						<Badge count={dataApp.vesyLength} size="small">
							<img
								src={vesy}
									className='w-6 hover:scale-110 duration-500'
									alt='список сравнения'
							/>
						</Badge>
					</Link>
				</div>
			}

		</>

	)
})
export default BadgeIconVesy