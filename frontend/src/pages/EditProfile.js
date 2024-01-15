import { Link, useNavigate, useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import { useState, useEffect } from "react";

async function submitForm(values) {
    return fetch("http://localhost:2222/api/member/edit-member", {
        method: "PUT",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify(values)
    })
    .then(data => { 
        if (data.ok) {
            return data.json();
        }
    })
    .catch(error => {
        console.error(error);
    });
};
export default function EditProfile() {
    let id = (useParams().memberId);
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [verification, setVerification] = useState("");

    const [member, setMember] = useState(null);


    useEffect(() => {
        async function fetchData () {
          try {
            const response = await fetch(`http://localhost:2222/api/member/get-member-by-memberId/${id}`);
    
            if (!response.ok) {
              console.error(`HTTP error! Status: ${response.status}`);
            }
    
            const result = await response.json();
            setMember(result.data[0]);
          } catch (error) {
            console.error(error);
          }
        };
        fetchData();
    }, []);
    useEffect(() => {
        if (member) {
            setName(member.name || "");
            setUsername(member.username || "");
            setPassword(member.password || "");
            setAddress(member.address || "");
            setEmail(member.email || 0);
            setVerification(member.verification || "");
            setPhone(member.phone || "");
        }
    }, [member])

    const handleSubmit = async e => {
        e.preventDefault();
        const response = await submitForm({
            name,
            username,
            password,
            phone,
            email,
            address,
            verification
        });
        if (response.success) {
            alert("Your information is updated sucessfully!");
            navigate("/view-profile");
        }

    }
    return(
        <>
            <NavBar/>
            <h1>Edit Profile</h1>
            {member && (
                <>
                    <form onSubmit={handleSubmit}>
                        <label>Name: </label> <br/>
                        <input type="text" name="name" onChange={e => setName(e.target.value)} 
                        value={name}/><br/>
                        
                        <label>Address:</label><br/>
                        <input type="text" name="address" onChange={e => setAddress(e.target.value)} 
                        value={address}/><br/>
                        
                        <label>Phone:</label><br/>
                        <input type="text" name="phone" onChange={e => setPhone(e.target.value)} 
                        value={phone}/><br/>
                        
                        <label>Username:</label><br/>
                        <input type="text" name="username" onChange={e => setUsername(e.target.value)} 
                        value={username}/><br/>
                        
                        <label>Password:</label><br/>
                        <input type="text" name="phone" onChange={e => setPassword(e.target.value)} 
                        value={password}/><br/>
                        
                        <label>Email:</label><br/>
                        <input type="text" name="email" onChange={e => setEmail(e.target.value)} 
                        value={email}/><br/>
                        
                        <label>Verification:</label><br/>
                        <input type="text" name="verification" onChange={e => setVerification(e.target.value)} 
                        value={verification}/><br/>
                        <input type="submit" />
                    </form>
                </>
            )}
        </>
    )
}