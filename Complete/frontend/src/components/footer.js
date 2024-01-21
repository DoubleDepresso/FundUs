import { NavLink } from "react-router-dom";
import "./footer.css";

export default function Footer() {
    return (
        <footer>
            <nav className="footer-container">
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
        </footer>
    );
}