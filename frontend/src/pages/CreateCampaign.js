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
    const [isAvailable, setIsAvailable] = useState(false);
    const [description, setDescription] = useState("");
    const [startDate,setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [goal, setGoal] = useState(0);
    const hostId = JSON.parse(localStorage.getItem("user")).id; // get the userID from the local storage
    // for the type of the campaign (money or item or both)
    const [includeMoney, setIncludeMoney] = useState(false);
    const [includeItem, setIncludeItem] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();
        let type;
        let available;
        if (includeItem && includeMoney) {
            type = "Money, Item";
        } else if (includeItem) {
            type = "Item";
        } else if (includeMoney) {
            type = "Money";
        } else {
            alert("You must select the type of campaign");
        };

        if (isAvailable) {
            available = true;
        }
        const response = await CreateCampaignUser({
            name,
            hostId,
            location, 
            type ,
            available,
            description,
            startDate,
            endDate,
            goal,
        });
        if (response.success) {
            alert("Your campaign is created successfully!");
            setName("");
            setDescription("");
            setLocation("");
            setGoal(0);
            setStartDate("");
            setEndDate("");
            setIsAvailable(false);
            setIncludeItem(false);
            setIncludeMoney(false);
        }
    };
    return (
        <div>
            <NavBar/>
            <h1>Create Campaign</h1>
            <form onSubmit={handleSubmit}>
                <label>Name of Campaign: </label> <br/>
                <input type="text" name="name" onChange={e => setName(e.target.value)} 
                value={name} placeholder="Enter Campaign's name"/><br/>
                
                <label>Location:</label><br/>
                <input type="text" name="location" onChange={e => setLocation(e.target.value)} 
                value={location} placeholder="Enter The Location"/><br/>
                
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
                
                <label htmlFor="available">Available (Will it be ready to donate now?):</label>
                <input 
                    type="checkbox" 
                    id="available" value="Available"
                    checked={isAvailable}
                    onChange={e => setIsAvailable(e.target.checked)}/><br/>
                
                <label>Description:</label><br/>
                <textarea 
                    value={description} 
                    onChange={e => setDescription(e.target.value)} 
                    placeholder="Tell more about the campaign..." 
                    rows={5}
                    cols={50}
                /><br/>
                
                <label>Goal:</label><br/>
                <input type="number" name="goal" onChange={e => setGoal(e.target.value)} 
                value={goal} min={0} placeholder="Enter The Goal"/><br/>

                <label>Start date:</label><br/>
                <input type="date" name="startDate" onChange={e => setStartDate(e.target.value)} 
                value={startDate}/><br/>

                <label>End date:</label><br/>
                <input type="date" name="password" onChange={e => setEndDate(e.target.value)} 
                value={endDate}/><br/>
                <input type="submit" />
            </form>
            <Link to="/sign-up">Don't have an account yet?</Link>
        </div>
    )
}