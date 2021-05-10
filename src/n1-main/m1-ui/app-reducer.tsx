import {API} from "../m3-dal/api";
import {AppThunkType} from "../m2-bll/store";

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed"

export type AppReducerActionType = ReturnType<typeof setAppStatusAC> | ReturnType<typeof setIsInitializedAC>

const initialState = {
    status: "idle" as RequestStatusType,
    isInitialized: false
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: AppReducerActionType): InitialStateType => {
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

export const initializedAppTC = (): AppThunkType => dispatch => {
    API.authMe()
        .then(() => {
            dispatch(setAppStatusAC("succeeded"))
            dispatch(setIsInitializedAC(true))
        })
        .catch(error => {
            console.log(error)
            dispatch(setIsInitializedAC(true))
        })

}