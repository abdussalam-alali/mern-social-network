import {GET_PROFILE, PROFILE_ERROR} from "../constants/profile.types";

const initialState = {
    profile: null,
    profiles: [],
    respos: [],
    loading: true,
    error: {}
};
const profileReducer = (state = initialState,action)=>{
    const { payload, type } = action;
    switch (type){
        case GET_PROFILE:
            return {
                ...state,
                profile: payload,
                loading: false,
            }
        case PROFILE_ERROR:
            return {
                ...state,
                error: payload,
                loading: false,
            }
        default:
            return state;
    }
}

export default profileReducer;