import {cardsAPI, CardType, ResponseCardType} from "../../m3-dal/api"
import {AppThunkType} from "../../m2-bll/store";
import {setAppStatusAC, setIsInitializedAC} from "../app-reducer";

export type CardsReducerActionType = ReturnType<typeof setCards>

const initialState = {} as ResponseCardType

type InitialStateType = typeof initialState

export const cardsReducer = (state: InitialStateType = initialState, action: CardsReducerActionType): InitialStateType => {
    switch (action.type) {
        case "CARDS/SET_CARDS":
            return {
                ...state,
                cards: action.cards
            }
        default:
            return state
    }
}

export const setCards = (cards: Array<CardType>) =>
    ({type: "CARDS/SET_CARDS", cards} as const)

export const fetchCardsTC = (): AppThunkType => dispatch => {
    dispatch(setAppStatusAC("loading"))
    cardsAPI.fetchCards({})
        .then(response => {
            dispatch(setCards(response.cards))
            dispatch(setAppStatusAC("succeeded"))
        })
        .catch(error => {
            console.log(error)
            dispatch(setIsInitializedAC(true))
            dispatch(setAppStatusAC("failed"))
        })
}