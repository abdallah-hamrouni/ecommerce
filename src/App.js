import './App.css';
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import About from './components/about';
import Home from './components/home';
import Products from './components/products';
import SingleProduct from './components/single_product';
import Contact from './components/contact';
import Cart from './components/cart';
import SignUp from './components/sign_up';
import Login from './components/login';
import React from "react";
import { useEffect } from 'react';
import { gapi } from 'gapi-script';
const client_id="52663610326-hs533k1oi51kcbeujhh3rnm1jobv0209.apps.googleusercontent.com"
function App() {

  useEffect(()=>{
    function start(){
      gapi.client.init({
       client_id:client_id,
       scope:""
      })
    };
    gapi.load('client:auth2',start);
  }

)

  return (
    
      
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="products" element={<Products />} />
        <Route path="about" element={<About />} />
        <Route path="singleProduct" element={<SingleProduct />} />
        <Route path="contact" element={<Contact />} />
        <Route path="cart" element={<Cart />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </BrowserRouter>
   
  );
}

export default App;
