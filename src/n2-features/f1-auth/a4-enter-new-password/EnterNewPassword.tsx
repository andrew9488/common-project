import React, {ChangeEvent, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../n1-main/m2-bll/store";
import {NavLink, Redirect, RouteComponentProps} from "react-router-dom";
import {PATH} from "../../../n1-main/m1-ui/routes/Routes";
import {setNewPasswordTC} from "./enterNewPassword-reducer";

type PathParamsType = {
    token: string
}
type PropsType = RouteComponentProps<PathParamsType>

const EnterNewPassword: React.FC<PropsType> = (props) => {

    const [newPassword, setNewPassword] = useState<string>("")
    const [correctNewPassword, setCorrectNewPassword] = useState<string>("")

    const dispatch = useDispatch()
    const isNewPassword = useSelector<AppRootStateType, boolean>(state => state.newPassword.isNewPassword)

    const onChangeNewPasswordHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewPassword(e.currentTarget.value)
    }

    const onChangeCorrectNewPasswordHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setCorrectNewPassword(e.currentTarget.value)
    }

    const onSetNewPasswordHandler = () => {
        if (newPassword === correctNewPassword) {
            dispatch(setNewPasswordTC(newPassword, props.match.params.token))
        } else {
            alert("Passwords isn't equal")
        }
    }

    if (isNewPassword) {
        return <Redirect to={PATH.LOGIN}/>
    }

    return (

        <div>
            <form>
                <input type="password" value={newPassword}
                       onChange={onChangeNewPasswordHandler}/>
                <input type="password" value={correctNewPassword}
                       onChange={onChangeCorrectNewPasswordHandler}/>
                <div>
                    <button type="submit" onClick={onSetNewPasswordHandler}>Send</button>
                </div>
            </form>
            <div>
                <NavLink to={PATH.LOGIN}>login</NavLink>
            </div>
        </div>

    )
}

export default EnterNewPassword