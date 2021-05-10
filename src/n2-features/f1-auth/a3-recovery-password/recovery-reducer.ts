import {API} from "../../../n1-main/m3-dal/api";
import {AppThunkType} from "../../../n1-main/m2-bll/store";
import {setAppStatusAC} from "../../../n1-main/m1-ui/app-reducer";

export type RecoveryReducerActionType = ReturnType<typeof setIsForgotPasswordAC>

type RecoveryType = {
    isForgotPassword: boolean
}

const initialState = {} as RecoveryType

type InitialStateType = typeof initialState

export const recoveryReducer = (state: InitialStateType = initialState, action: RecoveryReducerActionType): InitialStateType => {
    switch (action.type) {
        default:
            return state
    }
}

const setIsForgotPasswordAC = (isForgot: boolean) =>
    ({type: "RECOVERY/SET-IS-FORGOT-PASSWORD", isForgot})

export const forgotPasswordTC = (email: string): AppThunkType => dispatch => {
    dispatch(setAppStatusAC("loading"))
    API.forgotPassword(email)
        .then(() => {
            dispatch(setIsForgotPasswordAC(true))
            dispatch(setAppStatusAC("succeeded"))
        })
        .catch(response => {
            console.log(response.error)
        })
}