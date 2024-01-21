import NavBar from "../components/NavBar"
import Footer from "../components/footer";

import { useEffect, useState } from "react";
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Link } from "react-router-dom";

const CampaignList = () => {
  const API = 'https://fundus-nodejs-783e866fbb5e.herokuapp.com/api/campaign//get-sorted-campaign';
  const [campaigns, setCampaigns] = useState([]);
  const [current, setCurrent] = useState(null);
  const [sorting, setSorting] = useState(null);
  const [isVisible, setIsVisible] = useState(true);
  const defaultSorting = 'startDate,DESC'; // default sorting: by start date descending

  const memberId = JSON.parse(localStorage.getItem("user"))?.id;

  // change sorting API
  const sortField = (field, direction) => {
    setSorting(`${field},${direction}`);
    setIsVisible(true);
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
        } else {setIsVisible(false);} // disable the load more button when 'no more'
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
    <div className="App">
      <div className="Header"><NavBar/></div>
      <div className="Content">
        <h1>Campaigns List</h1>

        <div className="sort-container">
          <div className="sort-section">
            <p>Sort by created Date</p>
            <div className="sort-buttons">
              <button className="desc-btn" onClick={() => sortField('startDate', 'DESC')}>DESC</button>
              <button className="asc-btn" onClick={() => sortField('startDate', 'ASC')}>ASC</button>
            </div>
          </div>

          <div className="sort-section">
            <p>Sort by Goal</p>
            <div className="sort-buttons">
              <button className="desc-btn" onClick={() => sortField('moneyGoal', 'DESC')}>DESC</button>
              <button className="asc-btn" onClick={() => sortField('moneyGoal', 'ASC')}>ASC</button>
            </div>
          </div>
        </div>

        <ul className="campaign-grid">
          {campaigns.map(campaign => (
            <li className="campaign-containter" key={campaign.id}>
            <Link className="campaign-link" to={`/view-campaign-detail/${campaign.id}`}>
              <div className="campaign-card">
                <p className="campaign-info campaign-name">{campaign.name}</p>
                <p className="campaign-info">Start Date: {campaign.startDate.substring(0, 10)}</p>
                <p className="campaign-info">Goal: {campaign.moneyGoal.toLocaleString()} VND</p>
              </div>
            </Link>
            <div>
              {memberId && (
                <div className="align-center">
                  {campaign.physicalDonation === true && (
                    <Link className="link-button" to={`/donate-item/${campaign.id}`}>Donate Item</Link>
                  )}
                  {campaign.moneyDonation === true && (
                    <Link className="link-button" to={`/donate-money/${campaign.id}`}>Donate Money</Link>
                  )}
                </div>
              )}
            </div>
            </li>
          ))}
        </ul>

        <div className="button-container">
          {isVisible && (
            <button className="load-button" onClick={loadMoreCampaigns}>
              Load More
            </button>
          )}
        </div>

        </div>
        <div className="Footer"><Footer/></div>
    </div>
  );
};

export default CampaignList;
