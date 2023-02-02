import { $host } from "./index"

export const getAllStocks = async () => {
	const { data } = await $host.get('api/stocks')
	return data
}