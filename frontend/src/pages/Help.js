import NavBar from "../components/NavBar";
import Footer from "../components/footer";

import React from 'react';
import { Link } from 'react-router-dom';

export default function Help() {
    return (
        <div className="App">
            <div className="Header"><NavBar/></div>
            <div className="Content">
                <Link className="style-text" to="/about-us">For further information please go to page About Us, Or click me!</Link>
            </div>
            <div className="Footer"><Footer/></div>
        </div>
    )
}