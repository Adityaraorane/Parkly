import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    surname: '',
    dob: '',
    mobile: '',
    country: '',
    state: '',
    city: '',
    address: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const navigate = useNavigate();

  const countryOptions = ['India', 'USA', 'UK', 'Australia', 'New Zealand'];
  const stateOptions = {
    India: ['Maharashtra', 'Goa', 'Bangalore', 'Chennai'],
    USA: ['California', 'Texas', 'New York', 'Florida']
  };

  const cityOptions = {
    Maharashtra: ['Thane', 'Pune', 'Nashik', 'Raigad'],
    Goa: ['Panaji', 'Vasco da Gama'],
    California: ['Los Angeles', 'San Francisco'],
    Texas: ['Houston', 'Dallas']
  };

  const handleCountryChange = (e) => {
    const { value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      country: value,
      state: '',
      city: ''
    }));
    setStates(stateOptions[value] || []);
    setCities([]);
  };

  const handleStateChange = (e) => {
    const { value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      state: value,
      city: ''
    }));
    setCities(cityOptions[value] || []);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const validateForm = () => {
    const mobilePattern = /^[0-9]{10}$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

    if (!mobilePattern.test(formData.mobile)) {
      alert("Mobile number must be exactly 10 digits.");
      return false;
    }

    if (!emailPattern.test(formData.email)) {
      alert("Invalid email format.");
      return false;
    }

    if (!passwordPattern.test(formData.password)) {
      alert("Password must be at least 8 characters long, include at least one uppercase letter, one number, and one special character.");
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post('http://localhost:5000/register', formData);
        alert('Registration successful! Please log in.');
        navigate('/login');
      } catch (error) {
        console.error("Error registering user:", error);
        alert("Registration failed.");
      }
    }
  };

  return (
    <div className="register">
      <h2>Create an Account</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <div className="form-group">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="surname">Surname:</label>
          <input
            type="text"
            id="surname"
            name="surname"
            value={formData.surname}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="dob">Date of Birth (MM-DD-YYYY):</label>
          <input
            type="date"
            id="dob"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="mobile">Mobile No:</label>
          <input
            type="tel"
            id="mobile"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="country">Country:</label>
          <select id="country" name="country" value={formData.country} onChange={handleCountryChange} required>
            <option value="">Select Country</option>
            {countryOptions.map(country => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
        </div>
        {states.length > 0 && (
          <div className="form-group">
            <label htmlFor="state">State:</label>
            <select id="state" name="state" value={formData.state} onChange={handleStateChange} required>
              <option value="">Select State</option>
              {states.map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>
        )}
        {cities.length > 0 && (
          <div className="form-group">
            <label htmlFor="city">City:</label>
            <select id="city" name="city" value={formData.city} onChange={handleChange} required>
              <option value="">Select City</option>
              {cities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>
        )}
        <div className="form-group">
          <label htmlFor="address">Residential Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn">Register</button>
      </form>
    </div>
  );
}

export default Register;
