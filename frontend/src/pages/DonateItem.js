import NavBar from "../components/NavBar"
import Footer from "../components/footer";

import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

async function submitForm(values) {
    return fetch("https://fundus-nodejs-783e866fbb5e.herokuapp.com/api/campaign/donate-item", {
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
        alert(error)
    });
};
export default function DonateItem() {
    let campaignId = (useParams().campaignId);
    const memberId = JSON.parse(localStorage.getItem("user")).id;
    const [name, setName] = useState("");
    const [condition, setCondition] = useState("");
    const [type, setType] = useState("");
    const [description, setDescription] = useState("");
    const [pickupDate,setPickupDate] = useState("");
    const [pickupLocation, setPickupLocation] = useState("");
    const navigate = useNavigate();
    
    const handleSubmit = async e => {
        e.preventDefault();
        const pickupStatus = false;
        if (type === "" || condition === "") {
            alert("Please fill in the form!")
        } else {
            const response = await submitForm({
                campaignId,
                memberId,
                name,
                condition, 
                type ,
                pickupDate,
                description,
                pickupLocation,
                pickupStatus,
            });
            if (response.success) {
                alert("The item is waited to pick up! Thank you for your help");
                navigate(`/view-campaign-detail/${campaignId}`);
            }
        }
    }
    return(
        <div className="App">
            <div className="Header"><NavBar/></div>
            <div className="Content">
                <h1>Donate Item</h1>
                <div className="style-text">
                    <div className="align-center">
                        <form onSubmit={handleSubmit}>
                            <label>Name of Item: </label> <br/>
                            <input type="text" name="name" onChange={e => setName(e.target.value)} 
                            value={name} required/><br/>
                            
                            <label>Type: </label><br/>
                            <input
                                type="radio"
                                id="type1"
                                value="Clothing"
                                checked={type === 'Clothing'}
                                onChange={e => setType(e.target.value)}
                            />
                            <label htmlFor="type1">Clothing </label><br/>
                            <input
                                type="radio"
                                id="type2"
                                value="Canned Goods"
                                checked={type === 'Canned Goods'}
                                onChange={e => setType(e.target.value)}
                            />
                            <label htmlFor="type2">Canned Goods </label><br/>
                            <input
                                type="radio"
                                id="type3"
                                value="Electronics"
                                checked={type === 'Electronics'}
                                onChange={e => setType(e.target.value)}
                            />
                            <label htmlFor="type3">Electronics </label><br/>
                            <input
                                type="radio"
                                id="type4"
                                value="School Things"
                                checked={type === 'School Things'}
                                onChange={e => setType(e.target.value)}
                            />
                            <label htmlFor="type4">School Things </label><br/>
                            <input
                                type="radio"
                                id="type5"
                                value="Medical Supplies"
                                checked={type === 'Medical Supplies'}
                                onChange={e => setType(e.target.value)}
                            />
                            <label htmlFor="type5">Medical Supplies </label><br/>
                            <input 
                                type="radio"
                                id="type6"
                                value="Other"
                                checked={type === "Other"}
                                onChange={e => setType(e.target.value)}
                            />
                            <label htmlFor="type6">Other</label><br/>

                            <label>Condition: </label> <br/>
                            <input
                                type="radio"
                                id="condition1"
                                value="New"
                                checked={condition === 'New'}
                                onChange={e => setCondition(e.target.value)}
                            />
                            <label htmlFor="condition1">New </label><br/>
                            <input
                                type="radio"
                                id="condition2"
                                value="Used"
                                checked={condition === 'Used'}
                                onChange={e => setCondition(e.target.value)}
                            />
                            <label htmlFor="condition2">Used </label><br/>
                            <input
                                type="radio"
                                id="condition3"
                                value="Need repair"
                                checked={condition === 'Need repair'}
                                onChange={e => setCondition(e.target.value)}
                            />
                            <label htmlFor="condition3">Need repair </label><br/>

                            <label>Pickup date:</label><br/>
                            <input type="date" name="Pickup date" 
                                onChange={e => setPickupDate(e.target.value)} 
                                value={pickupDate}  required
                            /><br/>
                            
                            <label>Description:</label><br/>
                            <input
                                type="text"
                                name="Description"
                                onChange={e => setDescription(e.target.value)}
                                required
                            /><br/>

                            <label>Pickup location:</label><br/>
                            <input type="text" name="Pickup location" 
                                onChange={e => setPickupLocation(e.target.value)} 
                                value={pickupLocation}  required
                            /><br/>

                            <button className="link-button" type="submit">Submit</button>
                        </form>
                    </div>
                </div>

            </div>
            <div className="Footer"><Footer/></div>
        </div>
    )
}