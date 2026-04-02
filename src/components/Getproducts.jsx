import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import slide1 from "../images/Baby Girl Clothes Long Sleeve.jpeg";
import slide2 from "../images/Mens brown double breasted suit _ Custom tailored pinstripe outfit.jpeg";
import slide3 from "../images/Step into Spring 17 Floral Maxidresses Youll Adore.jpeg";

const Getproducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const img_url = "http://peninahtruham.alwaysdata.net/static/images/";
  const navigate = useNavigate();

  // Fetch products from API
  const getProducts = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.get("http://peninahtruham.alwaysdata.net/api/get_product_details");
      setProducts(response.data);
    } catch (error) {
      setError(error.response?.data?.message || error.message || "Failed to fetch products");
      console.error("Products fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleAddToCart = (product) => {
    navigate('/addtocart', { state: { product } });
  };

  const handleBuyNow = (product) => {
    navigate('/makepayment', { state: { product } });
  };

  if (loading) {
    return (
      <div className="products-loading-container">
        <div className="loading-spinner-large"></div>
        <p className="loading-text">Loading products...</p>
      </div>
    );
  }

  return (
    <div className="products-container">
      <div className="container-fluid">
        {/* Hero Section with Carousel */}
        <section className="hero-carousel-section mb-5">
          <div className="row">
            <div className="col-12">
              <div
                id="heroCarousel"
                className="carousel slide hero-carousel"
                data-bs-ride="carousel"
                data-bs-interval="5000"
              >
                <div className="carousel-indicators">
                  <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="0" className="active"></button>
                  <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="1"></button>
                  <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="2"></button>
                </div>

                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <div className="hero-slide-overlay">
                      <img src={slide1} alt="Baby Girl Clothes" className="d-block w-100 hero-img" />
                      <div className="hero-text">
                        <h1>Premium Fashion Collection</h1>
                        <p>Discover the latest trends</p>
                      </div>
                    </div>
                  </div>
                  <div className="carousel-item">
                    <div className="hero-slide-overlay">
                      <img src={slide2} alt="Men's Suits" className="d-block w-100 hero-img" />
                      <div className="hero-text">
                        <h1>Elegant Men's Collection</h1>
                        <p>Custom tailored perfection</p>
                      </div>
                    </div>
                  </div>
                  <div className="carousel-item">
                    <div className="hero-slide-overlay">
                      <img src={slide3} alt="Women's Dresses" className="d-block w-100 hero-img" />
                      <div className="hero-text">
                        <h1>Spring Floral Collection</h1>
                        <p>Maxi dresses you'll adore</p>
                      </div>
                    </div>
                  </div>
                </div>

                <button className="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className="products-section">
          <div className="container">
            <div className="row mb-5">
              <div className="col-12 text-center">
                <h2 className="section-title">Available Products</h2>
                {error && (
                  <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    <i className="bi bi-exclamation-triangle-fill me-2"></i>
                    {error}
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => setError("")}
                      aria-label="Close"
                    ></button>
                  </div>
                )}
              </div>
            </div>

            {products.length === 0 ? (
              <div className="empty-state">
                <i className="bi bi-bag-check display-1 text-muted mb-4"></i>
                <h3>No products available</h3>
                <p className="text-muted">Check back soon for new arrivals!</p>
                <button
                  className="btn btn-primary btn-lg"
                  onClick={getProducts}
                >
                  <i className="bi bi-arrow-clockwise me-2"></i>
                  Retry
                </button>
              </div>
            ) : (
              <div className="row g-4">
                {products.map((product) => (
                  <div key={product.id || product.product_name} className="col-lg-4 col-md-6">
                    <div className="product-card h-100">
                      <div className="product-image-container">
                        <img
                          src={`${img_url}${product.product_photo}`}
                          alt={product.product_name}
                          className="product-image"
                          onError={(e) => {
                            e.target.src = '/placeholder-image.jpg'; // Fallback image
                          }}
                        />
                        <div className="product-badge">New</div>
                      </div>

                      <div className="card-body d-flex flex-column">
                        <h5 className="product-title">{product.product_name}</h5>
                        <p className="product-description flex-grow-1">
                          {product.product_description}
                        </p>
                        <div className="product-price mb-3">
                          KSh {parseFloat(product.producct_cost).toLocaleString()}
                        </div>

                        <div className="product-actions">
                          <button
                            className="btn btn-outline-primary w-100 mb-2"
                            onClick={() => handleAddToCart(product)}
                          >
                            <i className="bi bi-cart-plus me-2"></i>
                            Add to Cart
                          </button>
                          <button
                            className="btn btn-success w-100"
                            onClick={() => handleBuyNow(product)}
                          >
                            <i className="bi bi-lightning-charge me-2"></i>
                            Buy Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Getproducts;