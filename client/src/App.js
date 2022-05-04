import './App.css';
import {Fragment} from "react";
import Navbar from './components/layout/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import  AppRoutes  from './routes/index';
import Landing from "./components/layout/Landing";
const App = ()=>
    <Router>
        <Fragment>
            <Navbar />
            <Routes>
                <Route exact path='/' element={(<Landing />)} />
            </Routes>
            <section className='container'>
                    <AppRoutes />
            </section>
        </Fragment>
    </Router>


export default  App;
