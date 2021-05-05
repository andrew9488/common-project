import React, {ChangeEvent, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {loginTC} from './auth-reducer';
import {AppRootStateType} from '../../../n1-main/m2-bll/store';
import {Redirect} from 'react-router-dom';
import {PATH} from '../../../n1-main/m1-ui/routes/Routes';
import styles from './Login.module.css';

const Login: React.FC = () => {

    const dispatch = useDispatch();

    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn);
    const loginError = useSelector<AppRootStateType, string | null>(state => state.auth.loginError);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
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
        <div>
            Login
            <form>
                <div>
                    <input type="text" onChange={onEmailChangeHandler}/>
                </div>
                <div>
                    <input type="password" onChange={onPasswordChangeHandler}/>
                </div>
                <div>
                    <input type="checkbox" onChange={onRememberMeChangeHandler}/>
                    Remember me
                </div>
                <button type={'submit'} onClick={onLoginFormSubmitHandler}>log in</button>
            </form>
            {loginError ? <div className={styles.loginError}>{loginError}</div> : ''}
        </div>
    )
}

export default Login
