import {Dispatch} from "redux";
import {API} from "../../../n1-main/m3-dal/api";

type ActionsType = ReturnType<typeof setRegistrationDataAC>

type RegisterType = {
    email: string
    password: string
}

const initialState = {} as RegisterType

type InitialStateType = typeof initialState

export const registerReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "REGISTER/SET-REGISTRATION-DATA":
            return {
                ...state,
                email: action.email,
                password: action.password
            }
        default:
            return state
    }
}

const setRegistrationDataAC = (email: string, password: string) =>
    ({type: "REGISTER/SET-REGISTRATION-DATA", email, password} as const)

export const registerTC = (email: string, password: string) => (dispatch: Dispatch) => {
    API.register(email, password)
        .then(() => {
            dispatch(setRegistrationDataAC(email, password))
        })
        .catch(error => {
            console.log(error)
        })
}