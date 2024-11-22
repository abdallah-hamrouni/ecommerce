import "./App.css";
import Home from "./components/Home";
import React from "react";
import Products from "./components/Products";
import About from "./components/About";
import SingleProduct from "./components/SingleProduct";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Contact from "./components/Contact";
import Carts from "./components/Carts";
import Login from "./components/Login";
import SignUp from "./components/SignUp";

function App() {
  return (
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/products" element={<Products />} />
        <Route path="/about" element={<About />} />
        <Route path="/singleProduct" element={<SingleProduct />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/carts" element={<Carts />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/singleProduct/:id"  element={<SingleProduct />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
