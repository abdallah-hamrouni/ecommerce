  import React, { useEffect, useState } from "react";
  import { useParams } from "react-router-dom";
  import axios from "axios";
  import Header from './Header';
  import Footer from './Footer';
  import { Link } from "react-router-dom";

  const SingleProduct = () => {
    const { id } = useParams(); 
    const [product, setProduct] = useState(null);
    const [mainImage, setMainImage] = useState(""); 
    //const [relImage, setRelImage] = useState(""); // State for the main displayed image

    useEffect(() => {
      const fetchProduct = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/products/${id}`);
          setMainImage(response.data.images[0]); 
          setProduct(response.data);
        } catch (error) {
          console.error("Error fetching product data:", error);
        } finally {
        }
      };

      fetchProduct();
    }, [id]);
    const addToCart = async (productId, quantity = 1) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found, please login');
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:5000/api/carts/addToCart",
        { productId, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log('Product added to cart:', response.data);
    } catch (error) {
      console.error('Error adding to cart:', error.response ? error.response.data : error.message);
    }
  };

      

    if (!product) {
      return <div>Product not found</div>; 
    }

    return (
      <div>
  <Header />
  <div className="page-heading" id="top">
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="inner-content">
            <h2>{product.name}</h2>
            <span>Awesome & Creative Layout</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <section className="section" id="product">
  <div className="container">
    <div className="row">
      {/* Left Section: Product Images */}
      <div className="col-lg-8">
        <div className="left-images" style={{ display: "flex", gap: "20px", alignItems: "center", cursor: "pointer" }}>
          {/* Main Image */}
          <img
            src={mainImage} // Use the first image as the main one
            alt={product.name}
            style={{ width: "450px", height: "600px", border: "1px solid #ccc" }}
          />

          {/* Additional Images */}
          <div className="related-images" style={{ display: "flex", flexDirection: "column", gap: "10px", cursor: "pointer", transition: "border 0.3s ease" }}>
            {product.images.slice(1).map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Related to ${product.name}`}
                onClick={() => setMainImage(image)}
                onMouseOver={(e) => (e.currentTarget.style.border = "2px solid #007BFF")} // Add blue border on hover
                onMouseOut={(e) => (e.currentTarget.style.border = "1px solid #ccc")}
                style={{
                  width: "150px",
                  height: "150px",
                  border: "1px solid #ccc",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Right Section: Product Details */}
      <div className="col-lg-4">
        <div className="right-content">
          <h4>{product.name}</h4>
          <span className="price">${product.price}</span>
          <p>{product.description}</p>
          <br />

          {/* Color Selection */}
          <div className="color-selection">
            <h4>Available Colors:</h4>
            <div style={{ display: "flex", gap: "10px" }}>
              {product.colors && product.colors.map((color, index) => (
                <div
                  key={index}
                  onClick={() => setMainImage(color.image)} // Assuming each color has a corresponding image
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                    backgroundColor: color.hex, // Assuming color has hex value
                    cursor: "pointer",
                    border: "2px solid #ccc",
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.border = "2px solid #007BFF")} // Hover effect
                  onMouseOut={(e) => (e.currentTarget.style.border = "2px solid #ccc")}
                />
              ))}
            </div>
          </div>

          <br />

          <div className="main-button">
            <Link onClick={() => addToCart(id, 1)}>Add to cart</Link>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>



  <Footer />
</div>

    );
  };

  export default SingleProduct;
