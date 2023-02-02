import { $host } from "./index"

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