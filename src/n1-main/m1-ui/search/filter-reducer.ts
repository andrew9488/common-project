type ActionsType = ReturnType<typeof setSearchValueAC> | ReturnType<typeof setMinMaxValuesAC>

const initialState = {
    search: '',
    min: 0,
    max: 10
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

// export const getPacksWithFilters = (): AppThunkType => (dispatch, getState) => {
//     let value = getState().filter.search;
//     let min = getState().filter.min;
//     let max = getState().filter.max;
//     dispatch(fetchPacksTC({packName:value, min, max}))
// }
//
// export const onPacksPageClickTC = (page: number): AppThunkType => (dispatch) => {
//     dispatch(setPageValueAC(page));
//     dispatch(fetchPacksTC({page}))
// }
//
// export const onPortionPacksChangeTC = (pageCount: number): AppThunkType => (dispatch) => {
//     dispatch(setPagesCountAC(pageCount))
//     dispatch(fetchPacksTC({pageCount}))
// }
//
// export const sortPackTC = (sortPacks: string): AppThunkType => (dispatch) => {
//     dispatch(fetchPacksTC({sortPacks}))
// }