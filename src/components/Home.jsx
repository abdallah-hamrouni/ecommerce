import React,{useState,useEffect} from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Header from './Header';
import Footer from './Footer';
import axios from "axios";

import { Link } from "react-router-dom";

const Home = () => {
   const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
      pauseOnHover: true,
    

      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };
    const womenItems = [
      {
        id: 1,
        imgSrc: "assets/images/women-01.jpg",
        title: "New Green Jacket",
        price: "$75.00",
        stars: 5,
      },
      {
        id: 2,
        imgSrc: "assets/images/women-02.jpg",
        title: "Classic Dress",
        price: "$45.00",
        stars: 4,
      },
      {
        id: 3,
        imgSrc: "assets/images/women-03.jpg",
        title: "Spring Collection",
        price: "$130.00",
        stars: 5,
      },
      {
        id: 4,
        imgSrc: "assets/images/women-01.jpg",
        title: "Classic Spring",
        price: "$120.00",
        stars: 4,
      },
    ];

    const kidsItems = [
      {
        id: 1,
        imgSrc: "assets/images/kid-01.jpg",
        title: "School Collection",
        price: "$80.00",
        stars: 5,
      },
      {
        id: 2,
        imgSrc: "assets/images/kid-02.jpg",
        title: "Summer Cap",
        price: "$12.00",
        stars: 4,
      },
      {
        id: 3,
        imgSrc: "assets/images/kid-03.jpg",
        title: "Classic Kid",
        price: "$30.00",
        stars: 5,
      },
      {
        id: 4,
        imgSrc: "assets/images/kid-01.jpg",
        title: "Classic Spring",
        price: "$120.00",
        stars: 4,
      },
    ];
