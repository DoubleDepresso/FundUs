import NavBar from "../components/NavBar"
import Footer from "../components/footer";

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

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
        <div className="App">
            <div className="Header"><NavBar/></div>
            <div className="Content">
                <h1>Sign in</h1>
                <form onSubmit={handleSubmit}>
                    <label> Username: </label> <br/>
                    <input type="text" name="username" onChange={e => setUsername(e.target.value)} value={username} placeholder="Enter Your Username"/><br/>
                    <label>Password:</label><br/>
                    <input type="password" name="password" onChange={e => setPassword(e.target.value)} value={password} placeholder="Enter Your Password"/><br/>
                    <input type="submit" />
                </form>
                <Link to="/sign-up">Don't have an account yet?</Link>
            </div>
            <div className="Footer"><Footer/></div>
        </div>
    )
}