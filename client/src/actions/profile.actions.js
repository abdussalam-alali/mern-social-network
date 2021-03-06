import {GET_PROFILE, PROFILE_ERROR} from "../constants/profile.types";
import axios from "axios";
import { setAlert } from "./alert.actions";


export const getCurrentProfile = ()=> async dispatch=>{
    try{
        const res = await axios.get('/profile/me');
        dispatch({type: GET_PROFILE, payload: res.data });

    }catch (err) {
        dispatch({type: PROFILE_ERROR, payload: { msg: err.response.statusText, status: err.response.status}});
    }
}

