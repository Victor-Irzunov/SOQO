import { Grid } from 'antd'

export const token = '6283241646:AAFqk1m07Vc-_1SFNVrroCNgNlzO3A0rtKo'
export const chat_id = '-1001825552885'
export const uri_api = `https://api.telegram.org/bot${token}/sendMessage`

const { useBreakpoint } = Grid
export const useScreens = () => {
	return useBreakpoint()
}