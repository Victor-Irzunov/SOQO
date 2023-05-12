import {
	Button,
	AutoComplete,
	Radio,
	Form,
	Input,
	DatePicker,
	Divider,
	message,
	Checkbox,
	Space,
} from 'antd'
import { Link } from 'react-router-dom'
import React, { useState, useContext } from 'react'
import InputMask from 'react-input-mask'
import { useCookieList } from '../../hooks/useCookieList'
import moment from 'moment'
import { Context } from '../../App'
import { orderUser } from '../../http/orderAPI'
import { deleteAllProductBasketUser } from '../../http/basketAPI'
import { useScreens } from '../../Constants/constants'
import { sendOrderTelegram } from '../../http/telegramAPI'
import { observer } from 'mobx-react-lite'
const { TextArea } = Input
const dateFormat = 'DD.MM.YYYY'
const disabledDate = (current) => {
	return current && current < moment()
}
const FormBasketOrder = observer(({ next, setPriceDostavki, }) => {
	const screens = useScreens()

	const { dataProducts, user, dataApp } = useContext(Context)
	const [autoCompleteResult, setAutoCompleteResult] = useState([])
	const [tel, setTel] = useState('')
	const [isActive, setIsActive] = useState(false)
	const [value, setValue] = useState('')
	const [textBtn, setTextBtn] = useState('Подтвердите заказ')
	const [isCheck, setIsCheck] = useState(false)
	const { deleteAllList } = useCookieList(null)
	const [form] = Form.useForm()


	const onFinish = (values) => {
		console.log('Success:', values)
		const formData = new FormData()
		formData.append('city', values.address_city)
		formData.append('street', values.address_street)
		formData.append('comment', values.comment)
		formData.append('date', values.date.$d.toLocaleDateString("ru-RU"))
		formData.append('dostavka', values.dostavka)
		formData.append('login', values.login)
		formData.append('oplata', values.oplata)
		formData.append('tel', values.tel)
		formData.append('time', values.time)
		formData.append('firstName', values.fitstName)
		formData.append('lastName', values.last_name)
		formData.append('otchestvo', values.otchestvo)
		formData.append('dataBasket', JSON.stringify([...dataProducts.sendData]))

		orderUser(formData)
			.then(data => {
				message.success('Заказ оформлен!')
				sendOrderTelegram(data)
				form.resetFields()
				if (!user.isAuth) {
					deleteAllList('BasketProduct', null)
				} else {
					deleteAllProductBasketUser(user.userData.id)
						.then(data => {
							dataApp.setBasketLength(0)
						})
				}
				next()
			})
	}
	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo)
		message.error('Заполните пожалуйста корректно форму')
	}
	const onWebsiteChange = (value) => {
		if (!value) {
			setAutoCompleteResult([]);
		} else {
			setAutoCompleteResult(['@gmail.com', '@tut.by', '@yandex.by', '@mail.ru'].map((domain) => `${value}${domain}`));
		}
	}
	const websiteOptions = autoCompleteResult.map((website) => ({
		label: website,
		value: website,
	}))
	const beforeMaskedValueChange = (newState, oldState, userInput) => {
		var { value } = newState
		var selection = newState.selection
		var cursorPosition = selection ? selection.start : null
		if (value.endsWith('-') && userInput !== '-' && !tel.endsWith('-')) {
			if (cursorPosition === value.length) {
				cursorPosition--
				selection = { start: cursorPosition, end: cursorPosition }
			}
			value = value.slice(0, -1)
		}
		return {
			value,
			selection
		}
	}

	const onChange = e => {

		if (e.target.value === 'Самовывоз из магазина') {
			setIsActive(false)
		} else {
			setIsActive(true)
		}


		if ((e.target.value === 'Самовывоз из магазина') || (e.target.value === 'Курьером в пределах МКАД')) {
			form.setFieldsValue({ address_city: 'Минск' })
		} else {
			form.setFieldsValue({ address_city: '' })
		}
		setValue(e.target.value)

		if (e.target.value === 'Курьером в пределах МКАД') {
			setPriceDostavki(5)
			dataApp.setTotalDostavki(5)
		} else if (e.target.value === 'Курьером 15 км от МКАД') {
			setPriceDostavki(15)
			dataApp.setTotalDostavki(15)
		} else {
			setPriceDostavki(0)
			dataApp.setTotalDostavki(0)
		}

	}

	const onChangeTextBtn = e => {
		if (e.target.value === 'Оплата картой онлайн' || e.target.value === 'Оплата через ЕРИП') {
			setTextBtn('Перейти к оплате')
		} else {
			setTextBtn('Подтвердите заказ')
		}
	}

	const onChangeCheck = (e) => {
		setIsCheck(e.target.checked)
	}
	return (
		<Form
			name="order"
			form={form}
			labelCol={{
				span: 7,
			}}
			wrapperCol={{
				span: 15,
			}}
			initialValues={{
				address_city: 'Минск',
				dostavka: "Самовывоз из магазина",
				login: user.isAuth && user.userData.login
			}}
			onFinish={onFinish}
			onFinishFailed={onFinishFailed}
			autoComplete="off"
		>
			<Divider
				orientation="left"
				className='mb-5 text-base'
			>
				Заказчик
			</Divider>

			<Form.Item
				label="Ваше имя"
				name="fitstName"
				rules={[
					{
						required: true,
						message: 'Пожалуйста введите Ваше имя!',
					},
				]}
			>
				<Input />
			</Form.Item>

			<Form.Item
				name="tel"
				label="Телефон"
				rules={[
					{
						required: true,
						message: 'Пожалуйста введите Ваш телефон!',
					},
				]}
			>
				<InputMask
					className='ant-input'
					value={tel}
					onChange={(e) => setTel(e.target.value)}
					mask="+3\7\5 99 999 99 99"
					maskChar={'-'}
					beforeMaskedValueChange={beforeMaskedValueChange}

					style={{
						width: '100%',
					}}
				/>
			</Form.Item>

			<Form.Item
				label="Почта"
				name="login"
				tooltip={user.isAuth ? "Почту можно изменить" : ''}
				hasFeedback
				rules={[
					{
						required: true,
						message: 'Пожалуйста введите почту!',
					},
					{
						type: 'email',
						message: 'Введите корректный email!',
					},
				]}
			>
				<AutoComplete
					options={websiteOptions}
					onChange={onWebsiteChange}
					placeholder="exemple@gmail.com"

				/>
			</Form.Item>

			<Divider
				orientation="left"
				className='mb-5 text-base'
			>
				Доставка
			</Divider>

			<Form.Item
				name="dostavka"
				rules={[{ required: true, message: 'Выберите самовывоз или доставка!' }]}
				wrapperCol={{
					offset: 2,
					span: 16,
				}}
			>
				<Radio.Group onChange={onChange} >
					<Radio value="Самовывоз из магазина" className='mb-3'>Самовывоз из магазина</Radio>
					<Radio value="Курьером в пределах МКАД" className='mb-3'>Курьером в пределах МКАД (5,00 руб)</Radio>
					<Radio value="Курьером 15 км от МКАД">Курьером 15 км от МКАД (15,00 руб)</Radio>
					<Radio value="Белпочта" className='mt-3'>Белпочта <span className='text-xs font-light text-gray-500'>(стоимость доставки оплачивает покупатель согласно тарифам РУП "Белпочта")</span></Radio>
					<Radio value="Европочта" className='mt-3'>Европочта <span className='text-xs font-light text-gray-500'>(стоимость доставки оплачивает покупатель согласно тарифам "Европочта")</span></Radio>
				</Radio.Group>
			</Form.Item>


			{
				isActive ?
					<>
						<Form.Item
							name="address_city"
							label="Город"
							rules={[
								{
									required: true,
									message: 'Пожалуйста введите Ваш город!',
								},
							]}
						>
							<Input />
						</Form.Item>

						<Form.Item
							label="Адрес"
							name="address_street"
							rules={[
								{
									required: true,
									message: 'Пожалуйста введите улицу!',
								},
							]}
						>
							<Input />
						</Form.Item>
					</>
					:
					undefined
			}


			{(value === 'Белпочта') || (value === 'Европочта') ?
				<>
					<Form.Item
						label="Фамилия"
						name="last_name"
						rules={[
							{
								required: true,
								message: 'Пожалуйста введите фамилию!',
							},
						]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						label="Отчество"
						name="otchestvo"
						rules={[
							{
								required: true,
								message: 'Пожалуйста введите отчество!',
							},
						]}
					>
						<Input />
					</Form.Item>
				</>
				:
				undefined
			}

			<Form.Item
				label="Выберите число"
				name="date"

				rules={[{ required: true, message: 'Выберите число для доставки!' }]}
			>
				<DatePicker
					format={dateFormat}
					disabledDate={disabledDate}
					style={{
						width: '100%',
					}}
				/>
			</Form.Item>


			<Form.Item
				label="Выберите время"
				name="time"
				rules={[{ required: true, message: 'Выберите время для доставки!' }]}
			>
				<Radio.Group>
					<Radio.Button value="10-14">10-14</Radio.Button>
					<Radio.Button value="14-18">14-18</Radio.Button>
					<Radio.Button value="18-22">18-22</Radio.Button>
				</Radio.Group>
			</Form.Item>


			<Divider
				orientation="left"
				className='mb-5 text-base'
			>
				Оплата
			</Divider>

			<Form.Item
				name="oplata"
				rules={[{ required: true, message: 'Выберите форму оплаты!' }]}
				wrapperCol={{
					offset: 4,
					span: 16,
				}}
			>
				<Radio.Group
					onChange={onChangeTextBtn}
				// value={value}
				>
					<Space direction="vertical" className='mb-10'>
						<Radio value={'Наличными при получении'}>Наличными при получении</Radio>
						<Radio value={'Банковской картой при получении'}>Банковской картой при получении</Radio>
						{/* <Radio value={'Оплата картой онлайн'}>Оплата картой онлайн</Radio>
						<Radio value={'Оплата через ЕРИП'}>Оплата через ЕРИП</Radio> */}
					</Space>
				</Radio.Group>
			</Form.Item>




			<Form.Item
				label="Комментарий к заказу"
				name="comment"
				wrapperCol={{
					span: 24,
				}}
				labelCol={{
					span: 24,
				}}
			>
				<TextArea
					autoSize allowClear
				/>
			</Form.Item>


			<div className={`mb-6 w-full flex flex-col items-end mt-20`}>
				{
					dataApp.totalDostavki ?
						<>
							<p className='text-sm'>Доставка:</p>
							<p className=''>{(dataApp.totalDostavki).toFixed(2)} BYN</p>
						</>
						:
						undefined
				}

				<p className='text-xl xs:text-lg xx:text-base mt-5 uppercase'>Итоговая стоимость:</p>
				<span className='text-2xl xs:text-xl xx:text-lg font-light'>{(dataApp.totalOrder).toFixed(2)}
					<span className='text-xl xs:text-lg font-light'>&nbsp;BYN</span>
				</span>
			</div>


			<Form.Item
				name="check"
				wrapperCol={{
					span: 24,
				}}
				labelCol={{
					span: 24,
				}}
			>
				<Checkbox onChange={onChangeCheck}>
					Я прочитал(-а) <Link to='/dogovor' className='text-blue-800'>Договор публичной оферты</Link> и согласен(-на) с условиями
				</Checkbox>
			</Form.Item>

			<Form.Item
				wrapperCol={{
					offset: 8
				}}

				className='mt-8'
			>
				<Button
					type="primary"
					size={screens.xs ? 'middle' : 'large'}
					htmlType="submit"
					disabled={!isCheck}
				>
					{textBtn}
				</Button>
			</Form.Item>
		</Form>
	)
})
export default FormBasketOrder