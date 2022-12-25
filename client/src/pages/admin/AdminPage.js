import React, { useState } from 'react'
import { Collapse } from 'antd'
import FormType from '../../components/formsAdmin/formType/FormType'
import FormInfo from '../../components/formsAdmin/formInfo/FormInfo'
import FormCategory from '../../components/formsAdmin/formCategory/FormCategory'
import FormProduct from '../../components/formsAdmin/formCreateProduct/FormProduct'
import FormInfoTitle from '../../components/formsAdmin/formInfoTitle/FormInfoTitle'
import Сharacteristic from '../../components/formsAdmin/formInfo/Сharacteristic'
import GetProductChange from '../../components/formsAdmin/formChangeProduct/GetProductChange'
import FormDeleteProduct from '../../components/formsAdmin/formDeleteProduct/FormDeleteProduct'
import GetOrderAdmin from '../../components/ordersAdmin/GetOrderAdmin'
import RenderingDataOrder from '../../components/ordersAdmin/RenderingDataOrder'
import ChangeStatusOrder from '../../components/changeStatus/ChangeStatusOrder'


const { Panel } = Collapse

const AdminPage = () => {
	const [dataOrder, setDataOrder] = useState([])


	return (
		<section className='pb-28'>
			<div className='container'>
				<p className='text-2xl mt-8 mb-8'>Страница администратора</p>
				<Collapse accordion bordered={false}>
					<Panel header="Добавить / Удалить категорию боксов" key="1" className='p-2'>
						<FormCategory />
					</Panel>

					<Panel header="Добавить / Удалить тип боксов" key="2" className='p-2'>
						<FormType />
					</Panel>

					<Panel header="Добавить / Удалить заголовок характеристик" key="3" className='p-2'>
						<FormInfoTitle />
					</Panel>

					<Panel header="Добавить характеристики" key="4" className='p-2'>
						<Сharacteristic />
					</Panel>

					<Panel header="Добавить товар" key="5" className='p-2'>
						<FormProduct />
					</Panel>

					<Panel header="Изменить товар" key="6" className='p-2'>
						<GetProductChange />
					</Panel>

					<Panel header="Удалить товар" key="7" className='p-2'>
						<FormDeleteProduct />
					</Panel>


					<Panel header="Заказы" key="8" className='p-2'>
						<GetOrderAdmin setDataOrder={setDataOrder} />
						<RenderingDataOrder dataOrder={dataOrder} />
					</Panel>

					<Panel header="Изменить статус заказа" key="9" className='p-2'>
						<ChangeStatusOrder />
					</Panel>
				</Collapse>
			</div>
		</section >
	)
}

export default AdminPage