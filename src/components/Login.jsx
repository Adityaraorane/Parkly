import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:5000/login', { email, password })
      .then((response) => {
        if (response.data.success) {
          alert('An OTP has been sent to your email. Please check your inbox.');
          verifyOtp();
        } else {
          setError(response.data.message);
        }
      })
      .catch((error) => {
        console.error('Error during login:', error);
        setError('An error occurred. Please try again.');
      });
  };

  const verifyOtp = () => {
    const enteredOtp = prompt('Please enter the OTP sent to your email:');
    
    if (enteredOtp) {
      axios.post('http://localhost:5000/verify-otp', { email, otp: enteredOtp })
        .then((response) => {
          if (response.data.success) {
            navigate('/'); 
          } else {
            setError(response.data.message);
          }
        })
        .catch((error) => {
          console.error('Error during OTP verification:', error);
          setError('An error occurred. Please try again.');
        });
    } else {
      setError('OTP verification cancelled.');
    }
  };

  return (
    <div className="login">
      <h2>Login to Your Account</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <button type="submit" className="btn">Login</button>
      </form>


      <p>
        Haven't registered yet? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
}

export default Login;
