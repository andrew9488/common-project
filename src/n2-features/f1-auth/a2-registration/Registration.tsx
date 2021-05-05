import React, {ChangeEvent, useState} from "react";
import {useDispatch} from "react-redux";
import {registerTC} from "./register-reducer";

const Registration: React.FC = () => {

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")

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