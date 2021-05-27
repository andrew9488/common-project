import React from 'react';
import style from './Header.module.css';
import {NavLink} from 'react-router-dom';
import {PATH} from '../routes/Routes';
import {useSelector} from 'react-redux';
import {AppRootStateType} from '../../m2-bll/store';

import profileLogo from '../../../assets/icons-and-images/profile.png';
import packsLogo from '../../../assets/icons-and-images/packs.png';

const Header: React.FC = () => {

    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)

    return (
        <div className={style.headerContainer}>
            <nav className={style.navBlock}>
                {!isLoggedIn ?
                    <>
                        <div>
                            <NavLink to={PATH.LOGIN} activeClassName={style.active}>login</NavLink>
                        </div>
                        <div>
                            <NavLink to={PATH.REGISTRATION} activeClassName={style.active}>Registration</NavLink>
                        </div>
                        <div>
                            <NavLink to={PATH.RECOVERY_PASSWORD} activeClassName={style.active}>Recovery
                                password</NavLink>
                        </div>
                        <div>
                            <NavLink to={PATH.ENTER_NEW_PASSWORD} activeClassName={style.active}>Enter new
                                password</NavLink>
                        </div>
                    </>
                    : <>
                        <div>
                            <NavLink to={PATH.PACKS} activeClassName={style.active}>
                                <img src={packsLogo} alt="packsLogo"/>
                                Packs list</NavLink>
                        </div>
                        <div>
                            <NavLink exact to={PATH.PROFILE} activeClassName={style.active}>
                                <img src={profileLogo} alt="profileLogo"/>
                                Profile</NavLink>
                        </div>
                    </>
                }
            </nav>
        </div>
    )
}

export default Header