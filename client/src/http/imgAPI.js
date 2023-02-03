import { $host, $authHost } from "./index"

export const getSliderImg = async () => {
	const { data } = await $host.get('api/img')
	return data
}
export const getImgBannerPage = async ({ categoryId, typeId }) => {
	const { data } = await $host.get('api/img/banner', {
		params: {
			categoryId, typeId
		}
	})
	return data
}
export const getAllBannerPage = async () => {
	const { data } = await $host.get('api/img/banner/all')
	return data
}
export const deleteOneBannerPage = async (obj) => {
	const { data } = await $authHost.put('api/img/banner', obj)
	return data
}
