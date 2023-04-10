import React from "react"
import { useLocation, Link } from "react-router-dom"
import { HomeOutlined } from '@ant-design/icons'
import { Breadcrumb } from "antd"
import CyrillicToTranslit from 'cyrillic-to-translit-js'

const BreadCrumbComp = () => {
	const cyrillicToTranslit = new CyrillicToTranslit()
	const location = useLocation()


	const breadCrumbView = () => {
		const { pathname } = location
		const pathnames = pathname.split("/").filter((item) => item)
		const capatilize = s => s.charAt(0).toUpperCase() + s.slice(1)

		
		return (
			<div className="container">
				<Breadcrumb>
					{
						pathnames.length > 0
							?
							(<Breadcrumb.Item>
								<Link to="/"><HomeOutlined /></Link>
							</Breadcrumb.Item>)
							:
							(<Breadcrumb.Item><HomeOutlined /></Breadcrumb.Item>)
					}
					{pathnames.map((name, index) => {
						const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`
						let names = cyrillicToTranslit.reverse(name.split('-').join(' '))
						// console.log('---names: ', names)
						if (names.length > 4) {
							const isLast = index === pathnames.length - 1;
							return isLast
								?
								(
									<Breadcrumb.Item key={index} >
										{capatilize(names)}
									</Breadcrumb.Item>
								)
								:
								(
									<Breadcrumb.Item
										key={index}
									>
										<Link to={`${routeTo}`}>
											{capatilize(names)}
										</Link>
									</Breadcrumb.Item>
								)
						}
					})}
				</Breadcrumb>
			</div>
		)
	}
	return <>{breadCrumbView()}</>
}
export default BreadCrumbComp