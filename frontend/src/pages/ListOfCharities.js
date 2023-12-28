import { response } from "express";
import NavBar from "../components/NavBar"
import { useState , useEffect } from "react"
import { useNavigate } from "react-router-dom";

export default function ListOfCharities() {

    // Set states and effects

    const navigate = useNavigate();
    const [campaign, setCampaign] = useState([]);
    const [showCampaigns, setShowCampaigns] = useState(true);
    const [original, setOriginal] = useState([]);

    // Fetch campaign data from campaign backend database

    const getData = async () => {
        const url = "http://localhost:2222/api/campaign";
        const data = await response.json();
        setCampaign();
        setOriginal();
        try {
            const response = await fetch(url);
        } catch (e) {
            console.log(e);
        }
    }

    // Web UI

    return (
        <div>
            <div>
                {/* Search Function */}
                {/* Filter Function */}
                <NavBar/>
            </div>
            <div>
                {/* Display ongoing Charities */}
                <h1>List of Charities</h1>
            </div>
            
        </div>
    )
}