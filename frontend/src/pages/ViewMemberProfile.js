import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { Link } from "react-router-dom";



async function fetchMemberProfile(memberId, setMemberProfile) {
    try {
        const response = await fetch(`http://localhost:2222/api/member/get-member-by-memberId/${memberId}`)
        if (!response.ok) {
            console.error(response.status);
        }
        const result = await response.json();
        setMemberProfile(result.data);
    } catch (error) {
        console.log(error)
    }
}

export default function ViewMemberProfile() {
    const [memberProfile, setMemberProfile] = useState(null);
    const memberId = JSON.parse(localStorage.getItem("user")).id;
    
    useEffect(() => {
        fetchMemberProfile(memberId, setMemberProfile);
    }, [memberId])

    
    return (
        <div>
            <NavBar/>
            <h1>Your Profile</h1>
                {memberProfile && (
                    <>
                        <ul>
                            { Object.entries(memberProfile).map(([index, member]) => 
                                {return(
                                    <>
                                        <li>Address: {member.address}</li>
                                        <li>Email: {member.email}</li>
                                        <li>Name: {member.name}</li>
                                        <li>Username: {member.username}</li>
                                        <li>Password: {member.password}</li>
                                        <li>Phone: {member.phone}</li>
                                        <li>Verification: {member.verification}</li>
                                    </>
                                )}
                            )}
                        </ul>
                        <Link to={`/edit-profile/${memberId}`}>Edit Profile</Link>
                    </>
                )}
        </div>
    )
    
}