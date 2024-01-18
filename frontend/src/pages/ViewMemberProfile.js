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

const ViewMemberProfile = () => {
    const [memberProfile, setMemberProfile] = useState(null);
    const [itemData, setItemData] = useState(null); 
    const [transactionData, setTransactionData] = useState(null); 
    const memberId = JSON.parse(localStorage.getItem("user")).id;

    
    useEffect(() => {
        fetchMemberProfile(memberId, setMemberProfile);
    }, [memberId])

    useEffect(() => {
        fetch(`http://localhost:2222/api/campaign/get-following-campaign-by-memberId?memberId=${memberId}`)
            .then(response => {
                if (!response.ok) {
                    console.error(response.status);
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(result => {
                const transactionList = result.transactionData || [];
                const itemList = result.itemData || [];
                setTransactionData(transactionList);
                setItemData(itemList);
            })
            .catch(error => {
                console.error('Error during fetch:', error);
            })
    
    }, [memberId]);
    
    
    return (
        <div>
            <NavBar/>
            <h1>Your Profile</h1>
                {memberProfile && (
                    <>
                        <ul>
                            <li key='profile'>
                            { Object.entries(memberProfile).map(([index, member]) => 
                                {return(
                                    <>  
                                        <p>Name: {member.name}</p>
                                        <p>Username: {member.username}</p>
                                        <p>Password: {member.password.replace(/./g, '*')}</p>
                                        <p>Email: {member.email}</p>
                                        <p>Phone: {member.phone}</p>
                                        <p>Address: {member.address}</p>
                                        <p>Verification: {member.verification}</p>                                        
                                    </>
                                )}
                            )}
                            </li>
                        </ul>
                        <Link to={`/edit-profile/${memberId}`}>Edit Profile</Link>
                    </>
                )}

            <h2>Following Campaigns and Donation details</h2>

            <h4>Item Donation</h4>
            <ul>
                {itemData && itemData.length > 0 ? (
                    itemData.map(item => (
                        <li key={item.id}>
                            <p>Name: {item.name}</p>
                            <p>Campaign: {item.campaignId}</p>
                        </li>
                    ))
                ) : (
                    <p>No items available</p>
                )}
            </ul>

            <h4>Money Donation</h4>
            <ul>
                {transactionData && transactionData.length > 0 ? (
                    transactionData.map(transaction => (
                        <li key={transaction.id}>
                            <p>Amount: {transaction.amount}</p>
                            <p>Account: {transaction.account}</p>
                            <p>Campaign: {transaction.campaignId}</p>
                        </li>
                    ))
                ) : (
                    <p>No transactions available</p>
                )}
            </ul>

        </div>
    )
}

export default ViewMemberProfile;
