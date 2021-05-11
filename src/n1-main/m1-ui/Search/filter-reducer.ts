import {AppThunkType} from '../../m2-bll/store';

type ActionsType = ReturnType<typeof setSearchValueAC> | ReturnType<typeof setMinMaxValuesAC>

const initialState = {
    search: '',
    min: 3,
    max: 9,
    page: 1,
    pageCount: 4
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
    //@ts-ignore
    fetchPacksTC()
}

export const onPacksPageClickTC = (): AppThunkType => (dispatch) => {

}