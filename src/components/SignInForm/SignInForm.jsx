import axios from "axios";
import { NavLink } from "react-router-dom";
import { useState } from "react";

const SignInForm = ({ setLoginUser }) => {

    const [user, setUser] = useState({
        username: ``,
        password: ``
    });

    const handleChange = e => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        });
    };

    const login = async (e) => {
        e.preventDefault();
        const res = await axios.post(`http://localhost:4000/login`, user);
        alert(res.data.message)
        if (res.data.user) { setLoginUser(res.data.user); }
        setUser({ username: ``, password: `` });
    };

    return (
        <aside className="col" >
            <div className="card mb-4 rounded-3 shadow-sm">
                <div className="card-header py-3">
                    <h1 className="my-0 fw-normal"> Sign in to Peep!</h1>
                </div>
                <div className="card-body">
                    <form className="container d-grid gap-3" onSubmit={login}>
                        <div className="row">
                            <label htmlFor="username" className="col">Username:</label><input type="text" name="username" id="username" className="col" value={user.username} onChange={handleChange} />
                        </div>
                        <div className="row">
                            <label htmlFor="password" className="col">Password:</label><input type="password" name="password" id="password" className="col" value={user.password} onChange={handleChange} />
                        </div>
                        <div className="row">
                            <input type="submit" value="Sign in" className="w-50 btn btn-lg btn-outline-primary mx-auto" />
                        </div>

                    </form>
                    <p className="m-3">Not registered? <NavLink to="/signup">Click here to sign up.</NavLink></p>

                </div>
            </div>
        </aside>
    );
};

export default SignInForm;