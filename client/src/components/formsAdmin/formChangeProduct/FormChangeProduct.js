import React, { useEffect, useState } from 'react'
import {
	Button, InputNumber,
	Form, Input, Radio,
	message,
	Tooltip,
	Image,
	Checkbox,
	Empty,
	Divider, Alert,
	Affix,
} from 'antd'
import DragableComp from '../../upload/DragableComp'
import {
	fetchCategory,
	fetchType,
	fetchInfo,
} from '../../../http/productsAPI'
import { InfoCircleOutlined, CopyOutlined } from '@ant-design/icons'
import { updateOneProduct } from '../../../http/adminAPI'
import CyrillicToTranslit from 'cyrillic-to-translit-js'


import Resizer from "react-image-file-resizer"
const resizeFile = (file, size, size2) =>
	new Promise((resolve) => {
		Resizer.imageFileResizer(
			file,
			size,
			size2,
			"WEBP",
			75,
			0,
			(uri) => {
				resolve(uri)
			},
			"file",
		)
	})

const { TextArea } = Input


const FormChangeProduct = ({ product, setProduct }) => {
	const [form] = Form.useForm()
	const [dataInfo, setDataInfo] = useState([])
	const [dataCategory, setDataCategory] = useState([])
	const [dataType, setDataType] = useState([])
	const [fileList, setFileList] = useState([])
	const [group, setGroup] = useState(2)
	const [groupId, setGroupId] = useState(null)
	const [title, setTitle] = useState('')
	const cyrillicToTranslit = new CyrillicToTranslit()

	useEffect(() => {
		fetchInfo()
			.then(data => {
				setDataInfo(data)
			})
			.catch(err => {
				message.error(err.message)
			})
		fetchCategory()
			.then(data => {
				setDataCategory(data)
			})
			.catch(err => {
				message.error(err.message)
			})
		fetchType()
			.then(data => {
				setDataType(data)
			})
			.catch(err => {
				message.error(err.message)
			})
	}, [])

	const onFinish = async values => {
		console.log('Success:', values)

		const arrInfo = []
		const keys = Object.keys(values.info)
		keys.forEach(el => {
			if (values.info[el].content) {
				arrInfo.push(
					{
						title: el,
						description: values.info[el].content,
						titleInfoId: values.info[el].id,
						id: values.info[el].infoId,
						productId: product.id
					})
			}
		})

		const formData = new FormData()
		formData.append('info', JSON.stringify(arrInfo))
		formData.append('category', values.category)
		formData.append('count', values.count)
		formData.append('description', values.description)
		formData.append('discountPercentage', values.discountPercentage || 0)
		formData.append('name', values.name)
		formData.append('nameLink', cyrillicToTranslit.transform(values.name.split(' ').join('-')))
		formData.append('price', values.price)
		formData.append('type', values.type)
		formData.append('newProd', values.newProd)
		formData.append('groupCreate', values.groupCreate)
		formData.append('group', values.group)
		formData.append('ucenka', values.ucenka)
		formData.append('stock', values.stock)
		formData.append('hit', values.hit)
		formData.append('description_big', values.description_big)
		// formData.append('garanitiya', values.garanitiya)

		for (let k in fileList) {
			const pic = await resizeFile(fileList[k].originFileObj, 1000, 600)
			formData.append('img', pic)
		}
		for (let k in fileList) {
			formData.append('imgMini', await resizeFile(fileList[k].originFileObj, 250, 250))
		}


		updateOneProduct(product.id, formData)
			.then(data => {
				// console.log('💊data: ', data)
				message.success(data.message)
				form.resetFields()
				setProduct({})
			})
			.catch(data => {
				message.error(data.response.data.message)
			})
	}
	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	}
	const copyFunction = () => {
		navigator.clipboard.writeText(title)
			.then(() => {
				if (title) message.success(`Вы скопировали: ${title}`)
				else message.warning('Введите полное название для копирования!')
			})
			.catch(err => console.log('err: ', err))
	}
	const groupNumber = num => {
		setGroup(num.target.value)
	}
	let obj = {}
	if (Object.keys(product).length) {
		product.info.forEach(el => {
			obj[el.title] = { 'content': el.description, 'infoId': el.id }
		})
	}

	return (
		<>
			<Form
				name="product"
				form={form}
				labelCol={{
					span: 4,
				}}
				wrapperCol={{
					span: 20,
				}}
				initialValues={{
					newProd: product.new,
					group: product.groupId,
					groupCreate: 2,
					category: product.categoryId,
					type: product.typeId,
					name: product.name,
					description: product.description,
					price: product.price,
					count: product.count,
					discountPercentage: product.discountPercentage,
					info: obj,
					ucenka: product.ucenka,
					stock: product.stock,
					hit: product.hit,
					description_big: product.description_big
					// garanitiya: product.garanitiya
				}}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				autoComplete="off"
			>
				<Form.Item
					name="groupCreate"
				// rules={[{
				// 	required: true,
				// 	message: 'Выберите!',
				// },]}
				>
					<Radio.Group size='small' onChange={groupNumber}>
						<Radio.Button className='mr-1' value={1}>Создать группу</Radio.Button>
						<Radio.Button className='mr-1' value={2}>Изменить группу</Radio.Button>
						<Radio.Button className='mr-1' value={0}>Удалить группу</Radio.Button>
					</Radio.Group>
				</Form.Item>

				{
					group === 2 &&
					<Form.Item
						name="group"
						label='Введите номер группы'
						// rules={[{
						// 	required: true,
						// 	message: 'Введите номер группы!',
						// },]}
					>
						<InputNumber />
					</Form.Item>
				}

				<Form.Item
					label="Категория"
					name="category"
					hasFeedback
					rules={[{
						required: true,
						message: 'Выберите категорию!',
					},]}
				>
					{
						dataCategory.length > 0 ?
							<Radio.Group buttonStyle="solid">
								{dataCategory.map(el => {
									return (<Radio.Button key={el.id} className='mr-1 mb-1' value={el.id}>{el.name}</Radio.Button>)
								})}
							</Radio.Group>
							:
							<Empty />
					}

				</Form.Item>

				<Form.Item
					label="Тип"
					name="type"
					hasFeedback
					rules={[{
						required: true,
						message: 'Выберите тип!',
					},]}
				>
					{
						dataType.length > 0 ?
							<Radio.Group buttonStyle="solid">
								{dataType.map(el => {
									return (<Radio.Button
										key={el.id}
										value={el.id}
										className='mr-1 mb-1'
									// onClick={() => fu(el.name, 1)}
									>
										{el.name}
									</Radio.Button>)
								})}
							</Radio.Group>
							:
							<Empty />
					}

				</Form.Item>

				<Form.Item
					label="Название"
					name="name"

					rules={[{
						required: true,
						message: 'Введите название!',
					},]}
				>
					<Input
						allowClear
						onBlur={e => {
							// requestTitle(e)
							setTitle(e.target.value)
						}}
						addonAfter={<Tooltip title="скопировать название">
							<span
								onClick={copyFunction}
							>
								<CopyOutlined />
							</span>
						</Tooltip>}
						suffix={
							<Tooltip title="Название">
								<InfoCircleOutlined
									style={{
										color: 'rgba(0,0,0,.45)',
									}}
								/>
							</Tooltip>
						}
					/>
				</Form.Item>

				<Form.Item
					label="Описание товара мал."
					name="description"
					rules={[{
						required: true,
						message: 'Введите описание!'
					},]}
				>
					<TextArea
						autoSize allowClear showCount
					/>
				</Form.Item>

				<Form.Item
					label="Описание товара большое."
					name="description_big"
					rules={[{
						required: true,
						message: 'Введите описание!'
					},]}
				>
					<TextArea
						autoSize={{
							minRows: 4,
						}}
						allowClear
						showCount
					/>
				</Form.Item>
				{/* <Form.Item
					label="Гарантия"
					name="garanitiya"
				>
					<InputNumber
					/>
				</Form.Item> */}

				<Form.Item
					label="Цена"
					name="price"
					rules={[
						{
							required: true,
							message: 'Введите цену!',
						},
					]}
				>
					<InputNumber addonAfter="руб." />
				</Form.Item>

				<Form.Item
					label="Процент скидки"
					name="discountPercentage"
				>
					<InputNumber
						addonAfter="%"
					/>
				</Form.Item>

				<Form.Item
					label="Количество"
					name="count"
					rules={[
						{
							required: true,
							message: 'Введите количество!',
						},
					]}
				>
					<InputNumber addonAfter="шт." />
				</Form.Item>

				<Divider />
				<div className='flex flex-wrap mb-6'>
					{JSON.parse(product.img).map((el, idx) => {
						return (
							<div className='mr-1' key={idx}>
								<Image preview={false}
									src={process.env.REACT_APP_API_URL + el.image}
									className=''
									width={70}
								/>
							</div>
						)
					})}
				</div>

				<Form.Item
					label="Изменить фото"
					name="img"
					valuePropName='img'
				// extra=''
				// rules={[{
				// 	required: true,
				// 	message: 'Добавьте картинки!',
				// },]}
				>



					<DragableComp fileList={fileList} setFileList={setFileList} />
				</Form.Item>

				<Form.Item
					label="Описание"
					name='info'
					tooltip="Необходимо"
				>
					{
						dataInfo.length > 0 ?
							dataInfo.map(el => {
								return (
									<div className='mb-3 mt-1.5' key={el.id}>
										<Form.Item
											name={['info', `${el.name}`, 'id']}
											hidden={true}
											initialValue={el.infoTitle ? el.infoTitle.id : ''}
										>
											<Input value={el.infoTitle ? el.infoTitle.id : ''} />
										</Form.Item>
										<Form.Item
											name={['info', `${el.name}`, 'infoId']}
											hidden={true}
										>
											<Input />
										</Form.Item>
										<p className='font-semibold'>{el.name}</p>
										<Form.Item
											name={['info', `${el.name}`, 'content']}
											noStyle
										// rules={[
										// 	{
										// 		required: true,
										// 		message: 'Выберите характеристику',
										// 	},
										// ]}
										>
											<Radio.Group buttonStyle="solid">
												{el.content.map((item, idx) => {
													return (<Radio.Button key={idx} className='mb-1 mr-1' value={item}>{item}</Radio.Button>)
												})}
											</Radio.Group>
										</Form.Item>
									</div>
								)
							})

							:
							<Empty />
					}
				</Form.Item>

				<Form.Item
					name="newProd"
					valuePropName="checked"
					wrapperCol={{
						offset: 4,
						span: 8,
					}}
				>
					<Checkbox>Новый товар</Checkbox>
				</Form.Item>
				<Form.Item
					name="ucenka"
					valuePropName="checked"
					wrapperCol={{
						offset: 4,
						span: 8,
					}}
				>
					<Checkbox>Уценка</Checkbox>
				</Form.Item>
				<Form.Item
					name="hit"
					valuePropName="checked"
					wrapperCol={{
						offset: 4,
						span: 8,
					}}
				>
					<Checkbox>Хит продаж</Checkbox>
				</Form.Item>

				<Form.Item
					name="stock"
					valuePropName="checked"
					wrapperCol={{
						offset: 4,
						span: 8,
					}}
				>
					<Checkbox>Акция</Checkbox>
				</Form.Item>


				<Form.Item
					wrapperCol={{
						offset: 16,
						span: 8,
					}}
				>
					<Button type="primary" htmlType="submit">
						Сохранить
					</Button>
				</Form.Item>
			</Form>
			{
				groupId &&
				<Affix offsetBottom={0}>
					<Alert
						message={`Добавлен бокс, группа:${groupId}`}
						type="info" showIcon banner closable
						onClose={() => setGroupId(null)}
					/>
				</Affix>
			}

		</>
	)
}
export default FormChangeProduct