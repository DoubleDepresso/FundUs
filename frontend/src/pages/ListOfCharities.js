import NavBar from "../components/NavBar"
import { useEffect, useState } from "react";
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Link } from "react-router-dom";

const CampaignList = () => {
  const API = 'http://localhost:2222/api/campaign//get-sorted-campaign';
  const [campaigns, setCampaigns] = useState([]);
  const [current, setCurrent] = useState(null);
  const [sorting, setSorting] = useState(null);
  const defaultSorting = 'startDate,DESC'; // default sorting: by start date descending

  // change sorting API
  const sortField = (field, direction) => {
    setSorting(`${field},${direction}`);
  }

  const loadMoreCampaigns = () => {
    fetch(API+`?current=${current}&sorting=${sorting || defaultSorting}`) 
      .then(response => {
        if (!response.ok) {
          throw new Error('Something went wrong while fetching campaign data');
        }
        return response.json();
      })
      .then(campaignData => {
        const newCampaignsList = campaignData.data;
        
        if (newCampaignsList.length > 0) { // Check if there are any campaigns in the newCampaignList
          setCampaigns(prevCampaigns => [...prevCampaigns, ...newCampaignsList]); // Set campaigns to the old data in prevCampaigns and add newCampaignsList
          setCurrent(prevCurrent => prevCurrent + newCampaignsList.length); // Set current to the length of the prevCurrent + newCampaignList for offset query
        } else {alert('No more campaign to load.')} // disable the load more button when 'no more'
      })
      .catch(error => {
        console.error('Error fetching CampaignList data:', error);
      });
  };

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
          setCurrent(campaignList.length); // Set current to the length of the campaignList for offset query
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
            <p>
              {campaign.physicalDonation === true && (
                <Link class="link" to={`/donate-item/${campaign.id}`}>Donate Item</Link>
              )}
              {campaign.moneyDonation === true && (
                <Link class="link" to={`/donate-money/${campaign.id}`}>Donate Money</Link>
              )}
            </p>
            <p>
              <Link class="link" to={`/view-campaign-detail/${campaign.id}`}>More Detail</Link>
            </p>
          </li>
        ))}
      </ul>
      <button onClick={loadMoreCampaigns}>Load More</button>
    </div>
  );
};

export default CampaignList;
