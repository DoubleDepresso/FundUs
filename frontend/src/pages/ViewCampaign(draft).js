import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { Link } from "react-router-dom";


async function fetchCampaign(hostId, setCampaigns) {
    try {
        const response = await fetch(`http://localhost:2222/api/campaign/get-campaign-by-hostId/${hostId}`)
        if (!response.ok) {
            console.error(response.status);
        }
        const result = await response.json();
        setCampaigns(result.records);
    } catch (error) {
        console.log(error)
    }
}
export default function ViewCampaign() {
    const [campaigns, setCampaigns] = useState(null);
    const hostId = JSON.parse(localStorage.getItem("user")).id;

    
    
    useEffect(() => {
        fetchCampaign(hostId, setCampaigns);
    }, [])
    return (
        <div>
            <NavBar/>
            <h1>Your Campaigns</h1>
                {campaigns && (
                    <ul>
                        { Object.entries(campaigns).map(([index, campaign]) => 
                            <>  
                                {Object.entries(campaign).map(([key, value]) => {
                                    return (<li>{key} : {value}</li>)
                                })}
                                <Link to={`/edit-campaign/${campaign.id}`}>Edit</Link>
                            </>
                        )}
                    </ul>
                )}
        </div>
    )
    
}