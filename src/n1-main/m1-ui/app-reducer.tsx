import {API} from '../m3-dal/api';
import {AppThunkType} from '../m2-bll/store';
import {setIsLoggedIn, setLoginError} from '../../n2-features/f1-auth/a1-login/auth-reducer';

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type AppReducerActionType = ReturnType<typeof setAppStatusAC> | ReturnType<typeof setIsInitializedAC>

const initialState = {
    status: 'idle' as RequestStatusType,
    isInitialized: false
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: AppReducerActionType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-APP-STATUS':
            return {
                ...state,
                status: action.status
            }
        case 'APP/SET-IS-INITIALIZED':
            return {
                ...state,
                isInitialized: action.isInitialized
            }
        default:
            return state
    }
}

export const setAppStatusAC = (status: RequestStatusType) =>
    ({type: 'APP/SET-APP-STATUS', status} as const)
export const setIsInitializedAC = (isInitialized: boolean) =>
    ({type: 'APP/SET-IS-INITIALIZED', isInitialized} as const)

export const initializedAppTC = (): AppThunkType => dispatch => {
    dispatch(setAppStatusAC('loading'))
    API.authMe()
        .then(() => {
            dispatch(setAppStatusAC('succeeded'))
            dispatch(setIsInitializedAC(true))
            dispatch(setIsLoggedIn(true));
        })
        .catch(e => {
            const error = e.response ? e.response.data.error : (e.message + ', more details in the console')
            dispatch(setLoginError(error));
            dispatch(setIsInitializedAC(true))
            dispatch(setAppStatusAC('failed'))
        })

}