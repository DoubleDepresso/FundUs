import NavBar from "../components/NavBar"
import Footer from "../components/footer";

import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

async function submitForm(values) {
    return fetch("http://localhost:2222/api/campaign/edit-campaign", {
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
export default function EditCampaign() {
    let id = (useParams().campaignId);
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [startDate,setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [includeMoney, setIncludeMoney] = useState(false);
    const [includeItem, setIncludeItem] = useState(false);
    const [moneyGoal, setMoneyGoal] = useState(0);
    const [physicalGoal, setPhysicalGoal] = useState("");
    const navigate = useNavigate();
    const [campaign, setCampaign] = useState(null);


    useEffect(() => {
        async function fetchData () {
          try {
            const response = await fetch(`http://localhost:2222/api/campaign/get-campaign-by-campaignId/${id}`);
    
            if (!response.ok) {
              console.error(`HTTP error! Status: ${response.status}`);
            }
    
            const result = await response.json();
            console.log(result.data)
            setCampaign(result.data[0]);
          } catch (error) {
            console.error(error);
          }
        };
        fetchData();
    }, []);
    useEffect(() => {
        if (campaign) {
            setName(campaign.name || "");
            setDescription(campaign.description || "");
            setLocation(campaign.location || "");
            setStartDate(campaign.startDate.split('T')[0] || "");
            setEndDate(campaign.endDate.split('T')[0] || "");
            setIncludeItem(campaign.physicalDonation);
            setIncludeMoney(campaign.moneyDonation);
            setMoneyGoal(campaign.moneyGoal || 0);
            setPhysicalGoal(campaign.physicalGoal || "")
        }
    }, [campaign])

    const handleSubmit = async e => {
        e.preventDefault();
        if (!includeItem && !includeMoney) {
            alert("Please choose the 'Type of Donation'!");
        } else {
            const response = await submitForm({
                id,
                name,
                location, 
                includeItem ,
                includeMoney ,
                description,
                startDate,
                endDate,
                moneyGoal,
                physicalGoal,
            });
            if (response.success) {
                alert("The campaign is updated sucessfully!");
                navigate("/view-my-campaign");
            }
        }
    }
    return(
        <div className="App">
            <div className="Header"><NavBar/></div>
            <div className="Content">
                <h1>Edit Campaign</h1>
                {campaign && (
                    <div>
                        <form onSubmit={handleSubmit}>
                            <label>Name of Campaign: </label> <br/>
                            <input type="text" name="name" onChange={e => setName(e.target.value)} 
                            value={name} required/><br/>
                            
                            <label>Location:</label><br/>
                            <input type="text" name="location" onChange={e => setLocation(e.target.value)} 
                            value={location} required/><br/>
                            
                            <label>Description:</label><br/>
                            <textarea 
                                value={description} 
                                onChange={e => setDescription(e.target.value)} 
                                rows={5}
                                cols={50}
                                required
                            /><br/>
                            
                            <label>Type of Donate (You can select more than 1):</label><br/>   
                            <input 
                                type="checkbox" 
                                id="type1" value="Money" 
                                checked={includeMoney} 
                                onChange={e => {
                                    setIncludeMoney(e.target.checked);
                                }}/>
                            <label htmlFor="type1">Money </label>
                            <input 
                                type="checkbox" 
                                id="type2" value="Item"
                                checked={includeItem}
                                onChange={e => {
                                    setIncludeItem(e.target.checked);
                                }}/>
                            <label htmlFor="type2">Item</label><br></br>
                            
                            {includeMoney && (
                                <>
                                <label>Goal (How much?):</label><br/>
                                <input type="number" name="goal" onChange={e => setMoneyGoal(e.target.value)} 
                                value={moneyGoal} min={0} placeholder="Enter The Goal" required/><br/>
                                </>   
                            )}
                            {includeItem && (
                                <>
                                    <label>Goal (What type of items?):</label><br/>
                                    <input type="text" name="goal" value={physicalGoal} 
                                    onChange={e => setPhysicalGoal(e.target.value)} placeholder="Enter the type of item" required/> <br/>
                                </>    
                            )}

                            <label>Start date:</label><br/>
                            <input type="date" name="startDate" onChange={e => setStartDate(e.target.value)} 
                            value={startDate} required/><br/>

                            <label>End date:</label><br/>
                            <input type="date" name="password" onChange={e => setEndDate(e.target.value)} 
                            value={endDate}/><br/>
                            <button type="submit">Submit</button>
                        </form>
                        <div className="label-text"><Link className="link-button" to="/create-campaign">Create New Campaign</Link></div>
                    </div>
                )}
            </div>
            <div className="Footer"><Footer/></div>
        </div>
    )
}