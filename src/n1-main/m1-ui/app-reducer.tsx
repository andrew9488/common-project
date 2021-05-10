import {Dispatch} from "redux";
import {API} from "../m3-dal/api";

export type RequestStatusType = "loading" | "succeeded" | "failed"

type ActionsType = ReturnType<typeof setAppStatusAC> | ReturnType<typeof setIsInitializedAC>

const initialState = {
    status: "loading" as RequestStatusType,
    isInitialized: false
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "APP/SET-APP-STATUS":
            return {
                ...state,
                status: action.status
            }
        case "APP/SET-IS-INITIALIZED":
            return {
                ...state,
                isInitialized: action.isInitialized
            }
        default:
            return state
    }
}

export const setAppStatusAC = (status: RequestStatusType) =>
    ({type: "APP/SET-APP-STATUS", status} as const)
export const setIsInitializedAC = (isInitialized: boolean) =>
    ({type: "APP/SET-IS-INITIALIZED", isInitialized} as const)

export const initializedAppTC = () => (dispatch: Dispatch) => {
    API.authMe()
        .then(() => {
            dispatch(setAppStatusAC("succeeded"))
            dispatch(setIsInitializedAC(true))
        })
        .catch(error => {
            console.log(error)
        })

}