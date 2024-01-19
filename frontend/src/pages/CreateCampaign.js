import { Link, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import { useState } from "react";

const url = "http://localhost:2222/api/campaign/create-campaign";

async function CreateCampaignUser(values) {
    return fetch(url, {
        method: "POST",
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
    })
}

export default function CreateCampaign() {
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [startDate,setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [moneyGoal, setMoneyGoal] = useState(0);
    const [physicalGoal, setPhysicalGoal] = useState("");
    const hostId = JSON.parse(localStorage.getItem("user")).id; // get the userID from the local storage
    // for the type of the campaign (money or item or both)
    const [includeMoney, setIncludeMoney] = useState(false);
    const [includeItem, setIncludeItem] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();

        if (!includeItem && !includeMoney) {
            alert("Please fill in the form!")
        } else {
            const available = false;
            const response = await CreateCampaignUser({
                name,
                hostId,
                location, 
                includeMoney,
                includeItem,
                available,
                description,
                startDate,
                endDate,
                moneyGoal,
                physicalGoal, 
            });
            if (response.success) {
                alert("Your campaign is created successfully!");
                navigate("/view-my-campaign");
            }
        }
    };
    return (
        <div>
            <NavBar/>
            <div class="wrapper">
                <h1>Create Campaign</h1>
                <div class="form">
                    <form onSubmit={handleSubmit}>
                        <label>Name of Campaign: </label> <br/>
                        <input type="text" name="name" onChange={e => setName(e.target.value)} 
                        value={name} placeholder="Enter Campaign's name" required/><br/>
                        
                        <label>Location:</label><br/>
                        <input type="text" name="location" onChange={e => setLocation(e.target.value)} 
                        value={location} placeholder="Enter The Location" required/><br/>
                        
                        <label>Description:</label><br/>
                        <textarea 
                            value={description} 
                            onChange={e => setDescription(e.target.value)} 
                            placeholder="Tell more about the campaign..." 
                            rows={5}
                            cols={50}
                            required
                        /><br/>

                        <label>Type of Donate (You can select more than 1):</label><br/>   
                        <input 
                            type="checkbox" 
                            id="typeOfDonation1" value="Money" 
                            checked={includeMoney} 
                            onChange={e => {
                                setIncludeMoney(e.target.checked);
                            }} />
                        <label htmlFor="typeOfDonation1">Money </label>
                        <input 
                            type="checkbox" 
                            id="typeOfDonation2" value="Item"
                            checked={includeItem}
                            onChange={e => {
                                setIncludeItem(e.target.checked);
                            }}/>
                        <label htmlFor="typeOfDonation2">Item</label><br></br>
                        
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
                        value={endDate} required/><br/>
                        <input type="submit" />
                    </form>
                </div>
            </div>
        </div>
    )
}