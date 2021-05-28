import {instance} from './api';

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

const forgotMessage = `<div style="font-size: 1.2em; font-family: Calibri,sans-serif">` +
    `For password recovery click: <a href='https://neko-back.herokuapp.com/2.0/#/enter_new_password$token$'>here</a></div>`


export const authAPI = {
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
    changeProfile(name: string, avatar: string) {
        return instance.put<ChangeProfileResponseType>('auth/me', {name, avatar})
            .then(response => {
                return response.data.updatedUser
            })
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