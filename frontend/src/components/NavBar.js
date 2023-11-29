import { NavLink } from "react-router-dom";

export default function NavBar() {
    return (
        <div>
            <nav>
                <NavLink to="#" className={({isActive}) => isActive ? "nav-link-active" : "nav-link"}>
                    List of Charities
                </NavLink>
                <NavLink to="#" className={({isActive}) => isActive ? "nav-link-active" : "nav-link"}>
                    Sign in
                </NavLink>
                <NavLink to="#" className={({isActive}) => isActive ? "nav-link-active" : "nav-link"}>
                    Sign up
                </NavLink>
                <NavLink to="#" className={({isActive}) => isActive ? "nav-link-active" : "nav-link"}>
                    Help
                </NavLink>
            </nav>
        </div>
    )
}