import React, {ChangeEvent, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {registerTC} from "./register-reducer";
import {AppRootStateType} from "../../../n1-main/m2-bll/store";
import {Redirect} from "react-router-dom";
import {PATH} from "../../../n1-main/m1-ui/routes/Routes";

const Registration: React.FC = () => {

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const isRegistration = useSelector<AppRootStateType, boolean>(state => state.register.isRegistration)
    const dispatch = useDispatch()

    const onChangeEmailHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value)
    }

    const onChangePasswordHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.currentTarget.value)
    }

    const onRegistrationHandler = () => {
        if (password === "" || email === "") {
            alert("Field is required")
        } else {
            dispatch(registerTC(email, password))
            setEmail("")
            setPassword("")
        }
    }

    if (isRegistration) {
        return <Redirect to={PATH.LOGIN}/>
    }

    return (
        <div>
            <form>
                <div>
                    <span>Email: </span><input type="text" value={email} onChange={onChangeEmailHandler}/>
                </div>
                <div>
                    <span>password: </span><input type="password" value={password} onChange={onChangePasswordHandler}/>
                </div>
                <div>
                    <button type="submit" onClick={onRegistrationHandler}>Register</button>
                </div>
            </form>
        </div>
    )
}

export default Registration