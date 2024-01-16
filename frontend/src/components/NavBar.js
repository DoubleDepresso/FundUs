import { Link, NavLink } from "react-router-dom";
import "./NavBar.css";
import logo from "../assets/sampleLogo.png"
import { useEffect, useState } from "react";

export default function App() {
    const [searchValue, setSearchValue] = useState("");
    const [token, setToken] = useState("");

    // check if token is in localStorage / src: https://www.freecodecamp.org/news/how-to-persist-a-logged-in-user-in-react/
    useEffect(() => {
        const loggined = localStorage.getItem("token");
        if (loggined) {
            const foundToken = loggined;
            setToken(foundToken)
        }
    }, []);
    const handleLogout = () => {
        setToken("");
        localStorage.clear();
    }
    
    if (!token) {
        return (
            <div>
            <nav className="nav-bar">
                <Link to="/"><img src={logo} alt="Logo" width="100px" height="100px"/></Link>
                <input type="text" placeholder="Search" onChange={e => setSearchValue(e.target.value)}/>
                <NavLink to="/list-of-charities" className={({isActive}) => isActive ? "nav-link-active" : "nav-link"}>
                    List of Charities
                </NavLink>
                <NavLink to="/sign-in" className={({isActive}) => isActive ? "nav-link-active" : "nav-link"}>
                    Sign in
                </NavLink>
                <NavLink to="/sign-up" className={({isActive}) => isActive ? "nav-link-active" : "nav-link"}>
                    Sign up
                </NavLink>
                <NavLink to="/help" className={({isActive}) => isActive ? "nav-link-active" : "nav-link"}>
                    Help
                </NavLink>
                <NavLink to="/search-page" className={({isActive}) => isActive ? "nav-link-active" : "nav-link"}>
                    Search
                </NavLink>
            </nav>
        </div>
        )
    } else {
        return (
            <div>
                <nav className="nav-bar">
                    <Link to="/"><img src={logo} alt="Logo" width="100px" height="100px"/></Link>
                    <input type="text" placeholder="Search" onChange={e => setSearchValue(e.target.value)}/>
                    <NavLink to="/list-of-charities" className={({isActive}) => isActive ? "nav-link-active" : "nav-link"}>
                        List of Charities
                    </NavLink>
                    <NavLink to="/user-profile" className={({isActive}) => isActive ? "nav-link-active" : "nav-link"}>
                        My profile
                    </NavLink>
                    <NavLink to="/help" className={({isActive}) => isActive ? "nav-link-active" : "nav-link"}>
                        Help
                    </NavLink>
                    <NavLink to="/create-campaign" className={({isActive}) => isActive ? "nav-link-active" : "nav-link"}>
                        Create Campaign
                    </NavLink>
                    <NavLink to="/view-campaign" className={({isActive}) => isActive ? "nav-link-active" : "nav-link"}>
                        View Campaign
                    </NavLink>
                    <NavLink to="/search-page" className={({isActive}) => isActive ? "nav-link-active" : "nav-link"}>
                        Search
                    </NavLink>
                    <button onClick={handleLogout}>Sign out</button> 
                </nav>
            </div>
        )
    }
}