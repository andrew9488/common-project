import {applyMiddleware, combineReducers, createStore} from "redux";
import {profileReducer} from "../m1-ui/profile/profile-reducer";
import {authReducer, AuthReducerActionType} from "../../n2-features/f1-auth/a1-login/auth-reducer";
import {registerReducer, RegisterReducerActionType} from "../../n2-features/f1-auth/a2-registration/register-reducer";
import thunk, {ThunkAction} from "redux-thunk";
import {
    recoveryReducer,
    RecoveryReducerActionType
} from "../../n2-features/f1-auth/a3-recovery-password/recovery-reducer";
import {appReducer, AppReducerActionType} from "../m1-ui/app-reducer";

const reducer = combineReducers({
    profile: profileReducer,
    auth: authReducer,
    register: registerReducer,
    forgot: recoveryReducer,
    app: appReducer

})

export const store = createStore(reducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof reducer>

type ActionsType = AppReducerActionType | AuthReducerActionType | RegisterReducerActionType | RecoveryReducerActionType
export type AppThunkType = ThunkAction<void, AppRootStateType, unknown, ActionsType>