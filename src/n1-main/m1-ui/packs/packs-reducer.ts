import {CardsPackType, packsAPI, QueryPacksType, ResponsePackType} from '../../m3-dal/api'
import {AppThunkType} from '../../m2-bll/store';
import {setAppStatusAC, setIsInitializedAC} from '../app-reducer';

export type PacksReducerActionType = ReturnType<typeof setPacksDataAC>
    | ReturnType<typeof setPageValueAC>
    | ReturnType<typeof setPagesCountAC>
    | ReturnType<typeof createCardsPackAC>
    | ReturnType<typeof updateCardsPackAC>

const initialState = {} as ResponsePackType
type InitialStateType = typeof initialState

export const packsReducer = (state: InitialStateType = initialState, action: PacksReducerActionType): InitialStateType => {
    switch (action.type) {
        case 'PACKS/SET-PACKS':
            return {
                ...state, ...action.packsData
            }
        case 'SET-CURRENT-PAGE-VALUE': {
            return {...state, page: action.value}
        }
        case 'SET-CURRENT-PAGES-COUNT': {
            return {...state, pageCount: action.value}
        }
        case "PACKS/CREATE-CARDS-PACK":
            return {
                ...state,
                cardPacks: [action.cardsPack, ...state.cardPacks]
            }
        case "PACKS/UPDATE-CARDS-PACK":
            return {
                ...state,
                cardPacks: state.cardPacks.map(p => p._id === action.id ? {...p, name: action.name} : p)
            }
        default:
            return state
    }
}

export const setPacksDataAC = (packsData: ResponsePackType) =>
    ({type: 'PACKS/SET-PACKS', packsData} as const)

export const setPageValueAC = (value: number) => ({type: 'SET-CURRENT-PAGE-VALUE', value} as const)
export const setPagesCountAC = (value: number) => ({type: 'SET-CURRENT-PAGES-COUNT', value} as const)

export const createCardsPackAC = (cardsPack: CardsPackType) =>
    ({type: 'PACKS/CREATE-CARDS-PACK', cardsPack} as const)

export const updateCardsPackAC = (id: string, name: string) =>
    ({type: 'PACKS/UPDATE-CARDS-PACK', id, name} as const)

export const fetchPacksTC = (queryObj?: Partial<QueryPacksType>): AppThunkType => dispatch => {
    dispatch(setAppStatusAC('loading'))
    packsAPI.fetchPacks(queryObj || {})
        .then(response => {
            dispatch(setPacksDataAC(response))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch(error => {
            console.log(error)
            dispatch(setIsInitializedAC(true))
            dispatch(setAppStatusAC('failed'))
        })
}

export const createCardsPackTC = (): AppThunkType => dispatch => {
    dispatch(setAppStatusAC('loading'))
    let cardsPack = {
        name: "no name", path: "", type: "", deckCover: "",
        grade: 0, privatePack: false, rating: 0, shots: 0
    }
    packsAPI.createPack(cardsPack)
        .then(response => {
            dispatch(createCardsPackAC(response.newCardsPack))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch(error => {
            console.log(error)
            dispatch(setIsInitializedAC(true))
            dispatch(setAppStatusAC('failed'))
        })
}

export const updateCardsPackTC = (id: string, newName: string): AppThunkType => dispatch => {
    dispatch(setAppStatusAC('loading'))
    packsAPI.updatePack(id, newName)
        .then(() => {
            dispatch(updateCardsPackAC(id, newName))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch(error => {
            console.log(error)
            dispatch(setIsInitializedAC(true))
            dispatch(setAppStatusAC('failed'))
        })
}

