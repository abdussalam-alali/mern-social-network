import axios from "axios";
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT
} from "../constants/auth.types";
import {setAlert} from "./alert.actions";
import setAuthToken from "../utils/setAuthToken";

// load user
export const loadUser = ()=> async dispatch=>{
     if(localStorage.token)
     {
         setAuthToken(localStorage.token);
     }
     try{
        const result = await axios.get('/auth');
        dispatch({type: USER_LOADED, payload: result.data });

     }catch (err) {
         dispatch({type: AUTH_ERROR})
     }
}


// Register user
export const register = ({name,email, password })=> async dispatch =>{
    const config ={
        headers:
            {
                'Content-Type':'application/json'
            }
    }
    const body = {
        name,
        email,
        password
    }
    try{
        const result = await axios.post('/users',body,config);
        dispatch({type: REGISTER_SUCCESS,payload: result.data});
        dispatch(loadUser());
    }catch (err) {
        const errors = err.response.data.errors;

        if(errors){
            errors.forEach(e => dispatch(setAlert(e.msg,'danger')));
        }
        dispatch({type: REGISTER_FAIL });

    }

}

export const login = (email,password)=> async dispatch =>{
    const config ={
        headers:
            {
                'Content-Type':'application/json'
            }
    }
    const body = {
        password,
        email,
    }
    try{
        const result = await axios.post('/auth/login',body,config);
        dispatch({type: LOGIN_SUCCESS,payload: result.data});
        dispatch(loadUser());

    }catch (err) {
        const errors = err.response.data.errors;

        if(errors){
            errors.forEach(e => dispatch(setAlert(e.msg,'danger')));
        }
        dispatch({type: LOGIN_FAIL });

    }

}

// logout clear profile
export const logout = () => dispatch=> {
    dispatch({type:LOGOUT})
}