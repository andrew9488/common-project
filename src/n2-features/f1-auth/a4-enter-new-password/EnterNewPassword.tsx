import React, {ChangeEvent, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../../n1-main/m2-bll/store';
import {NavLink, Redirect, RouteComponentProps, withRouter} from 'react-router-dom';
import {PATH} from '../../../n1-main/m1-ui/routes/Routes';
import {setNewPasswordTC} from './enterNewPassword-reducer';
import styles from './EnterNewPassword.module.sass';

type PathParamsType = {
    token: string
}
type PropsType = RouteComponentProps<PathParamsType>

const EnterNewPassword: React.FC<PropsType> = (props) => {

    const [newPassword, setNewPassword] = useState<string>('')
    const [correctNewPassword, setCorrectNewPassword] = useState<string>('')

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
            alert('Passwords isn\'t equal')
        }
    }

    if (isNewPassword) {
        return <Redirect to={PATH.LOGIN}/>
    }

    return (
        <div className={styles.mainWrapper}>
            <h3>Create new password</h3>
            <div className={styles.inputWrap}>
                <label htmlFor="newPass/password"/>
                <input type="password"
                       value={newPassword}
                       placeholder={'Password...'}
                       id={'newPass/password'}
                       onChange={onChangeNewPasswordHandler}/>
            </div>
            <div className={styles.inputWrap}>
                <label htmlFor='newPass/repeatPassword'/>
                <input type="password"
                       value={correctNewPassword}
                       onChange={onChangeCorrectNewPasswordHandler}
                       id={'newPass/repeatPassword'}
                       placeholder={'Repeat password...'}/>
            </div>
            <div>Create new password and we will send you further instructions to email</div>
            <button type="submit"
                    onClick={onSetNewPasswordHandler}>
                Create new password
            </button>
        </div>

    )
}

export default withRouter(EnterNewPassword)