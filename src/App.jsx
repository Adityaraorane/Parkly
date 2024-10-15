import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home';
import FindParking from './components/FindParking';
import ListParking from './components/ListParking';
import Login from './components/Login';
import Register from './components/Register';
import MyBooking from './components/MyBooking';
import Map from './components/Map';

function App() {
  return (
    <Router>
      <div className="App">
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

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/find-parking" element={<FindParking />} />
            <Route path="/list-parking" element={<ListParking />} />
            <Route path="/my-booking" element={<MyBooking />} />
            <Route path="/map" element={<Map />} />
          </Routes>
        </main>

        <footer className="footer">
          <div className="container">
            <p>&copy; 2024 Parkly. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;