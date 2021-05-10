import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../m2-bll/store';
import {logOutTC} from './profile-reducer';
import {Redirect} from 'react-router-dom';
import {PATH} from '../routes/Routes';
import {initializedAppTC} from "../app-reducer";

const Profile: React.FC = () => {

    const dispatch = useDispatch();
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn);

    useEffect(() => {
        dispatch(initializedAppTC())
    }, [])

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
            <button onClick={onLogOutHandler}>Log out</button>
        </div>
    )
}

export default Profile