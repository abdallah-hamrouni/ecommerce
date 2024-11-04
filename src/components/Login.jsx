import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; // Axios for API requests
import { GoogleOAuthProvider,GoogleLogin } from '@react-oauth/google';
import { api_key as clientId } from '../api'; // Import the clientId from api.js

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault(); 

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });

      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
      }
    } catch (error) {
      setError('Invalid email or password');
    }
  };
  const onSuccess = async (res) => {
    console.log("Login Success", `Token: ${res.credential}`);
    
    // Send the token to your backend
    const response = await fetch('http://localhost:5000/api/auth/google-login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: res.credential }),
    });

    const data = await response.json();
    console.log('Backend response:', data);
};
  
const onError = (res)=>{
    console.log("Loogin failure" , res);
  }
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div>
        <div className="wrapper" style={{ backgroundImage: 'url("assets/images/bg-registration-form-2.jpg")' }}>
          <div className="inner yo">
            <form onSubmit={handleLogin}>
              <h3>Login</h3>

              <div className="form-wrapper">
                <label>Email</label>
                <input
                  type="text"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-wrapper">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {error && <p style={{ color: 'red' }}>{error}</p>} {/* Error display */}

              <p>Don't have an account? <Link to="/signUp">Sign Up Now</Link></p>
              <button type="submit" className="my-button">Login Now</button>

              {/* Google login button */}
              <div className="google-login-wrapper">
                <GoogleLogin
                  clientId="891812901211-2ahi02tm34vmtqta2599ipkpoc13ii6u.apps.googleusercontent.com"
                  onSuccess={onSuccess}
                  onError={onError}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};



export default Login;
