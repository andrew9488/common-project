import React from 'react';
import {HashRouter} from 'react-router-dom';
import './App.css';
import Header from './header/Header';
import Routes from "./routes/Routes";

const App: React.FC = () => {
    return (
        <HashRouter>
            <div className="App">
                <Header/>
                <Routes/>
            </div>
        </HashRouter>
    );
}

export default App;
