import {AppThunkType} from '../../m2-bll/store';
import {fetchPacksTC, setPagesCountAC, setPageValueAC} from '../packs/packs-reducer';
import {QueryPacksType} from '../../m3-dal/api';

type ActionsType = ReturnType<typeof setSearchValueAC> | ReturnType<typeof setMinMaxValuesAC>

const initialState = {
    search: '',
    min: 3,
    max: 9
}

type InitialStateType = typeof initialState

export const filterReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SET-SEARCH-VALUE': {
            return {...state, search: action.value}
        }
        case 'SET-MIN-MAX-VALUES': {
            return {...state, min: action.values[0], max: action.values[1]}
        }
        default:
            return state
    }
}

//actions

export const setSearchValueAC = (value: string) => ({type: 'SET-SEARCH-VALUE', value} as const)
export const setMinMaxValuesAC = (values: number[]) => ({type: 'SET-MIN-MAX-VALUES', values} as const)


//thunks

export const getPacksWithFilters = (): AppThunkType => (dispatch, getState) => {
    let search = getState().filter.search;
    let min = getState().filter.min;
    let max = getState().filter.max;
    const searchParams = {packName: search, min, max} as Partial<QueryPacksType>
    dispatch(fetchPacksTC(searchParams))
}

export const onPacksPageClickTC = (newPage: number): AppThunkType => (dispatch) => {
    dispatch(setPageValueAC(newPage));
    const params = {page: newPage}
    dispatch(fetchPacksTC(params))
}

export const onPortionPacksChangeTC = (pagesCount: number): AppThunkType => (dispatch) => {
    dispatch(setPagesCountAC(pagesCount))
    dispatch(fetchPacksTC({pageCount: pagesCount}))
}

export const sortPackTC = (sortPacks: string): AppThunkType => (dispatch) => {
    dispatch(fetchPacksTC({sortPacks}))
}