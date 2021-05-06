import {API} from "../../../n1-main/m3-dal/api";
import {Dispatch} from "redux";

type ActionsType = any

type RecoveryType = {
    isForgotPassword: boolean
}

const initialState = {} as RecoveryType

type InitialStateType = typeof initialState

export const recoveryReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        default:
            return state
    }
}

const setIsForgotPasswordAC = (isForgot: boolean) =>
    ({type: "RECOVERY/SET-IS-FORGOT-PASSWORD", isForgot})

export const forgotPasswordTC = (email: string) => (dispatch: Dispatch) => {
    API.forgotPassword(email)
        .then(() => {
            dispatch(setIsForgotPasswordAC(true))
        })
        .catch(response=>{
            console.log(response.error)
        })
}