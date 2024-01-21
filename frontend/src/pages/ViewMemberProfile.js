import NavBar from "../components/NavBar"
import Footer from "../components/footer";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

async function fetchMemberProfile(memberId, setMemberProfile) {
    try {
        const response = await fetch(`https://fundus-nodejs-783e866fbb5e.herokuapp.com/api/member/get-member-by-memberId/${memberId}`)
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
        fetch(`https://fundus-nodejs-783e866fbb5e.herokuapp.com/api/campaign/get-following-campaign-by-memberId?memberId=${memberId}`)
            .then(response => {
                if (!response.ok) {
                    console.error(response.status);
                    throw new Error('Fetcing data failed');
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
        <div className="App">
            <div className="Header"><NavBar/></div>
            <div className="Content">
                <h1>Your Profile</h1>
                    {memberProfile && (
                        <>
                            <ul>
                                <li key='profile'>
                                { Object.entries(memberProfile).map(([index, member]) => 
                                    {return(
                                        <div className="campaign-containter">  
                                            <p>Name: {member.name}</p>
                                            <p>Username: {member.username}</p>
                                            <p>Password: {member.password.replace(/./g, '*')}</p>
                                            <p>Email: {member.email}</p>
                                            <p>Phone: {member.phone}</p>
                                            <p>Address: {member.address}</p>
                                            <p>Verification: {member.verification}</p>     
                                            <Link className="link-button" to={`/edit-profile/${memberId}`}>Edit Profile</Link>                                   
                                        </div>
                                    )}
                                )}
                                </li>
                            </ul>
                        </>
                    )}

                <h2 className="style-text">Following Campaigns and Donation details</h2>

                <h4 className="style-text">Item Donation</h4>
                <ul>
                    {itemData && itemData.length > 0 ? (
                        itemData.map(item => (
                            <div className="campaign-containter">
                                <li key={item.id}>
                                    <p>Name: {item.name}</p>
                                    <p>Campaign: {item.campaignId}</p>
                                    <p><Link className="link-button" to={`/view-campaign-detail/${item.campaignId}`}>Campaign Detail</Link></p>
                                </li>
                            </div>
                        ))
                    ) : (
                        <p>No items available</p>
                    )}
                </ul>

                <h4 className="style-text">Money Donation</h4>
                <ul>
                    {transactionData && transactionData.length > 0 ? (
                        transactionData.map(transaction => (
                            <div className="campaign-containter">
                                <li key={transaction.id}>
                                    <p>Amount: {transaction.amount}</p>
                                    <p>Account: {transaction.account}</p>
                                    <p>Campaign: {transaction.campaignId}</p>
                                    <p><Link className="link-button" to={`/view-campaign-detail/${transaction.campaignId}`}>Campaign Detail</Link></p>
                                </li>
                            </div>
                        ))
                    ) : (
                        <p>No transactions available</p>
                    )}
                </ul>
            </div>
            <div className="Footer"><Footer/></div>
        </div>
    )
}

export default ViewMemberProfile;
