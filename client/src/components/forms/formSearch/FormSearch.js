import { Input } from 'antd'
import useDebounce from '../../../hooks/useDebounce'
import { searchProducts } from '../../../http/productsAPI'
import { observer } from 'mobx-react-lite'
import { Context } from '../../../App'
import React, { useState, useContext } from 'react'
import { useScreens } from '../../../Constants/constants'
import { useNavigate, createSearchParams } from 'react-router-dom'
const { Search } = Input



const FormSearch = observer(({ setIsBool, isAffix }) => {
	const { dataApp } = useContext(Context)
	const debouncedSearch = useDebounce(searchProducts, 1000)
	// const screens = useScreens()
	const [value, setValue] = useState('')
	const navigate = useNavigate();


	const onSearch = (value) => {
		debouncedSearch(value)
		navigate({
			pathname: '/poisk',
			search: `?${createSearchParams({ q: value })}`,
		})
		setValue('')
		dataApp.setIsSendSearchForm(true)
	}
	return (
		<Search
			placeholder='Поиск'
			value={value}
			onSearch={onSearch}
			onChange={(e) => setValue(e.target.value)}
			style={{
				width: '300px',
			}}
		/>
	)
})
export default FormSearch