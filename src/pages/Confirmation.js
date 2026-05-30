import React from 'react';
import { Link } from 'react-router-dom';
import './Confirmation.css';

function Confirmation() {
  return (
    <div className="Confirmation container">
      <section className="confirmation-card">
        <span className="confirmation-icon" aria-hidden="true">🎉</span>
        <h1>Reservation Confirmed!</h1>
        <p>
          Thank you for booking with Little Lemon. We look forward to serving you fresh,
          flavorful dishes in a warm and welcoming space.
        </p>

        <ul className="confirmation-list">
          <li>
            <span>Status</span>
            <span>Confirmed</span>
          </li>
          <li>
            <span>Guests</span>
            <span>2</span>
          </li>
          <li>
            <span>Time</span>
            <span>7:00 PM</span>
          </li>
        </ul>

        <Link to="/" className="btn btn-primary">Back to Home</Link>
      </section>
    </div>
  );
}

export default Confirmation;
