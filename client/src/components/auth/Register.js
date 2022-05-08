import React, {useState} from 'react';
function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
    });

    const { name, password, password2, email }  = formData;
    const updateState = e => setFormData({...formData, [e.target.name]: e.target.value});
    const handleSubmit = async e => {
        e.preventDefault();
        if(password!==password2)
            console.log('password doesnt match');
        else
        {
            console.log("success");
        }
    }
    return (
        <>
            <h1 className="large text-primary">Sign Up</h1>
            <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
            <form className="form" onSubmit={(e) => handleSubmit(e)}>
                <div className="form-group">
                    <input type="text" placeholder="Name" name='name' value={name} onChange={(e)=>{updateState(e)}} required/>
                </div>
                <div className="form-group">
                    <input type="email" placeholder="Email Address" value={email} name="email"  onChange={e => updateState(e)} />
                    <small className="form-text"
                    >This site uses Gravatar so if you want a profile image, use a
                        Gravatar email</small
                    >
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
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        name="password2"
                        value={password2}
                        onChange={e => updateState(e)}
                        minLength="6"
                    />
                </div>
                <input type="submit" className="btn btn-primary" value="Register"/>
            </form>
            <p className="my-1">
                Already have an account? <a href="/login">Sign In</a>
            </p>
        </>
    );
}

export default Register;