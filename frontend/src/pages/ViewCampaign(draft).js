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


export default function ViewCampaign() {
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
            <h1>Your Campaigns</h1>
                {campaigns != null && Object.keys(campaigns).length > 0 ? (
                    <ul>
                        { Object.entries(campaigns).map(([index, campaign]) => 
                            <>  
                                {Object.entries(campaign).map(([key, value]) => {
                                    return (<li key={key}>{key} : {value}</li>)
                                })}
                                <Link to={`/edit-campaign/${campaign.id}`}>Edit</Link>
                                <Link to={`/donate-item/${campaign.id}`}>Donate Item</Link>
                                <button onClick={() => handleDelete(campaign.id)}>Delete Campaign</button>
                            </>
                        )}
                    </ul>
                ) : (
                    <p>There is no campaign to display.</p>
                )}
        </div>
    )
    
}