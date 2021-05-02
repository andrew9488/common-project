import {combineReducers, createStore} from "redux";
import {profileReducer} from "../m1-ui/profile/profile-reducer";
import {authReducer} from "../../n2-features/f1-auth/a1-login/auth-reducer";

const reducer = combineReducers({
    profile: profileReducer,
    auth: authReducer

})

export const store = createStore(reducer)

export type AppRootStateType = ReturnType<typeof reducer>