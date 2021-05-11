import {cardsAPI, ResponseCardType} from "../../m3-dal/api"
import {AppThunkType} from "../../m2-bll/store";
import {setAppStatusAC, setIsInitializedAC} from "../app-reducer";

export type CardsReducerActionType = ReturnType<typeof setCardsDataAC>

const initialState = {} as ResponseCardType

type InitialStateType = typeof initialState

export const cardsReducer = (state: InitialStateType = initialState, action: CardsReducerActionType): InitialStateType => {
    switch (action.type) {
        case "CARDS/SET_CARDS":
            return {
                ...state, ...action.cardsData
            }
        default:
            return state
    }
}

export const setCardsDataAC = (cardsData: ResponseCardType) =>
    ({type: "CARDS/SET_CARDS", cardsData} as const)

export const fetchCardsTC = (id: string): AppThunkType => dispatch => {
    dispatch(setAppStatusAC("loading"))
    cardsAPI.fetchCards({cardsPack_id: id})
        .then(response => {
            dispatch(setCardsDataAC(response))
            dispatch(setAppStatusAC("succeeded"))
        })
        .catch(error => {
            console.log(error)
            dispatch(setIsInitializedAC(true))
            dispatch(setAppStatusAC("failed"))
        })
}