import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import QRcode from "../assets/QRcode.png";

async function submitForm(values) {
    return fetch("http://localhost:2222/api/campaign/donate-money", {
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

export default function DonateMoney() {
    let campaignId = (useParams().campaignId);
    const memberId = JSON.parse(localStorage.getItem("user")).id;
    const [account, setAccount] = useState("");
    const [amount, setAmount] = useState(0);
    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();
        if (account === "" || amount == 0) {
            alert("Please fill in the form!")
        } else {
            const response = await submitForm({
                campaignId,
                memberId,
                account,
                amount,
            })
            if (response.success) {
                alert("Your donation is success! Thank you for your help!");
                navigate("/");
            } else {
                alert(response.message);
            }
        }
        
    }
    
    return(
        <div>
            <NavBar/>
            <h1>Donate</h1>
            <p>Please fill in the form and scan the QR code to finish your donation!</p>
            <div>
                <img src={QRcode} alt="QR code" width="200px" height="200px"></img>
                <p>
                    Bank: BankName<br/>
                    Name: FundUs<br/>
                    Bank number: 0101010<br/>
                </p>
            </div>
            <form onSubmit={handleSubmit}>
                <label>Your Account: </label> <br/>
                <input type="text" name="account" onChange={e => setAccount(e.target.value)} 
                value={account}/><br/>
                
                <label>Amount: </label><br/>
                <input type="number" step="10000" name="amount" onChange={e => setAmount(e.target.value)} 
                value={amount} min={0}/><br/>

                <input type="submit" />
            </form>
        </div>
    )
}