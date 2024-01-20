import { Link, NavLink, useNavigate } from "react-router-dom";
import "./NavBar.css";
import logo from "../assets/sampleLogo.png"
import { useEffect, useState, useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

export default function NavBar() {
    const [token, setToken] = useState("");
    const navRef = useRef();
    const navigate = useNavigate();

    const responseNavbar = () => {
        navRef.current.classList.toggle("responsive_navbar");
    }

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
        navigate("/")
    }
    
    if (!token) {
        return (
            <header>
                <div className="nav-bar-container">
                    <nav ref={navRef} className="nav-bar">
                        <div className="logo-container">
                            <Link to="/" className="logo-link">
                                <img src={logo} alt="Logo" className="logo-image" />
                            </Link>
                        </div>
                        
                        <div className="nav-bar-nav-links-container">
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

                            <button className="nav-bar-button close-button" onClick={responseNavbar}><FaTimes /></button>
                        </div>
                    </nav>
                    <button className="nav-bar-button" onClick={responseNavbar}><FaBars /></button>
                </div>
            </header>
        )
    } else {
        return (
            <header>
                <div className="container">
                    <nav ref={navRef} className="nav-bar">
                        <div className="logo-container">
                            <Link to="/" className="logo-link">
                                <img src={logo} alt="Logo" className="logo-image" />
                            </Link>
                        </div>

                        <div className="nav-bar-nav-links-container">
                            <NavLink to="/list-of-charities" className={({isActive}) => isActive ? "nav-link-active" : "nav-link"}>
                                List of Charities
                            </NavLink>
                            <NavLink to="/view-profile" className={({isActive}) => isActive ? "nav-link-active" : "nav-link"}>
                                My profile
                            </NavLink>
                            <NavLink to="/view-my-campaign" className={({isActive}) => isActive ? "nav-link-active" : "nav-link"}>
                                View My Campaigns
                            </NavLink>
                            <NavLink to="/search-page" className={({isActive}) => isActive ? "nav-link-active" : "nav-link"}>
                                Search
                            </NavLink>
                            <NavLink to="/help" className={({isActive}) => isActive ? "nav-link-active" : "nav-link"}>
                                Help
                            </NavLink>

                            <button onClick={handleLogout}>Sign out</button> 
                            <button className="nav-bar-button close-button" onClick={responseNavbar}><FaTimes /></button>
                        </div>
                    </nav>
                    <button className="nav-bar-button" onClick={responseNavbar}><FaBars /></button>
                </div>
            </header>
        )
    }
}