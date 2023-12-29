import { Link, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import { useState } from "react";
import { Form } from "react-router-dom";
import "../styles/Authentication.css";

const url = 'http://localhost:2222/api/auth/signin';
async function SigninUser(credentials) {
    return fetch(url, {
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify(credentials)
    })
    .then(data => { 
        if (data.ok) {
            return data.json();
        }
    })
    .then(data => {
        console.log(data)
        localStorage.setItem("token", JSON.stringify(data.accessToken));
        localStorage.setItem("user", JSON.stringify(data));
        return data;
    })
    .catch(error => {
        console.error(error);
    })
}

export default function SignIn() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();
        const token = await SigninUser({
            username,
            password
        });
        if (token) {
            navigate("/")
        } else {
            alert("Invalid username or password! Please try again");
            setUsername("");
            setPassword("");
        }
    }
    return (
        <div>
            <div>
                <NavBar/>
            </div>
            <div>
            <h1>Sign in</h1>
                {/* Restructure form */}
                <form onSubmit={handleSubmit}>
                    <div id="form-input">
                        <label htmlFor="username"> Username:</label><br/>
                        <input id="username" type="text" name="username" onChange={e => setUsername(e.target.value)} value={username} placeholder="Enter Your Username"/><br/>
                    </div>
                    <div id="form-input">
                        <label htmlFor="password">Password:</label><br/>
                        <input id="password" type="text" name="password" onChange={e => setPassword(e.target.value)} value={password} placeholder="Enter Your Password"/><br/>
                    </div>
                    <input id="btn" type="submit" />
                </form>
            </div>
            <Link to="/sign-up">Don't have an account yet?</Link>
        </div>
    )
}