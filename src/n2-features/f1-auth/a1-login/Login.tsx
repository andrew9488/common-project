import React, {ChangeEvent, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {loginTC} from './auth-reducer';
import {AppRootStateType} from '../../../n1-main/m2-bll/store';
import {Redirect, NavLink} from 'react-router-dom';
import {PATH} from '../../../n1-main/m1-ui/routes/Routes';
import styles from './Login.module.sass';
import {RequestStatusType} from '../../../n1-main/m1-ui/app-reducer';

const Login: React.FC = () => {

    const dispatch = useDispatch();

    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn);
    const loginError = useSelector<AppRootStateType, string | null>(state => state.auth.loginError);
    const appStatus = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)

    const [email, setEmail] = useState('nya-admin@nya.nya');
    const [password, setPassword] = useState('1qazxcvBG');
    const [rememberMe, setRememberMe] = useState(false);


    const onLoginFormSubmitHandler = () => {
        dispatch(loginTC(email, password, rememberMe));
    }

    const onEmailChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.currentTarget.value);
    }
    const onPasswordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.currentTarget.value);
    }
    const onRememberMeChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setRememberMe(event.currentTarget.checked);
    }

    if (isLoggedIn) {
        return <Redirect to={PATH.PROFILE}/>
    }
    return (
        <div className={styles.loginWrapper}>
            <h3>Sign in</h3>
            <div className={styles.inputWrapper}>
                <label htmlFor="signIn/email">Email</label>
                <input type="text"
                       onChange={onEmailChangeHandler}
                       value={email}
                       id={'signIn/email'}/>
            </div>
            <div className={styles.inputWrapper}>
                <label htmlFor="signIn/password">Password</label>
                <input type="password"
                       onChange={onPasswordChangeHandler}
                       value={password}
                       id={'signIn/password'}/>
            </div>
            <div className={`${styles.inputWrapper} ${styles.remember}`}>
                <input type="checkbox"
                       onChange={onRememberMeChangeHandler}
                       checked={rememberMe}
                       id={'signIn/rememberMe'}/>
                <label htmlFor="signIn/rememberMe">Remember me</label>
            </div>
            {loginError ? <div className={styles.loginError}>{loginError}</div> : ''}
            <div><NavLink to={PATH.RECOVERY_PASSWORD}>Forgot Password</NavLink></div>
            <button type={'submit'}
                    onClick={onLoginFormSubmitHandler}
                    disabled={appStatus === 'loading'}>Login
            </button>
            <div>Don't have an account?</div>
            <div><NavLink to={PATH.REGISTRATION}>Sign up</NavLink></div>
        </div>
    )
}

export default Login
