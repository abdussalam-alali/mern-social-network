import React from 'react';
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
const PrivateRoute = ({children: Component,isLogged}) => {
    if(!isLogged )
        return <Navigate to='/login' />
    return Component;
};

const mapStateToProps = state =>({
    isLogged: state.auth.isAuthenticated,
});
export default connect(mapStateToProps)(PrivateRoute);
