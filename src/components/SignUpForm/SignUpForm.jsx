import axios from "axios";
import { NavLink } from "react-router-dom";
import { useState } from "react";

const SignUpForm = () => {

    const [newUser, setNewUser] = useState({
        username: ``,
        name: ``,
        email: ``,
        password: ``
    });

    const handleChange = e => {
        const { name, value } = e.target;
        setNewUser({
            ...newUser,
            [name]: value
        });
    };

    const register = async (e) => {
        e.preventDefault();
        const res = await axios.post(`http://localhost:4000/register`, { newUser: newUser });
        alert(res.data.message)
        setNewUser({
            username: ``,
            name: ``,
            email: ``,
            password: ``
        });
    };

    return (
        <article className="col">
            <div className="card mb-4 rounded-3 shadow-sm">
                <div className="card-header py-3">
                    <h1 className="my-0 fw-normal">Joining Chitter today?</h1>
                </div>
                <div className="card-body">
                    <form className="container d-grid gap-3" onSubmit={register} >
                        <div className="row">
                            <label htmlFor="username" className="col">Username:</label><input type="text" name="username" id="username" className="col" value={newUser.username} onChange={handleChange} />
                        </div>
                        <div className="row">
                            <label htmlFor="name" className="col">Name:</label><input type="text" name="name" id="name" className="col" value={newUser.name} onChange={handleChange} />
                        </div>
                        <div className="row">
                            <label htmlFor="email" className="col">Email:</label><input type="email" name="email" id="email" className="col" value={newUser.email} onChange={handleChange} />
                        </div>
                        <div className="row">
                            <label htmlFor="password" className="col">Password:</label><input type="password" name="password" id="password" className="col" value={newUser.password} onChange={handleChange} />
                        </div>
                        <div className="row">
                            <input type="submit" value="Sign me up!" className="w-50 btn btn-lg btn-outline-primary mx-auto" />
                        </div>
                    </form>
                </div>
                <p className="m-3">Already a user? <NavLink to="/">Click here to sign in.</NavLink></p>
            </div>
        </article>
    );
};

export default SignUpForm;