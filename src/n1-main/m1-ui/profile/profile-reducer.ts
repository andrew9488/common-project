import {Dispatch} from 'redux';
import {API} from '../../m3-dal/api';
import {setIsLoggedIn} from '../../../n2-features/f1-auth/a1-login/auth-reducer';
import {setAppStatusAC} from "../app-reducer";

type ActionsType = any

const initialState = {}

type InitialStateType = typeof initialState

export const profileReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        default:
            return state
    }
}

//thunks

