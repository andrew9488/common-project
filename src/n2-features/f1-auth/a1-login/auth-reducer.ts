import {setAppStatusAC} from '../../../n1-main/m1-ui/app-reducer';
import {AppThunkType} from '../../../n1-main/m2-bll/store';
import {authAPI} from '../../../n1-main/m3-dal/authAPI';
import {setUserProfileDataAC} from "../../../n1-main/m1-ui/profile/profile-reducer";

//types
export type AuthReducerActionType = SetIsLoggedInActionType
    | SetLoginErrorActionType

export type SetIsLoggedInActionType = ReturnType<typeof setIsLoggedIn>
export type SetLoginErrorActionType = ReturnType<typeof setLoginError>
type InitialStateType = { isLoggedIn: boolean, loginError: null | string }


const initialState = {
    isLoggedIn: false,
    loginError: null
}


export const authReducer = (state: InitialStateType = initialState, action: AuthReducerActionType): InitialStateType => {
    switch (action.type) {
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
export const setIsLoggedIn = (isLoggedIn: boolean) => ({type: 'auth/SET-IS-LOGGED-IN', isLoggedIn} as const)
export const setLoginError = (loginError: string) => ({type: 'auth/SET-LOGIN-ERROR', loginError} as const)

//thunks
export const loginTC = (email: string, password: string, rememberMe: boolean): AppThunkType => dispatch => {
    dispatch(setAppStatusAC('loading'))
    authAPI.login(email, password, rememberMe)
        .then(response => {
            const {email, _id, avatar, name, publicCardPacksCount} = response;
            dispatch(setUserProfileDataAC({email, _id, avatar, name, publicCardPacksCount}));
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
        .then(() => {
            dispatch(setIsLoggedIn(false));
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch(error => {
            console.log(error)
            dispatch(setAppStatusAC('failed'));
        })
}

