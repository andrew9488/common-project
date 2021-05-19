import React from "react";
import style from "./Error.module.css"
import {NavLink} from "react-router-dom";
import {PATH} from "../../n1-main/m1-ui/routes/Routes";

const Error: React.FC = () => {
    return (
        <div className={style.error}>
            <div>ERROR 404</div>
            <div>The cat couldn't find a page!</div>
            <div className={style.errorCat}>—ฅ/ᐠ.̫ .ᐟ\ฅ—</div>
            <nav>
                <div className={style.item}>
                    <NavLink to={PATH.LOGIN}>go home</NavLink>
                </div>
            </nav>
        </div>
    );
}

export default Error;