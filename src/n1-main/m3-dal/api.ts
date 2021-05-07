import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:7542/2.0/',
    withCredentials: true,
})

//types
type LoginResponseType = {
    _id: string
    email: string
    rememberMe: boolean,
    isAdmin: boolean,
    name: string
    verified: boolean,
    publicCardPacksCount: number
    created: string
    updated: string
    __v: number
    token: string
    tokenDeathTime: number
    avatar: string
    error?: string
}

type RegisterResponseType = {
    error?: string
    email?: string
    in?: string
    isEmailValid?: boolean
    isPassValid?: boolean
    emailRegExp?: {},
    passwordRegExp?: string
    addedUser: AddedUserType
}

type ChangeProfileResponseType = {
    updatedUser: LoginResponseType
    error?: string
    token: string
    tokenDeathTime: number
}

//не поняла, почему его не надо типизировать, если он приходит...
type AddedUserType = {
    _id: string
    email: string
    rememberMe: boolean
    isAdmin: boolean
    name: string
    verified: boolean
    publicCardPacksCount: number
    created: string
    updated: string
    __v: number
}

const forgotMessage = `<div style="font-size: 1.2em; font-family: Calibri,sans-serif">For password recovery click: <a href='http://localhost:3000/#/enter_new_password$token$'>here</a></div>`


export const API = {
    login(email: string, password: string, rememberMe: boolean) {
        return instance.post<LoginResponseType>('auth/login', {email, password, rememberMe})
            .then(response => response.data)
    },
    register(email: string, password: string,) {
        return instance.post<RegisterResponseType>('auth/register', {email, password})
            .then(response => response.data)
    },
    authMe() {
        return instance.post<LoginResponseType>('auth/me', {})
            .then(response => response.data)
    },
    changeProfile(name?: string, avatar?: string) {
        return instance.put<ChangeProfileResponseType>('auth/me', {name, avatar})
            .then(response => response.data.updatedUser)
    },
    logout() {
        return instance.delete<{ info: string, error?: string }>('auth/me')
            .then(response => response.data)
    },
    forgotPassword(email: string, from: string = 'test-front-dev <shishkina_veronika_10@mail.ru>', message: string = forgotMessage) {
        return instance.post<{ info: string, error?: string }>('auth/forgot', {email, from, message})
            .then(response => response.data)
    },
    setNewPassword(password: string, resetPasswordToken: string) {
        return instance.post<{ info: string, error?: string }>('auth/set-new-password', {password, resetPasswordToken})
            .then(response => response.data)
    }
}