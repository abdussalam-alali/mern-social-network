import { REGISTER_SUCCESS, REGISTER_FAIL,AUTH_ERROR,USER_LOADED,LOGIN_SUCCESS,LOGIN_FAIL, LOGOUT } from "../constants/auth.types";
const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
};



const authReducer = (state=initialState, action) =>{
    const { type, payload } = action;
    switch (type){
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                user: payload,
                loading: false
            }
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token',payload.data.token);
            return {
                ...state,
                ...payload.data,
                isAuthenticated: true,
                loading: false,
            }
        case REGISTER_FAIL:
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
            }
        default:
            return state;
    }
}

export default authReducer;
