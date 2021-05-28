import {AppThunkType} from '../../m2-bll/store';
import {setAppStatusAC, setIsInitializedAC} from '../app-reducer';
import {CardsPackCreateType, FetchPacksPayloadType, packsAPI, ResponsePackType} from '../../m3-dal/packAPI';

export type PacksReducerActionType = ReturnType<typeof setPacksDataAC>
    | ReturnType<typeof setPageValueAC>
    | ReturnType<typeof setPagesCountAC>

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
        default:
            return state
    }
}

export const setPacksDataAC = (packsData: ResponsePackType) =>
    ({type: 'PACKS/SET-PACKS', packsData} as const)

export const setPageValueAC = (value: number) => ({type: 'SET-CURRENT-PAGE-VALUE', value} as const)
export const setPagesCountAC = (value: number) => ({type: 'SET-CURRENT-PAGES-COUNT', value} as const)

export const fetchPacksTC = (data: FetchPacksPayloadType): AppThunkType => dispatch => {
    dispatch(setAppStatusAC('loading'))
    packsAPI.fetchPacks({...data})
        .then(response => {
            console.log(response)
            dispatch(setPacksDataAC(response))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch(error => {
            console.log(error)
            dispatch(setIsInitializedAC(true))
            dispatch(setAppStatusAC('failed'))
        })
}

export const createCardsPackTC = (cardsPack: Partial<CardsPackCreateType>): AppThunkType => dispatch => {
    dispatch(setAppStatusAC('loading'))
    packsAPI.createPack(cardsPack)
        .then(() => {
            dispatch(fetchPacksTC({}))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch(error => {
            console.log(error)
            dispatch(setIsInitializedAC(true))
            dispatch(setAppStatusAC('failed'))
        })
}

export const updateCardsPackTC = (_id: string, name: string): AppThunkType => dispatch => {
    dispatch(setAppStatusAC('loading'))
    packsAPI.updatePack(_id, name)
        .then(() => {
            dispatch(fetchPacksTC({}))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch(error => {
            console.log(error)
            dispatch(setIsInitializedAC(true))
            dispatch(setAppStatusAC('failed'))
        })
}

export const deleteCardsPackTC = (id: string): AppThunkType => dispatch => {
    dispatch(setAppStatusAC('loading'))
    packsAPI.deletePack(id)
        .then(() => {
            dispatch(fetchPacksTC({}))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch(error => {
            console.log(error)
            dispatch(setIsInitializedAC(true))
            dispatch(setAppStatusAC('failed'))
        })
}

