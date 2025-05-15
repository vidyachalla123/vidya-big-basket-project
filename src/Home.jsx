import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="container">
      {/* Hero Section */}
      <div className="hero-section">
        <h1 className="main-heading">
          Welcome to Big-Basket clone 🛒
        </h1>
        <p className="sub-text">
          Your trusted destination for groceries, essentials, and everyday products at the best prices!
        </p>
      </div>

      {/* Features */}
      <div className="features-container">
        <div className="feature-card">
          <h3>⚡ Quick Shipping</h3>
          <p>Get your order delivered on the same day in key metro areas.</p>
        </div>
        <div className="feature-card">
          <h3>🛍️ Wide Variety</h3>
          <p>Explore thousands of items in diverse categories.</p>
        </div>
        <div className="feature-card">
          <h3>🔒 Safe Checkout</h3>
          <p>Choose from various payment methods, all protected by SSL encryption.</p>
        </div>
      </div>

      {/* Category Navigation */}
      <h2 className="categories-heading">Browse by Collection</h2>
      <div className="categories-container">
        <div className="category-card">
          <Link to="/Veg">
            <img src="/images/vegetables.webp" alt="Vegetables" className="category-image" />
            <h3>Vegetables</h3>
          </Link>
        </div>
        <div className="category-card">
          <Link to="/NonVeg">
            <img src="/images/nonvegetables.jpg" alt="Non-Veg" className="category-image" />
            <h3>Non-Veg</h3>
          </Link>
        </div>
        <div className="category-card">
          <Link to="/Milk">
            <img src="/images/milkproducts.jpg" alt="Milk" className="category-image" />
            <h3>Milk</h3>
          </Link>
        </div>
        <div className="category-card">
          <Link to="/Chocolate">
            <img src="/images/chocolates.jpg" alt="Chocolate" className="category-image" />
            <h3>Chocolates</h3>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <p>&copy; {new Date().getFullYear()} <strong>Vidya-store</strong>. All rights reserved.</p>
          <p>
            <a href="/terms" className="footer-link">Terms of Service</a> |
            <a href="/privacy" className="footer-link"> Privacy Policy</a>
          </p>
          <p>Designed & Developed by vidyasri challa</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
