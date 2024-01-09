import { Link, useNavigate, useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import { useState, useEffect } from "react";

async function submitForm(values) {
    return fetch("http://localhost:2222/api/campaign/donate-item", {
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
    const [pickupStatus, setPickupStatus] = useState(false);
    const [other, setOther] = useState("");
    const navigate = useNavigate();


    console.log(type, other)
    const handleSubmit = async e => {
        e.preventDefault();
        if (type === "Other") {
            setType(other);
        }
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
            alert("The item is waited to lick up!");
            navigate("/view-campaign");
        }

    }
    return(
        <>
            <NavBar/>
            <form onSubmit={handleSubmit}>
                <label>Name of Item: </label> <br/>
                <input type="text" name="name" onChange={e => setName(e.target.value)} 
                value={name}/><br/>
                
                <label>Type: </label><br/>
                <input
                    type="radio"
                    id="type1"
                    value="Clothing"
                    checked={type === 'Clothing'}
                    onChange={e => setType(e.target.value)}
                />
                <label htmlFor="condition1">Clothing </label><br/>
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
                    id="type4"
                    value="Medical Supplies"
                    checked={type === 'Medical Supplies'}
                    onChange={e => setType(e.target.value)}
                />
                <label htmlFor="type4">Medical Supplies </label><br/>
                <input 
                    type="radio"
                    id="type5"
                    value="Other"
                    checked={type === "Other"}
                    onChange={e => setType(e.target.value)}
                />
                <label htmlFor="type5">Other:
                    <input type="text" onChange={e => setOther(e.target.value)}/>
                </label><br/>
                {/*Condition*/}
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
                    value={pickupDate}
                /><br/>
                
                <label>Description:</label><br/>
                <input
                    type="text"
                    name="Description"
                    onChange={e => setDescription(e.target.value)}
                /><br/>

                <label>Pickup location:</label><br/>
                <input type="text" name="Pickup location" 
                    onChange={e => setPickupLocation(e.target.value)} 
                    value={pickupLocation}
                /><br/>

                <input type="submit" />
            </form>
            <Link to="/create-campaign">You want to create new campaign?</Link>
        </>
    )
}