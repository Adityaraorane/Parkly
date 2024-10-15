import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

function Header(){
    return(
        <header className="header">
          <div className="container">
            <nav className="nav">
              <h1>ParkEase</h1>
              <ul className="nav-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/find-parking">Find Parking</Link></li>
                <li><Link to="/list-parking">List Parking</Link></li>
                <li><Link to="/my-booking">My Booking</Link></li>
                <li><Link to="/map">Map</Link></li>
              </ul>
            </nav>
          </div>
        </header>
    )
}

export default Header;