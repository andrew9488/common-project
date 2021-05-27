import React, {ChangeEvent, useState} from 'react';
import {NavLink, Redirect} from 'react-router-dom';
import {PATH} from '../../../n1-main/m1-ui/routes/Routes';
import {useDispatch, useSelector} from 'react-redux';
import {forgotPasswordTC} from './recovery-reducer';
import {AppRootStateType} from '../../../n1-main/m2-bll/store';
import styles from './RecoveryPassword.module.sass';

const RecoveryPassword: React.FC = () => {

    const [restoredPassword, setRestoredPassword] = useState<string>('')
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
        <div className={styles.recoveryWrap}>
            <h3>Forgot your password?</h3>
            <div className={styles.inputWrap}>
                <label htmlFor='recovery/email'>Email</label>
                <input placeholder="Enter email..."
                       type="email"
                       value={restoredPassword}
                       onChange={onChangeRestoredPasswordHandler}
                       id={'recovery/email'}/>
            </div>
            <div>Enter your email address and we will send you further instructions.</div>
            <button className={styles.btn}
                    type="submit"
                    onClick={onRestoredPasswordHandler}>
                Send instructions
            </button>
            <div>Did you remember your password?</div>
            <div>
                <NavLink to={PATH.LOGIN}>Try to log in</NavLink>
            </div>
        </div>
    )
}

export default RecoveryPassword