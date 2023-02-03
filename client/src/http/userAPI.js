import { $authHost, $host } from "./index"
import jwt_decode from "jwt-decode"

export const registration = async (login, password, password2) => {
    const { data } = await $host.post('api/user/registration', { login, password, password2,role: 'ADMIN' })  //., role: 'ADMIN' //role: 'COURIER'
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const login = async (login, password) => {
    const { data } = await $host.post('api/user/login', { login, password })
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const check = async () => {
    const { data } = await $authHost.get('api/user/auth')
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}


export const getMyAccount = async () => {
    const { data } = await $authHost.get('api/user/account')
    return data
}

export const resetPassword = async (login) => {
    const { data } = await $host.get('api/user/reset', {
        params: {
            login
        }
    })
    return data
}
export const newPassword = async (obj) => {
    const { data } = await $host.put('api/user/new/password', obj)
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}
