import React from 'react';
import ReactDOM from 'react-dom/client';
import Homepage from './pages/Homepage';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ListOfCharities from './pages/ListOfCharities';
import Help from './pages/Help';
import CreateCampaign from './pages/CreateCampaign';
import EditCampaign from './pages/EditCampaign';
import ViewMyCampaign from './pages/ViewMyCampaign(draft)';
import DonateItem from './pages/DonateItem';
import ViewMemberProfile from './pages/ViewMemberProfile';
import EditProfile from './pages/EditProfile';
import DonateMoney from './pages/DonateMoney';
import Search from './pages/SearchPage';
import ViewCampaignDetail from './pages/ViewCampaignDetail';
import AboutUs from './pages/AboutUs';

const router = new createBrowserRouter([
  {
    path: "/",
    element: <Homepage/>
  },
  {
    path: "/sign-in",
    element: <SignIn/>
  },
  {
    path: "/list-of-charities",
    element: <ListOfCharities/>
  },
  {
    path: "/sign-up",
    element: <SignUp/>
  },
  {
    path: "/help",
    element: <Help/>
  },
  {
    path: "/create-campaign",
    element: <CreateCampaign/>,
  },
  {
    path: "/view-my-campaign",
    element: <ViewMyCampaign/>,
  },
  {
    path: "/edit-campaign/:campaignId",
    element: <EditCampaign/>,
  },
  {
    path: "/donate-item/:campaignId",
    element: <DonateItem/>,
  },
  {
    path: "/view-profile",
    element: <ViewMemberProfile/>,
  },
  {
    path: "/edit-profile/:memberId",
    element: <EditProfile/>
  },
  {
    path: "/donate-money/:campaignId",
    element: <DonateMoney/>,
  },
  {
    path: "/search-page",
    element: <Search/>,
  },
  {
    path: "/view-campaign-detail/:campaignId",
    element: <ViewCampaignDetail/>,
  },
  {
    path: "/about-us",
    element: <AboutUs/>,
  },
])
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
