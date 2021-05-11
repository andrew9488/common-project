import {packsAPI, PackType, ResponsePackType} from "../../m3-dal/api"
import {AppThunkType} from "../../m2-bll/store";
import {setAppStatusAC, setIsInitializedAC} from "../app-reducer";

export type PacksReducerActionType = ReturnType<typeof setPacksAC>

const initialState = {} as ResponsePackType
type InitialStateType = typeof initialState

export const packsReducer = (state: InitialStateType = initialState, action: PacksReducerActionType): InitialStateType => {
    switch (action.type) {
        case "PACKS/SET-PACKS":
            return {
                ...state,
                cardPacks: action.packs
            }
        default:
            return state
    }
}

export const setPacksAC = (packs: Array<PackType>) =>
    ({type: "PACKS/SET-PACKS", packs} as const)

export const fetchPacksTC = (): AppThunkType => dispatch => {
    dispatch(setAppStatusAC("loading"))
    packsAPI.fetchPacks()
        .then(response => {
            dispatch(setPacksAC(response.cardPacks))
            dispatch(setAppStatusAC("succeeded"))
        })
        .catch(error => {
            console.log(error)
            dispatch(setIsInitializedAC(true))
            dispatch(setAppStatusAC("failed"))
        })
}