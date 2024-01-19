import { Link, NavLink, useNavigate } from "react-router-dom";
import "./footer.css";

export default function App() {
    return (
        <nav className="Footer" id="footer">
            <NavLink to="/about-us" className="nav-link">
                Terms
            </NavLink>
            <NavLink to="/about-us" className="nav-link">
                Privacy Notice
            </NavLink>
            <NavLink to="/about-us" className="nav-link">
                About Us
            </NavLink>
        </nav>
    );
}