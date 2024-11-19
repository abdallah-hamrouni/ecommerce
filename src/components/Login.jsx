import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios"; 
import { GoogleOAuthProvider,GoogleLogin } from '@react-oauth/google';
import { api_key as clientId } from '../api'; 
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault(); 

    try {
      const response = await axios.post('http://localhost:5000/login', {
        email,
        password,
      });

      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        navigate('/');
      }
    } catch (error) {
      setError('Invalid email or password');
    }
  };
//   const onSuccess = async (res) => {
//     console.log("Login Success", `Token: ${res.credential}`);
    
  
//     const response = await fetch('http://localhost:5000/api/auth/google', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ token: res.credential }),
        
//     },
//     localStorage.setItem('token', res.credential),
//     navigate('/')
//   );

//     const data = await response.json();
//     console.log('Backend response:', data);
// };
const onSuccess = async (res) => {
  console.log("Login Success", `Token: ${res.credential}`);

  // Envoyer la requête POST au backend
  const response = await fetch('http://localhost:5000/api/auth/google', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: res.credential }),
  });

  if (response.ok) { // Vérifie si la réponse est réussie (status code 2xx)
      const data = await response.json();
      console.log('Backend response:', data);

      // Enregistrer le token dans le localStorage et rediriger l'utilisateur
      localStorage.setItem('token', res.credential);
      navigate('/');
  } else {
      console.error('Erreur lors de la requête au backend:', response.statusText);
  }
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
                  clientId={clientId}
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
