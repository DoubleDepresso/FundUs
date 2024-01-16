import NavBar from "../components/NavBar"
import { useEffect, useState } from "react";
import 'react-confirm-alert/src/react-confirm-alert.css';

const SearchPage = () => {
    const API = 'http://localhost:2222/api/campaign//get-search-result'
    const [campaigns, setCampaigns] = useState([]);
    // const [keyword, setKeyword] = useState(null);
    // const [location, setLocation] = useState(null);
    const [current, setCurrent] = useState(null);
    // const [direction, setDirection] = useState(null);
    const [searchField, setSearchField] = useState(null);

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
  
    // change sorting API
    const searchBox = (keyword, location, direction, field) => {
        setSearchField(`${keyword},${location},${direction},${field}`);
    }

    const loadMoreCampaigns = async () => {
        await fetch(API+`?current=${current}&searchField=${searchField || defaultSearchField}`) 
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
            } else {alert('No more')} // disable the load more button when 'no more'
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
            setCurrent(campaignList.length); // Set current to the length of the campaignList for offset query
          } else {alert('No campaigns found with the provided search')}
        })
        .catch(error => {
          console.error('Error fetching CampaignList data:', error);
        });
    }, [searchField]); // reload campaign when search
  
    return (
      <div>
      <div>
        <NavBar/>
        <h1>Search Page</h1>
      </div>  
        <div>
          <h1>Search HERE</h1>

            <p>Sort by Goal</p>
            <button onClick={() => searchBox('', '', 'DESC', 'goal')}>DESC</button>
            <button onClick={() => searchBox('', '', 'ASC', 'goal')}>ASC</button>

            <p>Sort by Start Date</p>
            <button onClick={() => searchBox('', '', 'DESC', 'startDate')}>DESC</button>
            <button onClick={() => searchBox('', '', 'ASC', 'startDate')}>ASC</button>
  
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
            
            <ul>
                {campaigns.map(campaign => (
                <li key={campaign.id}>
                    <p>id: {campaign.id}</p>
                    <p>Name: {campaign.name}</p>
                    <p>Start Date: {campaign.startDate}</p>
                    <p>Goal: {campaign.goal}</p>
                    <p>Description: {campaign.description}</p>
                    <p>Location: {campaign.location}</p>
                </li>
                ))}
            </ul>

            <button onClick={loadMoreCampaigns}>Load More</button>
            
        </div>
      </div>
    );
  };
  
  export default SearchPage;