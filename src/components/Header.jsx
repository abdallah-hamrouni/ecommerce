import React from "react";
import { Link } from "react-router-dom";

const header =() =>{
    return(
<div>
<div className="header-area header-sticky">
<div className="container">
  <div className="row">
    <div className="col-12">
      <nav className="main-nav">
        <Link to="/" className="logo">
        <img src="assets/images/logo.png" alt=""/>
        </Link>
       
        <ul className="nav">
          <li className="scroll-to-section"><a href="#top" className="active">Home</a></li>
          <li className="scroll-to-section"><a href="#men">Men's</a></li>
          <li className="scroll-to-section"><a href="#women">Women's</a></li>
          <li className="scroll-to-section"><a href="#kids">Kid's</a></li>
          <li className="submenu">
            <a href="/">Pages</a>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/products">Products</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </li>
          <li className="submenu">
            <a href="/">Features</a>
            <ul>
              <li><a href="/">Features Page 1</a></li>
              <li><a href="/">Features Page 2</a></li>
              <li><a href="/">Features Page 3</a></li>
              <li><a rel="nofollow" href="https://templatemo.com/page/4" >Template Page 4</a></li>
            </ul>
          </li>
          <li className="scroll-to-section"><a href="#explore">Explore</a></li>
        </ul>        
          <a href="/" className="menu-trigger">
            <span>Menu</span>
          </a>
        {/* ***** Menu End ***** */}
      </nav>
    </div>
  </div>
</div>
</div>
</div>
    )
}

export default header