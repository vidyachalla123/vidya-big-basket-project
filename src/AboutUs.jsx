import React from 'react';
import './AboutUs.css'; // Import the scoped CSS

function AboutUs() {
  return (
    <div className="about-container">
      <h1 className="about-title">About Us</h1>
      <p className="about-intro">
        Welcome to our store! We are passionate about delivering fresh, high-quality products
        to your doorstep. From farm-fresh vegetables to delightful chocolates, we’ve got it all.
      </p>

      <div className="about-section">
        <h2>🌱 Our Mission</h2>
        <p>
          To bring healthy, affordable, and sustainable products to every household. We believe
          in supporting local farmers and businesses while providing top-notch service to our customers.
        </p>
      </div>

      <div className="about-section">
        <h2>🤝 Why Choose Us?</h2>
        <ul>
          <li>✅ Fresh and organic produce</li>
          <li>✅ Timely delivery</li>
          <li>✅ Easy returns and support</li>
          <li>✅ Trusted by thousands of happy customers</li>
        </ul>
      </div>
    </div>
  );
}

export default AboutUs;
