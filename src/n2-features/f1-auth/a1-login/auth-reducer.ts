import {Dispatch} from 'redux';
import {API} from '../../../n1-main/m3-dal/api';

//types
type ActionsType = ReturnType<typeof setLoginData>

type UserDataType = {
    email: string | null,
    _id: string | null,
    avatar: string | null,
    name: string | null,
    publicCardPacksCount: number
}

type InitialStateType = { userData: UserDataType }


const initialState = {
    userData: {
        email: null,
        _id: null,
        avatar: null,
        name: null,
        publicCardPacksCount: 0,
    }
}


export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SET-USER-DATA': {
            return {...state, ...action.data}
        }
        default:
            return state
    }
}

//actions
export const setLoginData = (data: UserDataType) => ({type: 'SET-USER-DATA', data} as const)

//thunks
export const loginTC = (email: string, password: string, rememberMe: boolean) => (dispatch: Dispatch<ActionsType>) => {
    API.login(email, password, rememberMe)
        .then(response => {
            const {email, _id, avatar, name, publicCardPacksCount} = response;
            dispatch(setLoginData({email, _id, avatar, name, publicCardPacksCount}))
        })
        .catch(e => {
            const error = e.response ? e.response.data.error : (e.message + ', more details in the console')
            console.log(error);
        })
}