import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to ParkEase</h1>
          <p>Find and list parking spaces with ease in Mumbai!</p>
          <div className="cta-buttons">
            <Link to="/find-parking" className="btn">Find Parking</Link>
            <Link to="/list-parking" className="btn">List Your Space</Link>
          </div>
        </div>
      </section>

      <section className="features container">
        <h2>Why Choose ParkEase?</h2>
        <div className="grid">
          <div className="card">
            <i className="fas fa-search"></i>
            <h3>Easy Booking</h3>
            <p>Book parking spots in advance with just a few clicks.</p>
          </div>
          <div className="card">
            <i className="fas fa-money-bill-wave"></i>
            <h3>Earn Extra Income</h3>
            <p>List your unused parking space and earn money.</p>
          </div>
          <div className="card">
            <i className="fas fa-lock"></i>
            <h3>Secure Payments</h3>
            <p>Safe and secure payment options for all transactions.</p>
          </div>
          <div className="card">
            <i className="fas fa-headset"></i>
            <h3>24/7 Support</h3>
            <p>Our customer support team is always here to help.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;