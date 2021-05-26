import {setAppStatusAC} from '../../../n1-main/m1-ui/app-reducer';
import {AppThunkType} from '../../../n1-main/m2-bll/store';
import {authAPI} from '../../../n1-main/m3-dal/authAPI';

//types
export type AuthReducerActionType = ReturnType<typeof setLoginData>
    | SetIsLoggedInActionType
    | SetLoginErrorActionType

export type SetIsLoggedInActionType = ReturnType<typeof setIsLoggedIn>
export type SetLoginErrorActionType = ReturnType<typeof setLoginError>

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


export const authReducer = (state: InitialStateType = initialState, action: AuthReducerActionType): InitialStateType => {
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
export const loginTC = (email: string, password: string, rememberMe: boolean): AppThunkType => dispatch => {
    dispatch(setAppStatusAC('loading'))
    authAPI.login(email, password, rememberMe)
        .then(response => {
            const {email, _id, avatar, name, publicCardPacksCount} = response;
            dispatch(setLoginData({email, _id, avatar, name, publicCardPacksCount}));
            dispatch(setIsLoggedIn(true));
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch(e => {
            const error = e.response ? e.response.data.error : (e.message + ', more details in the console')
            dispatch(setLoginError(error));
            dispatch(setAppStatusAC('failed'));
        })
}

export const logOutTC = (): AppThunkType => dispatch => {
    dispatch(setAppStatusAC('loading'))
    authAPI.logout()
        .then(response => {
            dispatch(setIsLoggedIn(false));
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch(error => {
            dispatch(setAppStatusAC('failed'));
        })
}

