import React from 'react';
import './ContactUs.css'; // Import scoped styles

function ContactUs() {
  return (
    <div className="contact-container">
      <h1 className="contact-title">Contact Us</h1>
      <p className="contact-subtitle">
        Have any questions, feedback, or support requests? We'd love to hear from you.
      </p>

      <form className="contact-form">
        <label>
          Name:
          <input type="text" placeholder="Your Name" required />
        </label>

        <label>
          Email:
          <input type="email" placeholder="Your Email" required />
        </label>

        <label>
          Message:
          <textarea placeholder="Your Message" rows="5" required></textarea>
        </label>

        <button type="submit">Send Message</button>
      </form>
    </div>
  );
}

export default ContactUs;
