import './App.css';
import {Fragment, useEffect} from "react";
import Navbar from './components/layout/Navbar';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import  AppRoutes  from './routes/index';
import Landing from "./components/layout/Landing";
import Alerts from "./components/layout/Alert";
import { Provider } from "react-redux";
import store from './store';
import setAuthToken from "./utils/setAuthToken";
import {loadUser} from "./actions/auth.actions";

if(localStorage.token)
    setAuthToken(localStorage.token);


const App = ()=> {
    useEffect(()=>{
        store.dispatch(loadUser());
    },[]);
    console.log(AppRoutes);
    return (
        <Provider store={store}>
            <Router>
                <Fragment>
                    <Navbar />
                    <Routes>
                        <Route path='/' element={(<Landing />)} />
                    </Routes>
                    <section className='container'>
                        <Alerts />
                        <Routes>
                            { AppRoutes.map(route=>(<Route {...route } />))}
                        </Routes>
                    </section>
                </Fragment>
            </Router>
        </Provider>
    )
}
export default  App;
