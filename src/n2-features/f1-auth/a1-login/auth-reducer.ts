import {Dispatch} from 'redux';
import {API} from '../../../n1-main/m3-dal/api';

//types
type ActionsType = ReturnType<typeof setLoginData>
    | ReturnType<typeof setIsLoggedIn>
    | ReturnType<typeof setLoginError>

type UserDataType = {
    email: string | null,
    _id: string | null,
    avatar: string | null,
    name: string | null,
    publicCardPacksCount: number
}

type InitialStateType = { userData: UserDataType, isLoggedIn: boolean, loginError: null | string }


const initialState = {
    userData: {
        email: null,
        _id: null,
        avatar: null,
        name: null,
        publicCardPacksCount: 0,
    },
    isLoggedIn: false,
    loginError: null
}


export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'auth/SET-USER-DATA': {
            return {...state, ...action.data}
        }
        case 'auth/SET-IS-LOGGED-IN': {
            return {...state, isLoggedIn: action.isLoggedIn}
        }
        case 'auth/SET-LOGIN-ERROR': {
            return {...state, loginError: action.loginError}
        }
        default:
            return state
    }
}

//actions
export const setLoginData = (data: UserDataType) => ({type: 'auth/SET-USER-DATA', data} as const)
export const setIsLoggedIn = (isLoggedIn: boolean) => ({type: 'auth/SET-IS-LOGGED-IN', isLoggedIn} as const)
export const setLoginError = (loginError: string) => ({type: 'auth/SET-LOGIN-ERROR', loginError} as const)

//thunks
export const loginTC = (email: string, password: string, rememberMe: boolean) => (dispatch: Dispatch<ActionsType>) => {
    API.login(email, password, rememberMe)
        .then(response => {
            const {email, _id, avatar, name, publicCardPacksCount} = response;
            dispatch(setLoginData({email, _id, avatar, name, publicCardPacksCount}));
            dispatch(setIsLoggedIn(true));
        })
        .catch(e => {
            const error = e.response ? e.response.data.error : (e.message + ', more details in the console')
            dispatch(setLoginError(error));
        })
}