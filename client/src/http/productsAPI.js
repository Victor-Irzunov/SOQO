import { $host } from "./index"


export const searchProducts = async (query = '') => {
	const { data } = await $host.get('api/poisk?q=' + query)
	return data
}

export const fetchProducts = async (page, limit = 10, categoryId, typeId, priceFrom, priceBefore) => {
	const { data } = await $host.get('api/product', {
		params: {
			page,
			limit,
			categoryId,
			typeId,
			priceFrom,
			priceBefore,
		}
	})
	return data
}
export const fetchOneProduct = async (id) => {
	const { data } = await $host.get('api/product/' + id)
	return data
}




export const fetchProductNoUser = async (arrId) => {
	const { data } = await $host.get('api/product/basket/nouser', { params: { arr: arrId } })
	return data
}

export const getNewProduct = async () => {
	const { data } = await $host.get('api/product/new')
	return data
}

export const getHitProduct = async () => {
	const { data } = await $host.get('api/product/hit')
	return data
}


export const fetchProductsPohozhie = async ({groupId, id}) => {

	const { data } = await $host.get('api/product/pohozhie', {
		params: {
			groupId, id
		}
	})
	return data
}


export const fetchType = async () => {
	const { data } = await $host.get('api/type',)
	return data
}

export const fetchInfo = async () => {
	const { data } = await $host.get('api/info',)
	return data
}
export const fetchCategory = async () => {
	const { data } = await $host.get('api/category',)
	return data
}

export const fetchInfoTitle = async () => {
	const { data } = await $host.get('api/infotitle',)
	return data
}

export const categoryType = async () => {
	const { data } = await $host.get('api/categorytype',)
	return data
}
export const getAllProductOneType = async (id) => {
	const { data } = await $host.get('api/product/one/type/'+ id)
	return data
}








