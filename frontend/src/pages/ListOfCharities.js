import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { Link, useNavigate } from "react-router-dom";


// Fetch campaign data from campaign backend database

async function getCampaign(setCampaigns) {
    try {
        const response = await fetch(`http://localhost:2222/api/campaign/get-ongoing-campaign`)
        if (!response.ok) {
            console.error(response.status);
        }
        const result = await response.json();
        setCampaigns(cam => result.data);
    } catch (error) {
        console.log(error)
    }
}

export default function ListOfCharities() {

    const [campaigns, setCampaigns] = useState(null);

    useEffect(() => {
        getCampaign(setCampaigns);
    }, []);

    return (
        <div>
            <NavBar/>
            <h1>List of Charities</h1>
            {campaigns != null && Object.keys(campaigns).length > 0 ? (
                <ul>
                    { Object.entries(campaigns).map(([index, campaign]) => 
                        <>  
                            <li>Campaign's Name: {campaign.name}</li>
                            <li>Location: {campaign.location}</li>
                            <li>Goal: {campaign.goal}</li>
                            <li>Start: {campaign.startDate.split("T")[0]}</li>
                            <li>End: {campaign.endDate.split("T")[0]}</li>
                            {campaign.physicalDonation === true && (
                                <div>
                                <p>This campaign is looking for physical item donation</p>
                                <Link to={`/donate-item/${campaign.id}`}>Donate!</Link>
                                </div>
                            )}
                            {campaign.physicalDonation !== true && (
                                <div>
                                <p>This campaign is looking for money donation</p>
                                <Link to={`/donate-money/${campaign.id}`}>Donate!</Link>
                                </div>
                                
                            )}
                        </>
                    )}
                </ul>
            ) : (
                <p>There is no campaign at the moment.</p>
            )}
        </div>
    )
}