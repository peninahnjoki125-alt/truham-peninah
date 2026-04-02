import axios from 'axios';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Addtocart = () => {
  const { product } = useLocation().state || {};
  const img_url = "http://peninahtruham.alwaysdata.net/static/images/";
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handle form submission for M-Pesa payment
  const submit = async (e) => {
    e.preventDefault();
    setMessage("Please wait as we process...");

    try {
      const data = new FormData();
      data.append("phone", phone);
      data.append("amount", product.producct_cost);
      
      const response = await axios.post(
        "http://peninahtruham.alwaysdata.net/api/mpesa_payment", 
        data
      );
      
      setMessage("Please complete the payment in your phone");
    } catch (error) {
      setMessage("");
      setError(error.response?.data?.message || error.message || "Payment failed. Please try again.");
      console.error("Payment error:", error);
    }
  };

  // Navigate back to products page
  const handleContinueShopping = () => {
    navigate('/getproducts');
  };

  if (!product) {
    return (
      <div className="addtocart-container">
        <div className="row mt-4 justify-content-center">
          <div className="card shadow col-md-6 p-4 text-center empty-state">
            <i className="bi bi-exclamation-triangle display-4 text-warning mb-4"></i>
            <h3>Product not found</h3>
            <p className="text-muted mb-4">The product you selected is no longer available.</p>
            <button 
              className="btn btn-primary btn-lg"
              onClick={() => navigate('/getproducts')}
            >
              <i className="bi bi-shop me-2"></i>
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="addtocart-container">
      <div className="row mt-4 justify-content-center">
        <div className="card shadow col-md-6 p-4 addtocart-card">
          {/* Back button */}
          <div className="mb-4">
            <button 
              className="btn btn-outline-secondary btn-sm"
              onClick={handleContinueShopping}
            >
              <i className="bi bi-arrow-left me-1"></i>
              Back to Products
            </button>
          </div>

          <h1 className="mb-4 section-title">
            <i className="bi bi-cart-check text-success me-2"></i>
            Added to Cart
          </h1>
          
          {/* Product Image */}
          <div className="text-center mb-4 product-image-container">
            <img 
              src={`${img_url}${product.product_photo}`} 
              alt={product.product_name}
              className="product-image"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/300x250/6c757d/e9ecef?text=No+Image';
              }}
            />
          </div>

          {/* Product Details */}
          <div className="mb-4 product-details">
            <h2 className="product-title">{product.product_name}</h2>
            <p className="product-description">{product.product_description}</p>
            <div className="product-price">
              KSh {parseFloat(product.producct_cost).toLocaleString()}
            </div>
          </div>

          {/* Payment Form */}
          <form onSubmit={submit}>
            {error && (
              <div className="alert alert-danger alert-dismissible fade show" role="alert">
                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                {error}
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setError("")}
                ></button>
              </div>
            )}
            
            {message && (
              <div className="alert alert-info alert-dismissible fade show" role="alert">
                <i className="bi bi-phone me-2"></i>
                {message}
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setMessage("")}
                ></button>
              </div>
            )}

            <div className="mb-4">
              <label htmlFor="phone" className="form-label fw-bold">
                <i className="bi bi-telephone-forward me-2 text-primary"></i>
                M-Pesa Phone Number
              </label>
              <input
                type="tel"
                className="form-control phone-input"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="2547XXXXXXXX"
                pattern="254[17]\d{8}"
                required
                maxLength="13"
              />
              <div className="form-text">
                Enter your Safaricom number (Format: 2547XXXXXXXX or 2541XXXXXXXX)
              </div>
            </div>

            {/* Pay Now Button */}
            <button 
              type="submit"
              className="btn btn-pay btn-lg w-100 mb-3"
              disabled={!phone || phone.length < 10}
            >
              <i className="bi bi-credit-card-2-front me-2"></i>
              Pay KSh {parseFloat(product.producct_cost).toLocaleString()} with M-Pesa
            </button>

            {/* Action Buttons */}
            <div className="row g-2">
              <div className="col-6">
                <button 
                  type="button"
                  className="btn btn-buy-later w-100"
                  onClick={handleContinueShopping}
                >
                  <i className="bi bi-shop me-2"></i>
                  Continue Shopping
                </button>
              </div>
              <div className="col-6">
                <button 
                  type="button"
                  className="btn btn-outline-secondary w-100"
                  onClick={() => navigate('/makepayment', { state: { product } })}
                >
                  <i className="bi bi-clock me-2"></i>
                  Buy Later
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Addtocart;