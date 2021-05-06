import React, {ChangeEvent, useState} from "react";
import {NavLink, Redirect} from "react-router-dom";
import {PATH} from "../../../n1-main/m1-ui/routes/Routes";
import {useDispatch, useSelector} from "react-redux";
import {forgotPasswordTC} from "./recovery-reducer";
import {AppRootStateType} from "../../../n1-main/m2-bll/store";

const RecoveryPassword: React.FC = () => {

    const [restoredPassword, setRestoredPassword] = useState<string>("")
    const dispatch = useDispatch()
    const isForgotPassword = useSelector<AppRootStateType, boolean>(state => state.forgot.isForgotPassword)

    const onChangeRestoredPasswordHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setRestoredPassword(e.currentTarget.value)
    }

    const onRestoredPasswordHandler = () => {
        dispatch(forgotPasswordTC(restoredPassword))
    }

    if (isForgotPassword) {
        return <Redirect to={PATH.ENTER_NEW_PASSWORD}/>
    }

    return (
        <div>
            <form>
                <span>Email: </span><input placeholder="Enter email..." type="email" value={restoredPassword}
                                           onChange={onChangeRestoredPasswordHandler}/>
                <div>
                    <button type="submit" onClick={onRestoredPasswordHandler}>Send</button>
                </div>
            </form>
            <div>
                <NavLink to={PATH.LOGIN}>login</NavLink>
            </div>
        </div>
    )
}

export default RecoveryPassword