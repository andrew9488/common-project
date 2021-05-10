import {AppThunkType} from "../../../n1-main/m2-bll/store";
import {setAppStatusAC} from "../../../n1-main/m1-ui/app-reducer";
import {API} from "../../../n1-main/m3-dal/api";

export type EnterNewPasswordReducerActionType = ReturnType<typeof setIsNewPasswordAC>

type EnterNewPasswordType = {
    isNewPassword: boolean
}

const initialState = {} as EnterNewPasswordType

type InitialStateType = typeof initialState

export const enterNewPasswordReducer = (state: InitialStateType = initialState, action: EnterNewPasswordReducerActionType) => {
    switch (action.type) {
        case "ENTER-NEW-PASSWORD/SET-IS-NEW-PASSWORD":
            return {
                ...state,
                isNewPassword: action.isNewPassword
            }
        default:
            return state
    }
}

export const setIsNewPasswordAC = (isNewPassword: boolean) =>
    ({type: "ENTER-NEW-PASSWORD/SET-IS-NEW-PASSWORD", isNewPassword} as const)

export const setNewPasswordTC = (newPassword: string, passwordToken: string): AppThunkType => dispatch => {
    dispatch(setAppStatusAC("loading"))
    API.setNewPassword(newPassword, passwordToken)
        .then(() => {
            dispatch(setAppStatusAC("succeeded"))
            dispatch(setIsNewPasswordAC(true))
        })
        .catch(response => {
            console.log(response.error)
        })
}