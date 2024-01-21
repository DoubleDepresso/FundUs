import NavBar from "../components/NavBar"
import Footer from "../components/footer";

import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import 'react-confirm-alert/src/react-confirm-alert.css';

const CampaignList = () => {
  const API = 'https://fundus-nodejs-783e866fbb5e.herokuapp.com/api/campaign//get-sorted-campaign';
  const [campaigns, setCampaigns] = useState([]);
  const [sorting, setSorting] = useState(null);
  const defaultSorting = 'startDate,DESC'; // default sorting: by start date descending

  const memberId = JSON.parse(localStorage.getItem("user"))?.id;


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
    <div className="App">
      <div className="Header"><NavBar/></div>
      <div className="Content">

        <div className="background-image-container">
          <div>
            <h1 className="home-slogan">Fund Us</h1>
          </div>

          <div className="align-center">
            {memberId ? (
              <Link to="/create-campaign" className="link-button">Create Campaign</Link>
            ) : (
              <Link to="/sign-in" className="link-button">Create Campaign</Link>
            )}
          </div>

        </div>

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

        <div>
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
              </li>
            ))}
          </ul>
        </div>
        <div className="align-center">
          <Link className="link-button" to="/list-of-charities">See more Campaigns</Link>
        </div>
        <div className="text-container">
          <p>Our platform is dedicated to ensuring that your donations directly reach those in need. 
          With a track record of successful campaigns and a commitment to low fees, 
          we make your contribution go further in making a meaningful difference. 
          Join us in creating positive change with confidence and trust.</p>
        </div>
        </div>
        <div className="Footer"><Footer/></div>
    </div>
  );
};

export default CampaignList;