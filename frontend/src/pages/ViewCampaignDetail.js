import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { Link, useParams } from "react-router-dom";
import { type } from "@testing-library/user-event/dist/type";


// fetch the detail of campaign
async function fetchCampaignDetail(campaignId, setCampaignDetail) {
    try {
        const response = await fetch(`http://localhost:2222/api/campaign/get-campaign-by-campaignId/${campaignId}`)
        if (!response.ok) {
            console.error(response.status);
        }
        const result = await response.json();
        setCampaignDetail(result.data);
    } catch (error) {
        console.log(error)
    }
}

// fetch the the transactions by the campaignId
async function fetchTransaction(campaignId, setTransactions) {
    try {
        const response = await fetch(`http://localhost:2222/api/transaction/get-transaction-by-campaignId/${campaignId}`)
        if (!response.ok) {
            console.error(response.status);
        }
        const result = await response.json();
        if (result.success && result.message.length > 0) {
            setTransactions(result.message);
        }
    } catch (error) {
        console.log(error)
    }
}
// fetch physical item history by the campaignId
async function fetchItemHistory(campaignId, setItems) {
    try {
        const response = await fetch(`http://localhost:2222/api/item/get-item-by-campaignId/${campaignId}`)
        if (!response.ok) {
            console.error(response.status);
        }
        const result = await response.json();
        if (result.success && result.message.length > 0) {
            setItems(result.message);
        }
    } catch (error) {
        console.log(error)
    }
}

export default function ViewCampaignDetail() {
    const [campaignDetail, setCampaignDetail] = useState(null);
    const [transactions, setTransactions] = useState(null);
    const [items, setItems] = useState(null);
    const campaignId = useParams().campaignId;
    let totalMoney = 0;

    useEffect(() => {
        fetchCampaignDetail(campaignId, setCampaignDetail);
        fetchTransaction(campaignId, setTransactions);
        fetchItemHistory(campaignId, setItems)
    }, [])
    if (transactions) {
        console.log(typeof transactions)
        Object.entries(transactions).map(([index, transaction]) => {
            totalMoney += transaction.amount;
        });
    }


    return (
        <div>
            <NavBar/>
            <h1>Campaign Detail</h1>
                <ul>
                    {campaignDetail && Object.entries(campaignDetail).map(([index, campaign]) =>
                        {return(
                            <>
                                <li key={campaign.name}>Name of Campaign: {campaign.name}</li>
                                <li key={campaign.location}>Location: {campaign.location}</li>
                                <li key={campaign.description}>Description: {campaign.description}</li>
                                <li key={campaign.hostId}>Host: {campaign.member.name}</li>
                                {campaign.moneyDonation && <li>Goal: {campaign.moneyGoal} VND</li>}
                                {campaign.physicalDonation && <li>Goal: {campaign.physicalGoal}</li>}
                                <li key={campaign.startDate}>Start date: {campaign.startDate.split("T")[0]}</li>
                                <li key={campaign.endDate}>End date: {campaign.endDate.split("T")[0]}</li>
                                <li>The way you can help: {
                                campaign.physicalDonation === true && (
                                    <Link class="link" to={`/donate-item/${campaign.id}`}>Donate Item</Link>
                                )}
                                {campaign.moneyDonation === true && (
                                <Link class="link" to={`/donate-money/${campaign.id}`}>Donate Money</Link>
                                )}</li>
                            </>
                        )}
                    )}
                </ul>
            <h2>Donation history</h2>
            {transactions && (
            <>
                <h3>Transactions</h3>
                <table id="history">
                    <thead>
                        <tr>
                            <th>Donor</th>
                            <th>Amount</th>
                            <th>Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(transactions).map(([index, transaction]) => {
                            return(
                                <tr>
                                    <td>{transaction.member.name}</td>
                                    <td>{transaction.amount}</td>
                                    <td>{transaction.time.split("T")[0]}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                    <tfoot>
                        <tr id="total-money">
                            <td>Total</td>
                            <td>{totalMoney}</td>
                            <td></td>
                        </tr>
                    </tfoot>
                </table>
            </>
            )}
            {items && (
            <>
                <h3>Physical Items</h3>
                <table id="history">
                    <thead>
                        <tr>
                            <th>Donor</th>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Description</th>
                            <th>Location</th>
                            <th>Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(items).map(([index, item]) => {
                            return(
                                <tr>
                                    <td>{item.member.name}</td>
                                    <td>{item.name}</td>
                                    <td>{item.type}</td>
                                    <td id="description">{item.description}</td>
                                    <td>{item.pickupLocation}</td>
                                    <td>{item.pickupDate.split("T")[0]}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </>
            )}
        </div>
    )
    
}