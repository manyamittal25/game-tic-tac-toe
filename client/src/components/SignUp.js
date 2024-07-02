
import React, { useState } from "react";
import Axios from "axios";
import Cookies from "universal-cookie";

function SignUp({setIsAuth}) {
    const cookies = new Cookies();
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        username: "",
        password: ""
    });

    const signUp = () => {
        Axios.post("http://localhost:3001/signup", user, { withCredentials: true })
            .then((res) => {
                const { token, userId, firstName, lastName, username, hashedPassword } = res.data;

                cookies.set("token", token, { path: '/', sameSite: 'Lax' });
                cookies.set("userId", userId, { path: '/', sameSite: 'Lax' });
                cookies.set("username", username, { path: '/', sameSite: 'Lax' });
                cookies.set("firstName", firstName, { path: '/', sameSite: 'Lax' });
                cookies.set("lastName", lastName, { path: '/', sameSite: 'Lax' });
                cookies.set("hashedPassword", hashedPassword, { path: '/', sameSite: 'Lax' });
                setIsAuth(true);
            })
            .catch((error) => {
                console.error("There was an error signing up!", error);
            });
    };

    return (
        <div className="signUp">
            <label>Sign Up</label>
            <input
                placeholder="First Name"
                onChange={(event) => {
                    setUser({ ...user, firstName: event.target.value });
                }}
            />
            <input
                placeholder="Last Name"
                onChange={(event) => {
                    setUser({ ...user, lastName: event.target.value });
                }}
            />
            <input
                placeholder="Username"
                onChange={(event) => {
                    setUser({ ...user, username: event.target.value });
                }}
            />
            <input
                placeholder="Password"
                type="password"
                onChange={(event) => {
                    setUser({ ...user, password: event.target.value });
                }}
            />
            <button onClick={signUp}>Sign Up</button>
        </div>
    );
}

export default SignUp;

