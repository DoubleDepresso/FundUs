import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { Link, useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css';

async function fetchCampaign(hostId, setCampaigns) {
    try {
        const response = await fetch(`http://localhost:2222/api/campaign/get-campaign-by-hostId/${hostId}`)
        if (!response.ok) {
            console.error(response.status);
        }
        const result = await response.json();
        setCampaigns(prevCampaigns => result.data);
    } catch (error) {
        console.log(error)
    }
}

async function DeleteCampaign(campaignId) {
    return fetch(`http://localhost:2222/api/campaign/delete-campaign/${campaignId}`, {
        method: "DELETE",
    })
    .then(data => { 
        if (data.ok) {
            return data.json();
        }
    })
    .catch(error => {
        console.error(error);
    })
}


export default function ViewMyCampaign() {
    const [campaigns, setCampaigns] = useState(null);
    const hostId = JSON.parse(localStorage.getItem("user")).id;

    useEffect(() => {
        fetchCampaign(hostId, setCampaigns);
    }, [hostId])

    function handleDelete(campaignId) {
        confirmAlert({
            title: `CONFIRM TO DELETE CAMPAIGN`,
            message: `Are you sure you want to delete campaign?`,
            buttons: [
                {
                    label: "Yes",
                    onClick: async () => {
                        const response = await DeleteCampaign(campaignId);
                        console.log(response)
                        if (response.success) {
                            alert(`Campaign ${campaignId} is deleted successfully!`)
                        }
                    },
                },
                {
                    label: "No",
                    onClick: () => {
                        console.log("Cancel delete")
                    },
                }
            ]
        });
    };
    return (
        <div>
            <NavBar/>
            <h1>My Campaigns</h1>
                {campaigns != null && Object.keys(campaigns).length > 0 ? (
                    <ul>
                        { Object.entries(campaigns).map(([index, campaign]) => 
                            <>  
                                <li>Campaign's Name: {campaign.name}</li>
                                <li>Location: {campaign.location}</li>
                                {campaign.moneyDonation && <li>Goal: {campaign.moneyGoal} VND</li>}
                                {campaign.physicalDonation && <li>Goal: {campaign.physicalGoal}</li>}
                                <li>Start: {campaign.startDate.split("T")[0]}</li>
                                <li>End: {campaign.endDate.split("T")[0]}</li>
                                <Link to={`/edit-campaign/${campaign.id}`}>Edit</Link>
                                <button onClick={() => handleDelete(campaign.id)}>Delete Campaign</button>
                            </>
                        )}
                    </ul>
                ) : (
                    <p>There is no campaign to display.</p>
            )}
            <Link to={"/create-campaign"}>Create a new campaign</Link>
        </div>
    )
    
}