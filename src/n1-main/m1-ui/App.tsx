import React from 'react';
import {HashRouter} from 'react-router-dom';
import './App.css';
import Header from './header/Header';
import Routes from "./routes/Routes";
import {Provider} from "react-redux";
import {store} from "../m2-bll/store";

const App: React.FC = () => {
    return (
        <HashRouter>
            <Provider store={store}>
                <div className="App">
                    <Header/>
                    <Routes/>
                </div>
            </Provider>
        </HashRouter>
    );
}

export default App;
