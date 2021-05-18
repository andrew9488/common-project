import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import Login from "../../../n2-features/f1-auth/a1-login/Login";
import Registration from "../../../n2-features/f1-auth/a2-registration/Registration";
import RecoveryPassword from "../../../n2-features/f1-auth/a3-recovery-password/RecoveryPassword";
import EnterNewPassword from "../../../n2-features/f1-auth/a4-enter-new-password/EnterNewPassword";
import Error from "../../../n3-utils/u1-error/Error";
import TestPage from "../test-page/Tests";
import Profile from "../profile/Profile";
import {Packs} from "../packs/Packs";
import Cards from "../cards/Cards";
import LearnPage from "../learnPage/LearnPage";

export const PATH = {
    PROFILE: "/profile",
    LOGIN: "/login",
    REGISTRATION: "/registration",
    RECOVERY_PASSWORD: "/recovery_password",
    ENTER_NEW_PASSWORD: "/enter_new_password",
    TEST_PAGE: "/test_page",
    PACKS: "/packs",
    CARDS: "/cards",
    LEARN: "/learn",
    ERROR: "/404",
}

const Routes: React.FC = () => {
    return (
        <div>
            <Switch>
                <Route exact path={PATH.LOGIN} render={() => <Login/>}/>
                <Route path={PATH.PROFILE} render={() => <Profile/>}/>
                <Route path={PATH.REGISTRATION} render={() => <Registration/>}/>
                <Route path={PATH.RECOVERY_PASSWORD} render={() => <RecoveryPassword/>}/>
                <Route path={PATH.ENTER_NEW_PASSWORD} render={() => <EnterNewPassword/>}/>
                <Route path={PATH.PACKS} render={() => <Packs/>}/>
                <Route path={`${PATH.CARDS}/:cardsPack_id?`} render={() => <Cards/>}/>
                <Route path={`${PATH.LEARN}/:cardsPack_id?`} render={() => <LearnPage/>}/>
                <Route path={PATH.TEST_PAGE} render={() => <TestPage/>}/>
                <Route path={PATH.ERROR} render={() => <Error/>}/>
                <Redirect from={"*"} to={PATH.ERROR}/>
            </Switch>
        </div>
    );
}

export default Routes;