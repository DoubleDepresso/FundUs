import NavBar from "../components/NavBar"
import Footer from "../components/footer";

import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import 'react-confirm-alert/src/react-confirm-alert.css';

const SearchPage = () => {
    const API = 'https://fundus-nodejs-783e866fbb5e.herokuapp.com/api/campaign//get-search-result'
    const [campaigns, setCampaigns] = useState([]);
    const [current, setCurrent] = useState(null);
    const [searchField, setSearchField] = useState(null);
    const [isVisible, setIsVisible] = useState(true);

    const defaultValue = '';
    const defaultSearchField = `${defaultValue},${defaultValue},${defaultValue},${defaultValue}`; // default value is empty

    // change searchField to reload useEffect
    const handleSearch = (event) => {
        event.preventDefault();
        const formId = event.target.id;
        let keyword = '';
        let location = '';
        
        if (formId === 'keyword') {
            keyword = event.target.elements.keyword.value;
        } else if (formId === 'location') {
            location = event.target.elements.location.value;
        }

        setSearchField(`${keyword},${location},${defaultValue},${defaultValue}`);
      };
  
    // change searchField API
    const searchBox = (keyword, location, direction, field) => {
        setSearchField(`${keyword},${location},${direction},${field}`);
        setIsVisible(true);
    }

    const loadMoreCampaigns = async () => {
      await fetch(API + `?current=${current}&searchField=${searchField || defaultSearchField}`)
          .then(response => {
              if (!response.ok) {
                  throw new Error('Something went wrong while fetching campaign data');
              }
              return response.json();
          })
          .then(campaignData => {
              const newCampaignsList = campaignData.data;
  
              if (newCampaignsList.length > 0) {
                  setCampaigns(prevCampaigns => [...prevCampaigns, ...newCampaignsList]);
                  setCurrent(prevCurrent => prevCurrent + 1);
              } else {
                setIsVisible(false);
              }
          })
          .catch(error => {
              console.error('Error fetching CampaignList data:', error);
          });
      };
    useEffect(() => {
      fetch(API+`?searchField=${searchField || defaultSearchField}`)
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
            setCurrent(1); // Set current for pagination
          } else {alert('No campaigns found with the provided search')}
        })
        .catch(error => {
          console.error('Error fetching CampaignList data:', error);
        });
    }, [searchField]); // reload campaign when search
  
    return (
      <div className="App">
        <div className="Header"><NavBar/></div>
        <div className="Content">
          <h1>Search Page Here:</h1>
          
            <div className="sort-container">
            <div className="sort-section">
              <p>Sort by created Date</p>
              <div className="sort-buttons">
                <button className="desc-btn" onClick={() => searchBox('', '', 'DESC', 'moneyGoal')}>DESC</button>
                <button className="asc-btn" onClick={() => searchBox('', '', 'ASC', 'moneyGoal')}>ASC</button>
              </div>
            </div>

            <div className="sort-section">
              <p>Sort by Goal</p>
              <div className="sort-buttons">
                <button className="desc-btn" onClick={() => searchBox('', '', 'DESC', 'startDate')}>DESC</button>
                <button className="asc-btn" onClick={() => searchBox('', '', 'ASC', 'startDate')}>ASC</button>
              </div>
            </div>
          </div>
  
            <form id="keyword" onSubmit={handleSearch}>
              <label>Search:</label>
              <input type="text" id="keyword" name="location" placeholder="Enter keywords..."></input>
              <button type="submit">Search</button>
            </form>

            <form id="location" onSubmit={handleSearch}>
              <label>Search:</label>
              <input type="text" id="location" name="location" placeholder="Enter location..."></input>
              <button type="submit">Search</button>
            </form>
            
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
  
  export default SearchPage;