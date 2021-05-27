import React, {ChangeEvent, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {registerTC} from './register-reducer';
import {AppRootStateType} from '../../../n1-main/m2-bll/store';
import {NavLink, Redirect} from 'react-router-dom';
import {PATH} from '../../../n1-main/m1-ui/routes/Routes';
import styles from './Registration.module.scss'
import {RequestStatusType} from '../../../n1-main/m1-ui/app-reducer';

const Registration: React.FC = () => {

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [checkPassword, setCheckPassword] = useState<string>('')

    const appStatus = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    const isRegistration = useSelector<AppRootStateType, boolean>(state => state.register.isRegistration)
    const dispatch = useDispatch()

    const onChangeEmailHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value)
    }

    const onChangePasswordHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.currentTarget.value)
    }

    const onChangePasswordCheckHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setCheckPassword(e.currentTarget.value)
    }
    const onRegistrationHandler = () => {
        if (password === '' || email === '') {
            alert('Field is required')
        } else if (checkPassword !== password) {
            alert('Passwords are different!')
        } else {
            dispatch(registerTC(email, password))
            setEmail('')
            setPassword('')
        }
    }

    if (isRegistration) {
        return <Redirect to={PATH.LOGIN}/>
    }

    return (
        <div className={styles.registrationContainer}>
            <h3>Sign up</h3>
            <div className={styles.inputWrapper}>
                <label htmlFor="'registration/email'">Email</label>
                <input placeholder="Enter email..."
                       type="text"
                       value={email}
                       onChange={onChangeEmailHandler}
                       id={'registration/email'}/>
            </div>
            <div className={styles.inputWrapper}>
                <label htmlFor="registration/password">Password</label>
                <input placeholder="Enter password..."
                       type="password"
                       value={password}
                       onChange={onChangePasswordHandler}
                       id={'registration/password'}
                       autoComplete={'new-password'}/>
            </div>
            <div className={styles.inputWrapper}>
                <label htmlFor="registration/checkPassword">Confirm password</label>
                <input placeholder="Confirm password..."
                       type="password"
                       value={checkPassword}
                       onChange={onChangePasswordCheckHandler}
                       id={'registration/checkPassword'}
                       autoComplete={'new-password'}/>
            </div>
            <div className={styles.btnWrap}>
                <button className={styles.cancel}>Cancel</button>
                <button type="submit"
                        onClick={onRegistrationHandler}
                        disabled={appStatus === 'loading'}>
                    Register
                </button>
            </div>
        </div>
    )
}

export default Registration