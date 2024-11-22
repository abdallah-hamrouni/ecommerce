import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from './Header';

const Carts = () => {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchCartItems = async () => {
            if (!token) {
                console.error('No token found, please login');
                return;
            }

            try {
                const response = await axios.get("http://localhost:5000/api/carts", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                console.log('Fetched cart items:', response.data.cart);
                setCartItems(response.data.cart);
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
        };

        fetchCartItems();
    }, [token]);

    useEffect(() => {
        // Recalculate total price whenever cartItems change
        const price = cartItems.reduce((total, item) => total + (item.productId.price * item.quantity), 0);
        setTotalPrice(price);
    }, [cartItems]);

    const handleQuantityChange = (index, event) => {
        const newCartItems = [...cartItems];
        newCartItems[index].quantity = event.target.value;
        setCartItems(newCartItems);
    };

   
    return (
        <>
            <Header />
            <div className="container px-3 my-5 clearfix" style={{ paddingTop: "130px" }}>
                <div className="card">
                    <div className="card-header">
                        <h2>Shopping Cart</h2>
                    </div>
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-bordered m-0">
                                <thead>
                                    <tr>
                                        <th className="text-center py-3 px-4" style={{ minWidth: 400 }}>Product Name &amp; Details</th>
                                        <th className="text-right py-3 px-4" style={{ width: 100 }}>Price</th>
                                        <th className="text-center py-3 px-4" style={{ width: 120 }}>Quantity</th>
                                        <th className="text-right py-3 px-4" style={{ width: 100 }}>Total</th>
                                        <th className="text-center align-middle py-3 px-0" style={{ width: 40 }}>
                                            <a href="/" className="shop-tooltip float-none text-light" >
                                                <i className="ino ion-md-trash" />
                                            </a>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartItems.length > 0 ? (
                                        cartItems.map((item, index) => (
                                            <tr key={index}>
                                                <td className="p-4">
                                                    <div className="media align-items-center">
                                                        <img
                                                            src={item.productId.images[0]}
                                                            className="d-block ui-w-40 ui-bordered mr-4"
                                                            alt={item.name}
                                                        />
                                                        <div className="media-body">
                                                            <a href="/" className="d-block text-dark">{item.productId.name}</a>
                                                            <small>
                                                                <span className="text-muted">Description : </span>
                                                                <span>{item.productId.description}</span>
                                                            </small>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="text-right font-weight-semibold align-middle p-4">${item.productId.price}</td>
                                                <td className="align-middle p-4">
                                                    <input
                                                        type="number"
                                                        className="form-control text-center"
                                                        value={item.quantity}
                                                        onChange={(event) => handleQuantityChange(index, event)}
                                                    />
                                                </td>
                                                <td className="text-right font-weight-semibold align-middle p-4">${(item.productId.price * item.quantity).toFixed(2)}</td>
                                                <td className="text-center align-middle px-0">
                                                    <button class="bin-button">
                                                    <svg
                                                        class="bin-top"
                                                        viewBox="0 0 39 7"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <line y1="5" x2="39" y2="5" stroke="white" stroke-width="4"></line>
                                                        <line
                                                        x1="12"
                                                        y1="1.5"
                                                        x2="26.0357"
                                                        y2="1.5"
                                                        stroke="white"
                                                        stroke-width="3"
                                                        ></line>
                                                    </svg>
                                                    <svg
                                                        class="bin-bottom"
                                                        viewBox="0 0 33 39"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <mask id="path-1-inside-1_8_19" fill="white">
                                                        <path
                                                            d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z"
                                                        ></path>
                                                        </mask>
                                                        <path
                                                        d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z"
                                                        fill="white"
                                                        mask="url(#path-1-inside-1_8_19)"
                                                        ></path>
                                                        <path d="M12 6L12 29" stroke="white" stroke-width="4"></path>
                                                        <path d="M21 6V29" stroke="white" stroke-width="4"></path>
                                                    </svg>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="text-center">Your cart is empty</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <div className="d-flex flex-wrap justify-content-between align-items-center pb-4">
                            <div className="mt-4">
                                
                            </div>
                            <div className="d-flex">
                                <div className="text-right mt-4">
                                    <label className="text-muted font-weight-normal m-0">Total price</label>
                                    <div className="text-large"><strong>${totalPrice.toFixed(2)}</strong></div>
                                </div>
                            </div>
                        </div>
                        <div className="float-right">
                            <button type="button" className="btn btn-lg btn-default md-btn-flat mt-2 mr-3">Back to shopping</button>
                            <button type="button" className="btn btn-lg btn-primary mt-2">Checkout</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Carts;

