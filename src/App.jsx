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
      <div className="App ">
        <main >
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

      </div>
    </Router>
  );
}

export default App;