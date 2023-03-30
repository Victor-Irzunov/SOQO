import { Col, InputNumber, Row, Slider, Form, Button, message } from 'antd'
import React from 'react'
import { CloseCircleOutlined } from '@ant-design/icons'
const style = {
	display: 'inline-block',
	height: 350,
	marginBottom: 20,
}
const marks = {
	5: '5',
	100: '100',
	200: '200',
	300: '300',
	600: '600',
	800: '800',
	1000: '1000',
	1200: '1200',
	1500: '1500',
	2000:'2000'
}
const FormPrice = (
	{ inputValueFrom, setInputValueFrom,
		inputValueBefore, setInputValueBefore,
		sendFormFilter, resetFilter,  onClose
	}
) => {
	const onChangeFrom = (newValue) => setInputValueFrom(newValue)
	const onChangeBefore = (value) => {
		if (isNaN(value)) return
		setInputValueBefore(value)
	}
	const onFinishFailed = (errorInfo) => {
		console.log('ошибка в отправке:', errorInfo);
	}
	const closeClickBtn = (num = 0) => {
		if (num === 1) {
			message.success('Фильтр сброшен')
		} else {
			message.success('Цена отфильтрована')
		}
		setTimeout(() => {
			onClose()
		},500)
	}
	return (
		<div>
			<Form
				onFinish={sendFormFilter}
				onFinishFailed={onFinishFailed}
			>
				<Row>
					<Col xl={12} sm={12}>
						<Row>
							<Col span={24} offset={2}>
								<span>от</span>
							</Col>
							<Col span={24} >
								<Form.Item name='from'>
									<div style={style}>
										<Slider
											vertical
											marks={marks}
											min={5}
											max={2000}
											step={5}
											
											onChange={onChangeFrom}
											value={typeof inputValueFrom === 'number' ? inputValueFrom : 0}
										/>
									</div>
								</Form.Item>
							</Col>
							<Col span={24}>
								<InputNumber
									min={5}
									max={2000}
									step={5}
									style={{
										margin: '0 5px 0 5px',
									}}
									value={inputValueFrom}
									onChange={onChangeFrom}
								/>
							</Col>
						</Row>
					</Col>
					<Col xl={12} sm={12}>
						<Row>
							<Col span={24} offset={2}>
								<span>до</span>
							</Col>
							<Col span={24} className='overflow-y-hidden'>
								<Form.Item name="before">
									<div style={style}>
										<Slider
											vertical
											marks={marks}
											min={inputValueFrom}
											max={2000}
											onChange={onChangeBefore}
											value={typeof inputValueBefore === 'number' ? inputValueBefore : 0}
											step={5}
										/>
									</div>
								</Form.Item>
							</Col>
							<Col span={24}>
								<InputNumber
									min={inputValueFrom}
									max={2000}
									step={5}
									value={inputValueBefore}
									onChange={onChangeBefore}
								/>
							</Col>
						</Row>
					</Col>
				</Row>
				<Form.Item
				>
					<Button
						type="primary"
						htmlType="submit"
						className='mt-5 ml-2'
						onClick={closeClickBtn}
					>
						Фильтровать
					</Button>
				</Form.Item>
			</Form>
			<Button
				type='text'
				onClick={() => {
					resetFilter()
					closeClickBtn(1)
				}}
				className='text-xs'
				icon={<CloseCircleOutlined />}
			>
				Сбросить фильтр
			</Button>
		</div>
	)
}
export default FormPrice