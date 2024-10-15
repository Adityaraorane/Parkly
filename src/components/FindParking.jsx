import React, { useState } from 'react';
import { jsPDF } from 'jspdf';

function FindParking() {
  const [location, setLocation] = useState('');
  const [pincode, setPincode] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [duration, setDuration] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/find-parking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ location, pincode, date }),
      });

      if (response.ok) {
        const results = await response.json();
        setSearchResults(results);
      } else {
        console.error('Error fetching parking spots');
      }
    } catch (error) {
      console.error('Error during fetch:', error);
    }
  };

  const handleBookNow = async (spot) => {
    const doc = new jsPDF();

    doc.setFontSize(22);
    doc.text('Parking Spot Booking Receipt', 20, 20);

    doc.setFontSize(16);
    doc.text(`Parking Spot: ${spot.type} Parking`, 20, 40);
    doc.text(`Address: ${spot.mainAddress}, ${spot.landmark}`, 20, 50);
    doc.text(`Pincode: ${spot.pincode}`, 20, 60);
    doc.text(`Date: ${date}`, 20, 70);
    doc.text(`Time: ${time}`, 20, 80);
    doc.text(`Duration: ${duration} hours`, 20, 90);
    doc.text(`Price: ₹${spot.price} per hour`, 20, 100);
    doc.text(`Total Amount: ₹${spot.price * duration}`, 20, 110);

    doc.save('Parking_Receipt.pdf');

    const totalAmount = spot.price * duration;

    const bookingData = {
      location,
      pincode,
      date,
      time,
      duration,
      spotId: spot._id,
      price: spot.price,
      totalAmount,
    };

    try {
      const response = await fetch('http://localhost:5000/book-parking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        const booking = await response.json();
        console.log('Booking successful:', booking);
        history.push('/my-bookings'); // Navigate to MyBookings page
      } else {
        console.error('Error during booking:', response.statusText);
      }
    } catch (error) {
      console.error('Error during booking:', error);
    }
  };

  return (
    <div className="find-parking container">
      <h2>Find Parking in Mumbai</h2>
      <form onSubmit={handleSearch} className="search-form">
        <div className="form-group">
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter area or landmark"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="pincode">Pincode:</label>
          <input
            type="text"
            id="pincode"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            placeholder="Enter pincode"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="time">Time:</label>
          <input
            type="time"
            id="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="duration">Duration (hours):</label>
          <input
            type="number"
            id="duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            min="1"
            max="24"
            required
          />
        </div>
        <button type="submit" className="btn">Search Parking</button>
      </form>

      {searchResults.length > 0 && (
        <div className="search-results">
          <h3>Available Parking Spots</h3>
          <div className="grid">
            {searchResults.map(spot => (
              <div key={spot._id} className="card">
                <h4>{spot.type} Parking</h4>
                <p>{spot.mainAddress}, {spot.landmark}</p>
                <p>Pincode: {spot.pincode}</p>
                <p>Price: ₹{spot.price}/hour</p>
                <p>Available from {spot.startTime} to {spot.endTime}</p>
                <button className="btn" onClick={() => handleBookNow(spot)}>Book Now</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default FindParking;
