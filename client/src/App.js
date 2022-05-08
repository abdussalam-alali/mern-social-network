import './App.css';
import {Fragment} from "react";
import Navbar from './components/layout/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import  AppRoutes  from './routes/index';
import Landing from "./components/layout/Landing";
import Alerts from "./components/layout/Alert";
import { Provider } from "react-redux";
import store from './store';

const App = ()=>
    <Provider store={store}>
        <Router>
            <Fragment>
                <Navbar />
                <Routes>
                    <Route exact path='/' element={(<Landing />)} />
                </Routes>
                <section className='container'>
                        <Alerts />
                        <AppRoutes />
                </section>
            </Fragment>
        </Router>
    </Provider>

export default  App;
