import NavBar from "../components/NavBar"
import { useEffect, useState } from "react";
import 'react-confirm-alert/src/react-confirm-alert.css';

const CampaignList = () => {
  const API = 'http://localhost:2222/api/campaign//get-sorted-campaign';
  const [campaigns, setCampaigns] = useState([]);
  const [sorting, setSorting] = useState(null);
  const defaultSorting = 'startDate,DESC'; // default sorting: by start date descending

  // change sorting API
  const sortField = (field, direction) => {
    setSorting(`${field},${direction}`);
  }
  useEffect(() => {
    fetch(API+`?sorting=${sorting || defaultSorting}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Something went wrong while fetching campaign data');
        }
        return response.json();
      })
      .then(campaignData => {
        const campaignList = campaignData.data;
        if (campaignList.length > 0) { // Check if there are any campaigns in the campaignList
          setCampaigns(campaignList);
        }
      })
      .catch(error => {
        console.error('Error fetching CampaignList data:', error);
      });
  }, [sorting]); // reload campaign when sorting is changed

  
  return (
    <div>
    <div>
      <NavBar/>
      <h1>Homepage</h1>
    </div>
      <h1>Campaigns List</h1>
      <p>Sort by created Date</p>
      <button onClick={() => sortField('startDate', 'DESC')}>DESC</button>
      <button onClick={() => sortField('startDate', 'ASC')}>ASC</button>

      <p>Sort by Goal</p>
      <button onClick={() => sortField('moneyGoal', 'DESC')}>DESC</button>
      <button onClick={() => sortField('moneyGoal', 'ASC')}>ASC</button>

      <ul>
        {campaigns.map(campaign => (
          <li key={campaign.id}>
            <p>id: {campaign.id}</p>
            <p>Name: {campaign.name}</p>
            <p>Start Date: {campaign.startDate}</p>
            <p>Goal: {campaign.moneyGoal}</p>
          </li>
        ))}
      </ul>
      <button><a href='/list-of-charities'>SEE MORE GO TO THE LIST OF CHARI</a></button>
    </div>
  );
};

export default CampaignList;