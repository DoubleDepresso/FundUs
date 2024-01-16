import { Link, useNavigate, useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
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
    const [goal, setGoal] = useState(0);
    const [includeMoney, setIncludeMoney] = useState(false);
    const [includeItem, setIncludeItem] = useState(false);
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
            setGoal(campaign.goal || 0);
            setStartDate(campaign.startDate.split('T')[0] || "");
            setEndDate(campaign.endDate.split('T')[0] || "");
            if (campaign.type === "Money, Item") {
                setIncludeItem(true);
                setIncludeMoney(true);
            }
            if (campaign.type === "Money") {
                setIncludeItem(false);
                setIncludeMoney(true);
            }
            if (campaign.type === "Item") {
                setIncludeItem(false);
                setIncludeMoney(true);
            }
        }
    }, [campaign])

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
        const response = await submitForm({
            id,
            name,
            location, 
            type ,
            description,
            startDate,
            endDate,
            goal,
        });
        if (response.success) {
            alert("The campaign is updated sucessfully!");
            navigate("/view-campaign");
        }

    }
    return(
        <>
            <NavBar/>
            {campaign && (
                <>
                    <form onSubmit={handleSubmit}>
                        <label>Name of Campaign: </label> <br/>
                        <input type="text" name="name" onChange={e => setName(e.target.value)} 
                        value={name}/><br/>
                        
                        <label>Location:</label><br/>
                        <input type="text" name="location" onChange={e => setLocation(e.target.value)} 
                        value={location}/><br/>
                        
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
                        
                        <label>Description:</label><br/>
                        <textarea 
                            value={description} 
                            onChange={e => setDescription(e.target.value)} 
                            rows={5}
                            cols={50}
                        /><br/>
                        
                        <label>Goal:</label><br/>
                        <input type="number" name="goal" onChange={e => setGoal(e.target.value)} 
                        value={goal} min={0}/><br/>

                        <label>Start date:</label><br/>
                        <input type="date" name="startDate" onChange={e => setStartDate(e.target.value)} 
                        value={startDate}/><br/>

                        <label>End date:</label><br/>
                        <input type="date" name="password" onChange={e => setEndDate(e.target.value)} 
                        value={endDate}/><br/>
                        <input type="submit" />
                    </form>
                    <Link to="/create-campaign">You want to create new campaign?</Link>
                </>
            )}
        </>
    )
}