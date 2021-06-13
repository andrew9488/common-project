import React, {useEffect} from 'react';
import './App.css';
import Header from './header/Header';
import Routes from "./routes/Routes";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../m2-bll/store";
import {initializedAppTC, RequestStatusType} from "./app-reducer";
import {Preloader} from "./common/preloader/Preloader";

const App: React.FC = () => {

    const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized);
    const appStatus = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(initializedAppTC())
    }, [dispatch])

    if (!isInitialized) {
        return <Preloader/>
    }

    return (
        <div className="App">
            <Header/>
            {appStatus === "loading" && <Preloader/>}
            <Routes/>
        </div>
    );
}

export default App;
