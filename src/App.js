import "./App.css";
import Home from "./components/home";
import React from "react";
import Products from "./components/products";
import About from "./components/about";
import SingleProduct from "./components/singleProduct";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Contact from "./components/contact";
import Carts from "./components/carts";
import Login from "./components/login";

function App() {
  return (
    /* <div className="App">
      <Header />
       <Home /> 
      <Footer />
  </div> */
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/products" element={<Products />} />
        <Route path="/about" element={<About />} />
        <Route path="/singleProduct" element={<SingleProduct />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/carts" element={<Carts />} />
        <Route path="/login" element={<Login />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
