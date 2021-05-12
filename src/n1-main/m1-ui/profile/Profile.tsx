import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../m2-bll/store';
import {Redirect} from 'react-router-dom';
import {PATH} from '../routes/Routes';
import {RequestStatusType} from '../app-reducer';
import {logOutTC} from '../../../n2-features/f1-auth/a1-login/auth-reducer';


const Profile: React.FC = () => {

    const dispatch = useDispatch();
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn);
    const appStatus = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status);

    const onLogOutHandler = () => {
        dispatch(logOutTC());
    }

    if (!isLoggedIn) {
        return <Redirect to={PATH.LOGIN}/>
    }


    return (
        <div>
            Profile
            <br/>
            <button onClick={onLogOutHandler} disabled={appStatus === 'loading'}>Log out</button>
        </div>
    )
}

export default Profile