import {setLoginError} from '../../../n2-features/f1-auth/a1-login/auth-reducer';
import {setAppStatusAC, setIsInitializedAC} from "../app-reducer";
import {authAPI} from '../../m3-dal/authAPI';
import {AppThunkType} from "../../m2-bll/store";

export type ProfileReducerActionType = ReturnType<typeof updateProfileAC>

type UserDataType = {
    email: string
    _id: string
    avatar: string
    name: string
    publicCardPacksCount: number
}

const initialState = {
    userData: {
        email: null as string | null,
        _id: null as string | null,
        avatar: null as string | null,
        name: null as string | null,
        publicCardPacksCount: 0,
    },
    isLoggedIn: false,
    loginError: null
}

type InitialStateType = typeof initialState

export const profileReducer = (state: InitialStateType = initialState, action: ProfileReducerActionType): InitialStateType => {
    switch (action.type) {
        case "PROFILE/UPDATE-PROFILE":
            return {
                ...state,
                userData: action.data
            }
        default:
            return state
    }
}

export const updateProfileAC = (data: UserDataType) =>
    ({type: "PROFILE/UPDATE-PROFILE", data} as const)

//thunks
export const updateProfileTC = (name: string, avatar: string): AppThunkType => dispatch => {
    dispatch(setAppStatusAC('loading'))
    authAPI.changeProfile(name, avatar)
        .then((response) => {
            dispatch(setAppStatusAC('succeeded'))
            dispatch(updateProfileAC(response))
        })
        .catch(e => {
            const error = e.response ? e.response.data.error : (e.message + ', more details in the console')
            dispatch(setLoginError(error));
            dispatch(setAppStatusAC('failed'))
            dispatch(setIsInitializedAC(true))
        })
}
