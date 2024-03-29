import { $authHost,$host } from "./index"

export const createProduct = async (product) => {
	const { data } = await $authHost.post('api/product', product)
	return data
}
export const updateOneProduct = async (id, product) => {
	const { data } = await $authHost.put('api/product/' + id, product)
	return data
}
export const deleteOneProduct = async (id) => {
	const { data } = await $authHost.delete('api/product/' + id)
	return data
}


export const createType = async (obj) => {
	const { data } = await $authHost.post('api/type', obj)
	return data
}
export const deleteeType = async id => {
	const { data } = await $authHost.delete('api/type/' + id)
	return data
}
export const changeType = async (obj) => {
	const { data } = await $authHost.put('api/type', obj)
	return data
}
export const getOneType = async (id) => {
	const { data } = await $host.get('api/type/'+ id)
	return data
}



export const createInfoTitle = async type => {
	const { data } = await $authHost.post('api/infotitle', type)
	return data
}
export const deleteeInfoTitle = async id => {
	const { data } = await $authHost.delete('api/infotitle/' + id)
	return data
}
export const createInfo = async arr => {
	const { data } = await $authHost.post('api/info', arr)
	return data
}
export const deleteInfo = async id => {
	const { data } = await $authHost.delete('api/info/' + id)
	return data
}
export const addOneContentToArrInfo = async (obj) => {
	const { data } = await $authHost.post('api/info/add', obj)
	return data
}
export const createCategory = async arr => {
	const { data } = await $authHost.post('api/category', arr)
	return data
}
export const deleteCategory = async id => {
	const { data } = await $authHost.delete('api/category/' + id)
	return data
}
export const getDateOrders = async (date) => {
	const { data } = await $authHost.get('api/order/date', {
		params: {
			date
		}
	})
	return data
}
export const changeStatusOrder = async ({ id, status }) => {
	const { data } = await $authHost.get('api/order/change/status', {
		params: {
			id, status
		}
	})
	return data
}
export const getOneOrder = async (id) => {
	const { data } = await $authHost.get('api/order/' + id)
	return data
}
export const getDateOrdersCourier = async (date) => {
	const { data } = await $authHost.get('api/order/courier/date', {
		params: {
			date
		}
	})
	return data
}
export const changeStatusOrderCourier = async ({ id, status }) => {
	const { data } = await $authHost.get('api/order/courier/change/status', {
		params: {
			id, status
		}
	})
	return data
}
export const getOneOrderCourier = async (id) => {
	const { data } = await $authHost.get('api/order/courier/' + id)
	return data
}
export const createSliderImg = async (obj) => {
	const { data } = await $authHost.post('api/img', obj)
	return data
}
export const deleteSliderImg = async ( obj ) => {
	const { data } = await $authHost.put('api/img', obj)
	return data
}
export const createInfoPage = async ( obj ) => {
	const { data } = await $authHost.post('api/info/page', obj)
	return data
}
export const changeInfoPage = async ( obj ) => {
	const { data } = await $authHost.put('api/info/page', obj)
	return data
}
export const deleteOneInfoPage = async ( id ) => {
	const { data } = await $authHost.delete('api/info/page/'+ id)
	return data
}

export const createStocks = async (obj) => {
	const { data } = await $authHost.post('api/stocks', obj)
	return data
}
export const getOneStock = async ({id}) => {
	const { data } = await $authHost.get('api/stocks/'+ id)
	return data
}
export const changeStock = async (obj) => {
	const { data } = await $authHost.put('api/stocks', obj)
	return data
}
export const deleteOneStock = async (id) => {
	const { data } = await $authHost.delete('api/stocks/'+ id)
	return data
}

export const addImgBannerPage = async (obj) => {
	const { data } = await $authHost.post('api/img/banner', obj)
	return data
}

export const createUniqueContent = async (obj) => {
	const { data } = await $authHost.post('api/unique/content', obj)
	return data
}
export const getOneUniqueContent = async ({ categoryId, typeId }) => {
	const { data } = await $host.get('api/unique/content', {
		params: {
			categoryId,
			typeId
		}
	})
	return data
}
export const getOneUniqueContentById = async (id) => {
	const { data } = await $host.get('api/unique/content/' + id )
	return data
}
export const changeOneUniqueContent = async (obj) => {
	const { data } = await $authHost.put('api/unique/content', obj )
	return data
}
export const deleteOneUniqueContent = async (id) => {
	const { data } = await $authHost.delete('api/unique/content/'+  id )
	return data
}
