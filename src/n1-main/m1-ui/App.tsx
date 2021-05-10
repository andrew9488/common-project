import React from 'react';
import './App.css';
import Header from './header/Header';
import Routes from "./routes/Routes";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../m2-bll/store";
import {RequestStatusType} from "./app-reducer";
import {Preloader} from "./common/preloader/Preloader";

const App: React.FC = () => {

    const appStatus = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)

    return (
        <div className="App">
            <Header/>
            {appStatus === "loading" && <Preloader/>}
            <Routes/>
        </div>
    );
}

export default App;
