import React from "react";
import style from "./Header.module.css";
import {NavLink} from "react-router-dom";
import {PATH} from "../routes/Routes";

const Header: React.FC = () => {
    return (
        <div className={style.headerContainer}>
            <nav className={style.navBlock}>
                <div>
                    <NavLink to={PATH.PROFILE} activeClassName={style.active}>Profile</NavLink>
                </div>
                <div>
                    <NavLink to={PATH.LOGIN} activeClassName={style.active}>login</NavLink>
                </div>
                <div>
                    <NavLink to={PATH.REGISTRATION} activeClassName={style.active}>Registration</NavLink>
                </div>
                <div>
                    <NavLink to={PATH.RECOVERY_PASSWORD} activeClassName={style.active}>Recovery password</NavLink>
                </div>
                <div>
                    <NavLink to={PATH.ENTER_NEW_PASSWORD} activeClassName={style.active}>Enter new password</NavLink>
                </div>
                <div>
                    <NavLink to={PATH.TEST_PAGE} activeClassName={style.active}>Test page</NavLink>
                </div>
            </nav>
        </div>
    )
}

export default Header