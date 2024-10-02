import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import axios from 'axios';


const Signup =() =>{
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    pass: '',
    phone: ''
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

      
       if (formData.password !== formData.pass) {
        setErrorMessage('Les mots de passe ne correspondent pas.'); 
        return; 
      }

    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage('Utilisateur créé avec succès');
        setErrorMessage('');
        setFormData({
          name: '',
          email: '',
          password: '',
          pass: '',
          phone: ''
        });
      } else {
        setErrorMessage(data.message || 'Erreur lors de la création de l’utilisateur.');
        setSuccessMessage('');
      }
    } catch (error) {
      setErrorMessage('Erreur de connexion au serveur.');
      setSuccessMessage('');
    }
  };

    return(
        <div>
 <div className="wrapper" style={{backgroundImage: 'url("assets/images/bg-registration-form-2.jpg")'}}>
  <div className="inner yo">
    <form action onSubmit={handleSubmit}>
      <h3>Registration Form</h3>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      <div className="form-group">
        <div className="form-wrapper">
          <label htmlFor>Full Name</label>
          <input type="text" className="form-control"  name="name" value={formData.name} onChange={handleChange} required />
        </div>
     
      </div>
      <div className="form-wrapper">
        <label htmlFor>Email</label>
        <input type="text" className="form-control" name="email" value={formData.email} onChange={handleChange} required/>
      </div>
      <div className="form-wrapper">
        <label htmlFor>Password</label>
        <input type="password" className="form-control" name="password" value={formData.password} onChange={handleChange} required/>
      </div>
      <div className="form-wrapper">
        <label htmlFor>Confirm Password</label>
        <input type="password" className="form-control" name="pass" value={formData.pass} onChange={handleChange} required/>
      </div>
      <div className="form-wrapper">
        <label htmlFor>Phone Number</label>
        <input type="text" className="form-control" name="phone" value={formData.phone} onChange={handleChange} required/>
      </div>
      
      <div className="checkbox">
        <label>
          <input type="checkbox" required/> I caccept the Terms of Use &amp; Privacy Policy.
          <span className="checkmark" />
        </label>
      </div>
      <label>
         J'ai déjà un compte   <Link to="/login">Login</Link>
          <span className="checkmark" />
        </label>

      <button className="my-button">Register Now</button>
    </form>
  </div>
</div>

</div>

    )
}

export default Signup