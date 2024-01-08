import { useState } from "react";
import NavBar from "../components/NavBar";
import { Link } from "react-router-dom";


export default function SignUp() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return(
        <div>
            <NavBar/>
            <h1>Sign up</h1>
            <form>
                <label>First Name:</label><br/>
                <input type="text" name="firstname" placeholder="Enter Your First Name"></input><br/>
                <label>Last Name:</label><br/>
                <input type="text" name="lastname" placeholder="Enter Your Last Name"></input><br/>
                <label>Email Address:</label><br/>
                <input type="email" name="email" placeholder="Enter Your Email Address"></input><br/>
                <label>Username: </label><br/>
                <input type="text" name="username" onChange={e => setUsername(e.target.value)} value={username} placeholder="Enter Your Username"/><br/>
                <label>Password:</label><br/>
                <input type="text" name="password" onChange={e => setPassword(e.target.value)} value={password} placeholder="Enter Your Password"/><br/>
                <input type="submit" /> 
            </form>
            <Link to="/sign-in">Have an account already?</Link>
        </div>
    )
}