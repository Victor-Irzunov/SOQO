import React, { useState } from 'react'
import { Collapse, BackTop } from 'antd'
import {
	PictureOutlined, ScheduleOutlined,
	DollarCircleOutlined, DeleteOutlined,
	FormOutlined, AppstoreAddOutlined,
	BarsOutlined, ProfileOutlined,
	PartitionOutlined, ApartmentOutlined,
	CloseSquareOutlined, InfoCircleOutlined,
	EditOutlined, CloseOutlined, PercentageOutlined,
	FileImageOutlined,
} from '@ant-design/icons'
import FormType from '../../components/formsAdmin/formType/FormType'
import FormCategory from '../../components/formsAdmin/formCategory/FormCategory'
import FormProduct from '../../components/formsAdmin/formCreateProduct/FormProduct'
import FormInfoTitle from '../../components/formsAdmin/formInfoTitle/FormInfoTitle'
import –°haracteristic from '../../components/formsAdmin/formInfo/–°haracteristic'
import GetProductChange from '../../components/formsAdmin/formChangeProduct/GetProductChange'
import FormDeleteProduct from '../../components/formsAdmin/formDeleteProduct/FormDeleteProduct'
import ChangeStatusOrder from '../../components/changeStatus/ChangeStatusOrder'
import FormSliderImg from '../../components/formsAdmin/formSliderImg/FormSliderImg'
import FormDelSliderOneImg from '../../components/formsAdmin/formSliderImg/formDelSliderOneImg/FormDelSliderOneImg'
import GetOrderAdmin from '../../components/formsAdmin/formOrdersAdmin/GetOrderAdmin'
import RenderingDataOrder from '../../components/formsAdmin/formOrdersAdmin/RenderingDataOrder'
import FormInfoPages from '../../components/formsAdmin/formInfoPages/FormInfoPages'
import FomrGetOneInfoPage from '../../components/formsAdmin/formInfoPages/changeInfoPage/FomrGetOneInfoPage'
import { Helmet } from "react-helmet"
import FormDeleteGroup from '../../components/formsAdmin/formDeleteGroup/FormDeleteGroup'
import FormStocksPages from '../../components/formsAdmin/formStocksPages/FormStocksPages'
import FomrGetOneStocksPage from '../../components/formsAdmin/formStocksPages/changeStocksPage/FomrGetOneStocksPage'
import FormBannerImgPage from '../../components/formsAdmin/formBannerImgPage/FormBannerImgPage'
import FormDeleteBannerPage from '../../components/formsAdmin/formBannerImgPage/formDeleteBannerPage/FormDeleteBannerPage'
const { Panel } = Collapse
const AdminPage = () => {
	const [dataOrder, setDataOrder] = useState([])
	return (
		<section className='pb-28'>
			<Helmet>
				<title>–°—ā—Ä–į–Ĺ–ł—Ü–į –į–ī–ľ–ł–Ĺ–ł—Ā—ā—Ä–į—ā–ĺ—Ä–į</title>
				<meta name="description" content='–°—ā—Ä–į–Ĺ–ł—Ü–į –į–ī–ľ–ł–Ĺ–ł—Ā—ā—Ä–į—ā–ĺ—Ä–į' />
			</Helmet>
			<div className='container'>
				<BackTop />
				<p className='text-2xl mt-8 mb-8'>–°—ā—Ä–į–Ĺ–ł—Ü–į –į–ī–ľ–ł–Ĺ–ł—Ā—ā—Ä–į—ā–ĺ—Ä–į</p>
				<Collapse accordion bordered={false}>
					<Panel header="–Ē–ĺ–Ī–į–≤–ł—ā—Ć / –£–ī–į–Ľ–ł—ā—Ć –ļ–į—ā–Ķ–≥–ĺ—Ä–ł—é —ā–ĺ–≤–į—Ä–į" extra={<ApartmentOutlined className='text-xl text-rose-600 ml-1' />} key="1" className='p-2'>
						<FormCategory />
					</Panel>

					<Panel header="–Ē–ĺ–Ī–į–≤–ł—ā—Ć / –£–ī–į–Ľ–ł—ā—Ć —ā–ł–Ņ —ā–ĺ–≤–į—Ä–į" extra={<PartitionOutlined className='text-xl text-fuchsia-700 ml-1' />} key="2" className='p-2'>
						<FormType />
					</Panel>

					<Panel header="–Ē–ĺ–Ī–į–≤–ł—ā—Ć / –£–ī–į–Ľ–ł—ā—Ć –∑–į–≥–ĺ–Ľ–ĺ–≤–ĺ–ļ —Ö–į—Ä–į–ļ—ā–Ķ—Ä–ł—Ā—ā–ł–ļ" extra={<ProfileOutlined className='text-xl text-cyan-700 ml-1' />} key="3" className='p-2'>
						<FormInfoTitle />
					</Panel>

					<Panel header="–Ē–ĺ–Ī–į–≤–ł—ā—Ć —Ö–į—Ä–į–ļ—ā–Ķ—Ä–ł—Ā—ā–ł–ļ–ł" extra={<BarsOutlined className='text-xl text-cyan-600 ml-1' />} key="4" className='p-2'>
						<–°haracteristic />
					</Panel>

					<Panel header="–Ē–ĺ–Ī–į–≤–ł—ā—Ć —ā–ĺ–≤–į—Ä" extra={<AppstoreAddOutlined className='text-xl text-pink-500 ml-1' />} key="5" className='p-2'>
						<FormProduct />
					</Panel>

					<Panel header="–ė–∑–ľ–Ķ–Ĺ–ł—ā—Ć —ā–ĺ–≤–į—Ä" extra={<FormOutlined className='text-xl text-purple-600 ml-1' />} key="6" className='p-2'>
						<GetProductChange />
					</Panel>

					<Panel header="–£–ī–į–Ľ–ł—ā—Ć —ā–ĺ–≤–į—Ä" extra={<DeleteOutlined className='text-xl text-red-500 ml-1' />} key="7" className='p-2'>
						<FormDeleteProduct />
					</Panel>

					<Panel header="–£–ī–į–Ľ–ł—ā—Ć –≥—Ä—É–Ņ–Ņ—É" extra={<CloseOutlined className='text-xl text-red-500 ml-1' />} key="8" className='p-2'>
						<FormDeleteGroup />
					</Panel>


					<Panel header="–ó–į–ļ–į–∑—č" extra={<DollarCircleOutlined className='text-xl text-orange-400 ml-1' />} key="9" className='p-2'>
						<GetOrderAdmin setDataOrder={setDataOrder} />
						<RenderingDataOrder dataOrder={dataOrder} />
					</Panel>

					<Panel header="–ė–∑–ľ–Ķ–Ĺ–ł—ā—Ć —Ā—ā–į—ā—É—Ā –∑–į–ļ–į–∑–į" extra={<ScheduleOutlined className='text-xl text-green-500 ml-1' />} key="10" className='p-2'>
						<ChangeStatusOrder />
					</Panel>
					{/* <p className='mt-4 text-xl font-semibold'>–Ď–į–Ĺ–Ķ—Ä</p> */}
					<Panel header='–Ē–ĺ–Ī–į–≤–ł—ā—Ć –Ī–į–Ĺ–Ķ—Ä —Ā–Ľ–į–Ļ–ī–Ķ—Ä–į –Ĺ–į –≥–Ľ–į–≤–Ĺ–ĺ–Ļ —Ā—ā—Ä–į–Ĺ–ł—Ü–Ķ' extra={<PictureOutlined className='text-xl text-blue-500 ml-1' />} key="11" className='p-2'>
						<FormSliderImg />
					</Panel>

					<Panel header='–£–ī–į–Ľ–ł—ā—Ć –Ī–į–Ĺ–Ķ—Ä —Ā–Ľ–į–Ļ–ī–Ķ—Ä–į –Ĺ–į –≥–Ľ–į–≤–Ĺ–ĺ–Ļ —Ā—ā—Ä–į–Ĺ–ł—Ü–Ķ' extra={<CloseSquareOutlined className='text-xl text-red-500 ml-1' />} key="12" className='p-2'>
						<FormDelSliderOneImg />
					</Panel>

					<Panel header='–Ē–ĺ–Ī–į–≤–ł—ā—Ć —Ā—ā—Ä–į–Ĺ–ł—Ü—É —Ā –ł–Ĺ—Ą–ĺ—Ä–ľ–į—Ü–ł–Ķ–Ļ' extra={<InfoCircleOutlined className='text-xl text-lime-500 ml-1' />} key="13" className='p-2'>
						<FormInfoPages />
					</Panel>
					<Panel header='–ė–∑–ľ–Ķ–Ĺ–ł—ā—Ć / —É–ī–į–Ľ–ł—ā—Ć —Ā—ā—Ä–į–Ĺ–ł—Ü—É —Ā –ł–Ĺ—Ą–ĺ—Ä–ľ–į—Ü–ł–Ķ–Ļ' extra={<EditOutlined className='text-xl text-lime-500 ml-1' />} key="14" className='p-2'>
						<FomrGetOneInfoPage />
					</Panel>
					<Panel header='–Ē–ĺ–Ī–į–≤–ł—ā—Ć –į–ļ—Ü–ł—é' extra={<PercentageOutlined className='text-xl text-blue-800 ml-1' />} key="15" className='p-2'>
						<FormStocksPages />
					</Panel>
					<Panel header='–ė–∑–ľ–Ķ–Ĺ–ł—ā—Ć / —É–ī–į–Ľ–ł—ā—Ć –į–ļ—Ü–ł—é' extra={<DeleteOutlined className='text-xl text-pink-700 ml-1' />} key="16" className='p-2'>
						<FomrGetOneStocksPage />
					</Panel>
					<Panel header='–Ē–ĺ–Ī–į–≤–ł—ā—Ć –Ī–į–Ĺ–Ķ—Ä –Ĺ–į —Ā—ā—Ä–į–Ĺ–ł—Ü—É –ļ–į—ā–Ķ–≥–ĺ—Ä–ł–ł' extra={<FileImageOutlined className='text-xl text-orange-500 ml-1' />} key="17" className='p-2'>
						<FormBannerImgPage />
					</Panel>
					<Panel header='–£–ī–į–Ľ–ł—ā—Ć –Ī–į–Ĺ–Ķ—Ä –ļ–į—ā–Ķ–≥–ĺ—Ä–ł–ł –ł–Ľ–ł –Ņ–ĺ–ī–ļ–į—ā–Ķ–≥–ĺ—Ä–ł–ł' extra={<CloseSquareOutlined className='text-xl text-orange-500 ml-1' />} key="18" className='p-2'>
						<FormDeleteBannerPage />
					</Panel>
				</Collapse>
			</div>
		</section >
	)
}

export default AdminPage