import { useState } from "react";
import NavBar from "../components/NavBar";
import { Link } from "react-router-dom";
import { Form } from "react-router-dom";
import "../styles/Authentication.css";


export default function SignUp() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return(
        <div>
            <div>
                <NavBar/>
            </div>
            <div>
                <h1>Sign up</h1>
                {/* Restructure form */}
                <form>
                    <div id="form-input">
                        <label htmlFor="firstname">First Name:</label><br/>
                        <input id="firstname" type="text" name="firstname" placeholder="Enter Your First Name"></input><br/>
                    </div>
                    <div id="form-input">
                        <label htmlFor="lastname">Last Name:</label><br/>
                        <input id="lastname" type="text" name="lastname" placeholder="Enter Your Last Name"></input><br/>
                    </div>
                    <div id="form-input">
                        <label htmlFor="email">Email Address:</label><br/>
                        <input id="email" type="email" name="email" placeholder="Enter Your Email Address"></input><br/>
                    </div>
                    <div id="form-input">
                        <label htmlFor="username">Username: </label><br/>
                        <input id="username" type="text" name="username" onChange={e => setUsername(e.target.value)} value={username} placeholder="Enter Your Username"/><br/>
                    </div>
                    <div id="form-input">
                        <label htmlFor="password">Password:</label><br/>
                        <input id="password" type="text" name="password" onChange={e => setPassword(e.target.value)} value={password} placeholder="Enter Your Password"/><br/>
                    </div>
                    <input id="btn" type="submit" /> 
                </form>
                <Link to="/sign-in">Have an account already?</Link>
            </div>
        </div>
    )
}