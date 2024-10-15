import React, { useState } from 'react';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';

function ListParking() {
  const [parkingDetails, setParkingDetails] = useState({
    mainAddress: '',
    landmark: '',
    pincode: '',
    type: '',
    availableSpots: '',
    price: '',
    description: '',
    availableDate: '',
    startTime: '',
    endTime: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setParkingDetails(prevDetails => ({
      ...prevDetails,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Parking space listed:', parkingDetails);
    axios.post('http://localhost:5000/list-parking', parkingDetails)
      .then((response) => {
        alert('Your parking space has been listed successfully!');
        setParkingDetails({
          mainAddress: '',
          landmark: '',
          pincode: '',
          type: '',
          availableSpots: '',
          price: '',
          description: '',
          availableDate: '',
          startTime: '',
          endTime: '',
        });
      })
      .catch((error) => {
        console.error('Error listing parking space:', error);
        alert('Error listing your parking space. Please try again.');
      });
  };

  return (
    <>
    <Header/>
    <div className="list-parking container">
      <h2 className='text-2xl text-blue-400 -ml-10 pb-4 font-bold'>List Your Parking Space</h2>
      <form onSubmit={handleSubmit} className="listing-form">
        <div className="form-group">
          <label htmlFor="mainAddress">Main Address:</label>
          <input
            type="text"
            id="mainAddress"
            name="mainAddress"
            value={parkingDetails.mainAddress}
            onChange={handleChange}
            required
            placeholder="Enter the main address"
          />
        </div>
        <div className="form-group">
          <label htmlFor="landmark">Landmark:</label>
          <input
            type="text"
            id="landmark"
            name="landmark"
            value={parkingDetails.landmark}
            onChange={handleChange}
            required
            placeholder="Enter a landmark"
          />
        </div>
        <div className="form-group">
          <label htmlFor="pincode">Pincode:</label>
          <input
            type="text"
            id="pincode"
            name="pincode"
            value={parkingDetails.pincode}
            onChange={handleChange}
            required
            placeholder="Enter the pincode"
          />
        </div>

        <div className="form-group">
          <label htmlFor="type">Parking Type:</label>
          <select
            id="type"
            name="type"
            value={parkingDetails.type}
            onChange={handleChange}
            required
          >
            <option value="">Select type</option>
            <option value="garage">Garage</option>
            <option value="driveway">Driveway</option>
            <option value="street">Street Parking</option>
            <option value="lot">Parking Lot</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="availableSpots">Available Spots:</label>
          <input
            type="number"
            id="availableSpots"
            name="availableSpots"
            value={parkingDetails.availableSpots}
            onChange={handleChange}
            required
            min="1"
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Price per Hour (₹):</label>
          <input
            type="number"
            id="price"
            name="price"
            value={parkingDetails.price}
            onChange={handleChange}
            required
            min="0"
          />
        </div>

        <div className="form-group">
          <label htmlFor="availableDate">Available Date:</label>
          <input
            type="date"
            id="availableDate"
            name="availableDate"
            value={parkingDetails.availableDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="startTime">Start Time:</label>
          <input
            type="time"
            id="startTime"
            name="startTime"
            value={parkingDetails.startTime}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="endTime">End Time:</label>
          <input
            type="time"
            id="endTime"
            name="endTime"
            value={parkingDetails.endTime}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={parkingDetails.description}
            onChange={handleChange}
            rows="4"
            placeholder="Provide additional details about your parking space"
          ></textarea>
        </div>

        <button type="submit" className="btn">List Parking Space</button>
      </form>
    </div>
    <Footer/>
    </>
  );
}

export default ListParking;
