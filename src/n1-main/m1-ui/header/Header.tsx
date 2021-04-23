import React from "react";
import {NavLink} from "react-router-dom";
import {PATH} from "../routes/Routes";

const Header: React.FC = () => {
    return (
        <div>
            <h4>NAVBAR</h4>
            <nav>
                <div>
                    <NavLink to={PATH.PROFILE}>Profile</NavLink>
                </div>
                <div>
                    <NavLink to={PATH.LOGIN}>login</NavLink>
                </div>
                <div>
                    <NavLink to={PATH.REGISTRATION}>Registration</NavLink>
                </div>
                <div>
                    <NavLink to={PATH.RECOVERY_PASSWORD}>Recovery password</NavLink>
                </div>
                <div>
                    <NavLink to={PATH.ENTER_NEW_PASSWORD}>Enter new password</NavLink>
                </div>
                <div>
                    <NavLink to={PATH.TEST_PAGE}>Test page</NavLink>
                </div>
            </nav>
        </div>
    )
}

export default Header