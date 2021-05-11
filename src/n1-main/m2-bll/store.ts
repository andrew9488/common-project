import {applyMiddleware, combineReducers, createStore} from 'redux';
import {profileReducer} from '../m1-ui/profile/profile-reducer';
import {authReducer, AuthReducerActionType} from '../../n2-features/f1-auth/a1-login/auth-reducer';
import {registerReducer, RegisterReducerActionType} from '../../n2-features/f1-auth/a2-registration/register-reducer';
import thunk, {ThunkAction} from 'redux-thunk';
import {
    recoveryReducer,
    RecoveryReducerActionType
} from '../../n2-features/f1-auth/a3-recovery-password/recovery-reducer';
import {appReducer, AppReducerActionType} from '../m1-ui/app-reducer';
import {filterReducer} from '../m1-ui/Search/filter-reducer';
import {
    enterNewPasswordReducer,
    EnterNewPasswordReducerActionType
} from '../../n2-features/f1-auth/a4-enter-new-password/enterNewPassword-reducer';
import {packsReducer, PacksReducerActionType} from '../m1-ui/packs/packs-reducer';
import {cardsReducer, CardsReducerActionType} from '../m1-ui/cards/cards-reducer';

const reducer = combineReducers({
    profile: profileReducer,
    auth: authReducer,
    register: registerReducer,
    forgot: recoveryReducer,
    app: appReducer,
    filter: filterReducer,
    newPassword: enterNewPasswordReducer,
    packs: packsReducer,
    cards: cardsReducer

})

export const store = createStore(reducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof reducer>

type ActionsType = AppReducerActionType | AuthReducerActionType
    | RegisterReducerActionType | RecoveryReducerActionType | EnterNewPasswordReducerActionType
    | PacksReducerActionType | CardsReducerActionType
export type AppThunkType = ThunkAction<void, AppRootStateType, unknown, ActionsType>