useEffect(() => {
    const fetchMenProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/produits?category=Woman" 
        );
        console.log(response.data);
        setItems(response.data)
      } catch (error) {
        console.error("Error fetching men products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenProducts();
  }, []);
  const ajouterAuPanier = async (item) => {
    // Vérification de la présence du token dans le local storage
    let token = localStorage.getItem('token');

    if (!token) {
        // Si le token n'est pas présent, affichez un message d'alerte et retournez
        alert("Vous devez être connecté pour ajouter des produits au panier.");
        return;
    }

    try {
        const response = await axios.post('http://localhost:5000/panier', {
            panelId: item._id,           
            nom: item.nom,               
            prix: item.prix,             
            image: item.image,           
            categorie: item.categorie,    
            quantite: 1,                 
        }, {
            headers: {
                Authorization: `Bearer ${token}` // Ajout du token aux en-têtes de la requête
            }
        });
        if (response.status === 200) {
            alert('Produit ajouté au panier avec succès !');
        } else {
            alert("Échec de l'ajout du produit au panier.");
        }
    } catch (error) {
        console.error("Erreur lors de l'ajout au panier:", error);
        alert("Erreur lors de l'ajout au panier.");
    }
};
  
  return (
    <div>
      <Header/>
      <div>
        <div className="main-banner" id="top">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-6">
                <div className="left-content">
                  <div className="thumb">
                    <div className="inner-content">
                      <h4>We Are Hexashop</h4>
                      <span>Awesome, clean &amp; creative HTML5 Template</span>
                      <div className="main-border-button">
                        <a href="/">Purchase Now!</a>
                      </div>
                    </div>
                    <img src="assets/images/left-banner-image.jpg" alt="" />
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="right-content">
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="right-first-image">
                        <div className="thumb">
                          <div className="inner-content">
                            <h4>Women</h4>
                            <span>Best Clothes For Women</span>
                          </div>
                          <div className="hover-content">
                            <div className="inner">
                              <h4>Women</h4>
                              <p>
                                Lorem ipsum dolor sit amet, conservisii ctetur
                                adipiscing elit incid.
                              </p>
                              <div className="main-border-button">
                                <a href="/">Discover More</a>
                              </div>
                            </div>
                          </div>
                          <img src="assets/images/baner-right-image-01.jpg" alt=""/>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="right-first-image">
                        <div className="thumb">
                          <div className="inner-content">
                            <h4>Men</h4>
                            <span>Best Clothes For Men</span>
                          </div>
                          <div className="hover-content">
                            <div className="inner">
                              <h4>Men</h4>
                              <p>
                                Lorem ipsum dolor sit amet, conservisii ctetur
                                adipiscing elit incid.
                              </p>
                              <div className="main-border-button">
                                <a href="/">Discover More</a>
                              </div>
                            </div>
                          </div>
                          <img src="assets/images/baner-right-image-02.jpg" alt=""/>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="right-first-image">
                        <div className="thumb">
                          <div className="inner-content">
                            <h4>Kids</h4>
                            <span>Best Clothes For Kids</span>
                          </div>
                          <div className="hover-content">
                            <div className="inner">
                              <h4>Kids</h4>
                              <p>
                                Lorem ipsum dolor sit amet, conservisii ctetur
                                adipiscing elit incid.
                              </p>
                              <div className="main-border-button">
                            <a href="/">Discover More</a>
                              </div>
                            </div>
                          </div>
                          <img src="assets/images/baner-right-image-03.jpg" alt="" />
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="right-first-image">
                        <div className="thumb">
                          <div className="inner-content">
                            <h4>Accessories</h4>
                            <span>Best Trend Accessories</span>
                          </div>
                          <div className="hover-content">
                            <div className="inner">
                              <h4>Accessories</h4>
                              <p>
                                Lorem ipsum dolor sit amet, conservisii ctetur
                                adipiscing elit incid.
                              </p>
                              <div className="main-border-button">
                                <a href="/">Discover More</a>
                              </div>
                            </div>
                          </div>
                          <img src="assets/images/baner-right-image-04.jpg" alt=""/>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
       
        <section className="section" id="men">
  <div className="container">
    <div className="row">
      <div className="col-lg-6">
        <div className="section-heading">
          <h2>Women's Latest</h2>
          <span>
            Details to details is what makes Hexashop different from the other themes.
          </span>
        </div>
      </div>
    </div>
  </div>

  <div className="container">
    <div className="row">
      <div className="col-lg-12">
        <div className="men-item-carousel relative">
          {/* Ensure settings is defined for your slider */}
          <Slider {...settings}>
            {items.length === 0 ? (
              <div>Loading...</div> // Display loading message if items are empty
            ) : (
              items.map((item) => (
                <div className="item" key={item._id}> {/* Use _id for unique key */}
                  <div className="thumb">
                    <div className="hover-content">
                      <ul>
                        <li>
                          <a href="/">
                            <i className="fa fa-eye" />
                          </a>
                        </li>
                        
                        <li>
                        <a onClick={() => ajouterAuPanier(item)}>
                      <i className="fa fa-shopping-cart" />
                    </a>
                        </li>
                      </ul>
                    </div>
                    <Link to="/singleProduct">
                      <img style={{height:"480px",width:"350px",cursor:"pointer"}}
                      className="mx-1"
                      src={item.image} // Use item.image for the image URL
                      
                    />
                    </Link>
                  </div>
                  <div className="down-content">
                    <h4>{item.nom}</h4>  {/* Display product name */}
                    <span>${item.prix}</span>  {/* Display price */}
                   
                  </div>
                </div>
              ))
            )}
          </Slider>

          {/* Previous and Next Arrows */}
          <div className="owl-nav">
            <div className="owl-prev">
              <span />
            </div>
            <div className="owl-next">
              <span />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
          <div className="main-border-button">
              <a href="/">Discover More</a>
          </div>

        {/* ***** Men Area Ends ***** */}
        {/* ***** Women Area Starts ***** */}
        

        {/* ***** Kids Area Ends ***** */}
        {/* ***** Explore Area Starts ***** */}
        <section className="section" id="explore">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div className="left-content">
                  <h2>Explore Our Products</h2>
                  <span>
                    You are allowed to use this HexaShop HTML CSS template. You
                    can feel free to modify or edit this layout. You can convert
                    this template as any kind of ecommerce CMS theme as you
                    wish.
                  </span>
                  <div className="quote">
                    <i className="fa fa-quote-left" />
                    <p>
                      You are not allowed to redistribute this template ZIP file
                      on any other website.
                    </p>
                  </div>
                  <p>
                    There are 5 pages included in this HexaShop Template and we
                    are providing it to you for absolutely free of charge at our
                    TemplateMo website. There are web development costs for us.
                  </p>
                  <p>
                    If this template is beneficial for your website or business,
                    please kindly{" "}
                    <a
                      rel="nofollow"
                      href="https://paypal.me/templatemo"
                       
                    >
                      support us
                    </a>{" "}
                    a little via PayPal. Please also tell your friends about our
                    great website. Thank you.
                  </p>
                  <div className="main-border-button">
                    <a href="products.html">Discover More</a>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="right-content">
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="leather">
                        <h4>Leather Bags</h4>
                        <span>Latest Collection</span>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="first-image">
                        <img src="assets/images/explore-image-01.jpg" alt="" />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="second-image">
                        <img src="assets/images/explore-image-02.jpg" alt="" />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="types">
                        <h4>Different Types</h4>
                        <span>Over 304 Products</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* ***** Explore Area Ends ***** */}
        {/* ***** Social Area Starts ***** */}
        <section className="section" id="social">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="section-heading">
                  <h2>Social Media</h2>
                  <span>
                    Details to details is what makes Hexashop different from the
                    other themes.
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row images">
              <div className="col-2">
                <div className="thumb">
                  <div className="icon">
                    <a href="http://instagram.com">
                      <h6>Fashion</h6>
                      <i className="fa fa-instagram" />
                    </a>
                  </div>
                  <img src="assets/images/instagram-01.jpg" alt="" />
                </div>
              </div>
              <div className="col-2">
                <div className="thumb">
                  <div className="icon">
                    <a href="http://instagram.com">
                      <h6>New</h6>
                      <i className="fa fa-instagram" />
                    </a>
                  </div>
                  <img src="assets/images/instagram-02.jpg" alt="" />
                </div>
              </div>
              <div className="col-2">
                <div className="thumb">
                  <div className="icon">
                    <a href="http://instagram.com">
                      <h6>Brand</h6>
                      <i className="fa fa-instagram" />
                    </a>
                  </div>
                  <img src="assets/images/instagram-03.jpg" alt="" />
                </div>
              </div>
              <div className="col-2">
                <div className="thumb">
                  <div className="icon">
                    <a href="http://instagram.com">
                      <h6>Makeup</h6>
                      <i className="fa fa-instagram" />
                    </a>
                  </div>
                  <img src="assets/images/instagram-04.jpg" alt="" />
                </div>
              </div>
              <div className="col-2">
                <div className="thumb">
                  <div className="icon">
                    <a href="http://instagram.com">
                      <h6>Leather</h6>
                      <i className="fa fa-instagram" />
                    </a>
                  </div>
                  <img src="assets/images/instagram-05.jpg" alt="" />
                </div>
              </div>
              <div className="col-2">
                <div className="thumb">
                  <div className="icon">
                    <a href="http://instagram.com">
                      <h6>Bag</h6>
                      <i className="fa fa-instagram" />
                    </a>
                  </div>
                  <img src="assets/images/instagram-06.jpg" alt="" />
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* ***** Social Area Ends ***** */}
        {/* ***** Subscribe Area Starts ***** */}
        <div className="subscribe">
          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                <div className="section-heading">
                  <h2>By Subscribing To Our Newsletter You Can Get 30% Off</h2>
                  <span>
                    Details to details is what makes Hexashop different from the
                    other themes.
                  </span>
                </div>
                <form id="subscribe" action method="get">
                  <div className="row">
                    <div className="col-lg-5">
                      <fieldset>
                        <input
                          name="name"
                          type="text"
                          id="name"
                          placeholder="Your Name"
                          required
                        />
                      </fieldset>
                    </div>
                    <div className="col-lg-5">
                      <fieldset>
                        <input
                          name="email"
                          type="text"
                          id="email"
                          pattern="[^ @]*@[^ @]*"
                          placeholder="Your Email Address"
                          required
                        />
                      </fieldset>
                    </div>
                    <div className="col-lg-2">
                      <fieldset>
                        <button
                          type="submit"
                          id="form-submit"
                          className="main-dark-button"
                        >
                          <i className="fa fa-paper-plane" />
                        </button>
                      </fieldset>
                    </div>
                  </div>
                </form>
              </div>
              <div className="col-lg-4">
                <div className="row">
                  <div className="col-6">
                    <ul>
                      <li>
                        Store Location:
                        <br />
                        <span>Sunny Isles Beach, FL 33160, United States</span>
                      </li>
                      <li>
                        Phone:
                        <br />
                        <span>010-020-0340</span>
                      </li>
                      <li>
                        Office Location:
                        <br />
                        <span>North Miami Beach</span>
                      </li>
                    </ul>
                  </div>
                  <div className="col-6">
                    <ul>
                      <li>
                        Work Hours:
                        <br />
                        <span>07:30 AM - 9:30 PM Daily</span>
                      </li>
                      <li>
                        Email:
                        <br />
                        <span>info@company.com</span>
                      </li>
                      <li>
                        Social Media:
                        <br />
                        <span>
                          <a href="/">Facebook</a>, <a href="/">Instagram</a>,{" "}
                          <a href="/">Behance</a>, <a href="/">Linkedin</a>
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Home;
