import {API} from "../../../n1-main/m3-dal/api";
import {AppThunkType} from "../../../n1-main/m2-bll/store";
import {setAppStatusAC} from "../../../n1-main/m1-ui/app-reducer";

export type RegisterReducerActionType = ReturnType<typeof setIsRegistrationDataAC>

type RegisterType = {
    isRegistration: boolean
}

const initialState = {} as RegisterType

type InitialStateType = typeof initialState

export const registerReducer = (state: InitialStateType = initialState, action: RegisterReducerActionType): InitialStateType => {
    switch (action.type) {
        case "REGISTER/SET-IS-REGISTRATION-DATA":
            return {
                ...state,
                isRegistration: action.isRegistration
            }
        default:
            return state
    }
}

const setIsRegistrationDataAC = (isRegistration: boolean) =>
    ({type: "REGISTER/SET-IS-REGISTRATION-DATA", isRegistration} as const)

export const registerTC = (email: string, password: string): AppThunkType => dispatch => {
    dispatch(setAppStatusAC("loading"))
    API.register(email, password)
        .then(() => {
            dispatch(setIsRegistrationDataAC(true))
            dispatch(setAppStatusAC("succeeded"))
        })
        .catch(response => {
            console.log(response.error)
            dispatch(setAppStatusAC('failed'))
        })
}