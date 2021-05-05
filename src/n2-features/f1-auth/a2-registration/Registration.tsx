import React, {ChangeEvent, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {registerTC} from "./register-reducer";
import {AppRootStateType} from "../../../n1-main/m2-bll/store";
import {NavLink, Redirect} from "react-router-dom";
import {PATH} from "../../../n1-main/m1-ui/routes/Routes";
import style from "./Registration.module.css"

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
        <div className={style.registrationContainer}>
            <h1>Registration: </h1>
            <form className={style.formBlock}>
                <div>
                    <span>Email: </span><input placeholder="Enter email..." type="email" value={email}
                                               onChange={onChangeEmailHandler}/>
                </div>
                <div>
                    <span>Password: </span><input placeholder="Enter password..." type="password" value={password}
                                                  onChange={onChangePasswordHandler}/>
                </div>
                <div>
                    <button type="submit" onClick={onRegistrationHandler}>Register</button>
                </div>
            </form>
            <div>
                <NavLink to={PATH.LOGIN}>login</NavLink>
            </div>
        </div>
    )
}

export default Registration