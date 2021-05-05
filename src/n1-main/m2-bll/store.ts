import {applyMiddleware, combineReducers, createStore} from "redux";
import {profileReducer} from "../m1-ui/profile/profile-reducer";
import {authReducer} from "../../n2-features/f1-auth/a1-login/auth-reducer";
import {registerReducer} from "../../n2-features/f1-auth/a2-registration/register-reducer";
import thunk from "redux-thunk";

const reducer = combineReducers({
    profile: profileReducer,
    auth: authReducer,
    register: registerReducer

})

export const store = createStore(reducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof reducer>