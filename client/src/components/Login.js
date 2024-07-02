
import React, { useState } from "react";
import Axios from "axios";
import Cookies from "universal-cookie";


function Login({ setIsAuth }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const cookies = new Cookies();



const login = () => {
        Axios.post("http://localhost:3001/login", { username, password }, { withCredentials: true })
            .then((res) => {
                const { token, userId, firstName, lastName, username} = res.data;

                cookies.set("token", token, { path: '/', sameSite: 'Lax' });
                cookies.set("userId", userId, { path: '/', sameSite: 'Lax' });
                cookies.set("username", username, { path: '/', sameSite: 'Lax' });
                cookies.set("firstName", firstName, { path: '/', sameSite: 'Lax' });
                cookies.set("lastName", lastName, { path: '/', sameSite: 'Lax' });
                setIsAuth(true);
            })
            .catch((error) => {
                console.error("There was an error logging in!", error);
            });
    };

    return (
        <div className="login">
            <label>Login</label>
            <input
                placeholder="Username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
            />
            <input
                placeholder="Password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
            />
            <button onClick={login}>Login</button>
        </div>
    );
}

export default Login;
