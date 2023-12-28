import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import NavBar from "../components/NavBar";

const url = 'http://localhost:2222/api/auth/signup';
async function SignUpUser(credentials) {
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials)
        });

        // if response is ok/200 or some fields already exist/409
        if (response.ok) {
            alert('Sign-up successful');
            return response;
        } else if (response.status === 409) {
            const data = await response.json();
            const field = data.field;

            // alert if username, email and phone number already exists
            if (field === "username") {
                alert('Username already exists');
            } else if (field === "email") {
                alert('Email already exists');
            } else if (field === "phone") {
                alert('Phone number already exists');
            } else if (field === "verification") {
                alert('Verification number already exists');
            }
        } else {
            throw new Error('Unexpected response/Error');
        }
    } catch (error) {
        console.error(error);
        alert('An error occurred during Sign-up');
    }
}


export default function SignUp() {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [verification, setVerification] = useState("");
    const [formError, setFormError] = useState('');
    const navigate = useNavigate();

    // test username with regex pattern
    const validateUsername = (inputUsername) => {
        const regex = /^[a-zA-Z0-9]+$/; // only letters and numbers
        const isUsernameValid = regex.test(inputUsername);

        if (!isUsernameValid) {
            setFormError('Username can only contain letters and numbers');
            return false;
        } else {
            setFormError('');
            return true;
        };

    };

    // test password with regex pattern
    const validatePassword = (inputPassword) => {
        const regex = /^(?=.*\d)[^\s]+$/; //at least one digit no spaces
        const isPasswordValid = regex.test(inputPassword);
    
        if (!isPasswordValid) {
            setFormError('Password must contain at least one number and no spaces');
            return false;
        } else {
            setFormError('');
            return true;
        }
    };

    // check input on change
    const inputOnChange = (value, setValue, validationFunction) => {
        setValue(value);
        validationFunction(value);
    };
    const passwordOnChange = (e) => {
        const password = e.target.value;
        inputOnChange(password, setPassword, validatePassword);
    };
    const usernameOnChange = (e) => {
        const username = e.target.value;
        inputOnChange(username, setUsername, validateUsername);
    };
    
    // handle from to server
    const handleSubmit = async e => {
        e.preventDefault();

        //check input validation
        const isPasswordValid = validatePassword(password);
        const isUsernameValid = validateUsername(username);

        if (!isPasswordValid) {
            alert('Please enter a valid Password');
            setFormError('Password must contain at least one number and no spaces');
            return;
        } else if (!isUsernameValid) {
            alert('Please enter a valid Username');
            setFormError('Username can only contain letters and numbers');
            return;
        }
         else {console.log('All field are valid');}

        // await server response
        const signupProgress = await SignUpUser({
            name,
            username,
            password,
            phone,
            email,
            address,
            verification
        });
        console.log('here is signup progress, ' + signupProgress)
        if (signupProgress) {
            navigate("/sign-in");
        } 
    };

    return(
        <div>
            <NavBar/>
            <h1>Sign up</h1>
            <form onSubmit={handleSubmit}>
                <label>Name:</label><br/>
                <input type="text" name="name" maxLength="225" minLength="4" onChange={e => setName(e.target.value)} value={name} placeholder="Enter Your Name"></input><br/>

                <label>Username: </label><br/>
                <input type="text" name="username" maxLength="225" minLength="6" onChange={usernameOnChange} value={username} placeholder="Enter Your Username"/><br/>

                <label>Password:</label><br/>
                <input type="password" name="password" maxLength="225" minLength="8" onChange={passwordOnChange} value={password} placeholder="Enter Your Password"/><br/>

                <label>Phone Number:</label><br/>
                <input type="number" name="phone" maxLength="12" minLength="8" onChange={e => setPhone(e.target.value)} value={phone} placeholder="Enter Your Phone Number"></input><br/>

                <label>Email Address:</label><br/>
                <input type="email" name="email" maxLength="225" onChange={e => setEmail(e.target.value)} value={email} placeholder="Enter Your Email Address"></input><br/>

                <label>Home Address:</label><br/>
                <input type="text" name="address" maxLength="225" onChange={e => setAddress(e.target.value)} value={address} placeholder="Enter Your Home Address"></input><br/>

                <label>Verification:</label><br/>
                <input type="number" name="verification" maxLength="225" onChange={e => setVerification(e.target.value)} value={verification} placeholder="Enter your CCCD"/><br/>

                {formError && <div style={{ color: 'red' }}>{formError}</div>}
                <input type="submit" /> 
            </form>
            <Link to="/sign-in">Have an account already?</Link>
        </div>
    )
}