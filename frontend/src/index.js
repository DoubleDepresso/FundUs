import React from 'react';
import ReactDOM from 'react-dom/client';
import Homepage from './pages/Homepage';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ListOfCharities from './pages/ListOfCharities';
import Help from './pages/Help';


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
  }
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
