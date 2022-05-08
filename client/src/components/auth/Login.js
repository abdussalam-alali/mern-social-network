import React, {useState} from 'react';
import {Link} from "react-router-dom";
function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const { password, email }  = formData;
    const updateState = e => setFormData({...formData, [e.target.name]: e.target.value});

    const handleSubmit = async e => {

    }
    return (
        <>
            <h1 className="large text-primary">Sign In</h1>
            <p className="lead"><i className="fas fa-user"></i> Sign into your Account</p>
            <form className="form" onSubmit={(e) => handleSubmit(e)}>
                <div className="form-group">
                    <input type="email" placeholder="Email Address" value={email} name="email"  onChange={e => updateState(e)} />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        name="password"
                        onChange={e => updateState(e)}
                        minLength="6"
                    />
                </div>
                <input type="submit" className="btn btn-primary" value="Login"/>
            </form>
            <p className="my-1">
               Don't have an account? <Link to="/register">Sign up</Link>
            </p>
        </>
    );
}

export default Login;