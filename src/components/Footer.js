import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer className="Footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Little Lemon</h3>
          <p>A cozy neighborhood spot with delicious meals made from fresh ingredients.</p>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/menu">Menu</Link></li>
            <li><Link to="/reservation">Reserve</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact</h4>
          <ul>
            <li><Link to="/contact">Contact Us</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
            <li><a href="tel:+1234567890">(123) 456-7890</a></li>
            <li><a href="mailto:info@littlelemon.com">info@littlelemon.com</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Hours</h4>
          <p>Mon-Thu: 11AM - 10PM</p>
          <p>Fri-Sat: 11AM - 11PM</p>
          <p>Sun: 12PM - 9PM</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2024 Little Lemon Restaurant. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
