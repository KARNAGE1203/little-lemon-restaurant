import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Reservation.css';

function Reservation() {
  const navigate = useNavigate();
  const [details, setDetails] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: '2',
    occasion: 'Dinner',
    notes: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate('/confirmation');
  };

  return (
    <div className="Reservation container">
      <section className="reservation-banner">
        <div className="reservation-copy">
          <span className="hero-pill">Reserve Your Table</span>
          <h1>Plan your visit to Little Lemon</h1>
          <p>Choose a time, set the mood, and we’ll have your table ready with fresh, seasonal flavors waiting.</p>
          <p>We make it easy to reserve for lunch, dinner, or special occasions.</p>
        </div>
        <div className="reservation-image">
          <img src="/icons_assets/restaurant.jpg" alt="Restaurant interior" />
        </div>
      </section>

      <section className="reservation-form-card">
        <h2>Reservation details</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input id="name" name="name" type="text" value={details.name} onChange={handleChange} placeholder="Your name" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" value={details.email} onChange={handleChange} placeholder="you@example.com" required />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input id="phone" name="phone" type="tel" value={details.phone} onChange={handleChange} placeholder="(123) 456-7890" required />
            </div>
            <div className="form-group">
              <label htmlFor="date">Date</label>
              <input id="date" name="date" type="date" value={details.date} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="time">Time</label>
              <input id="time" name="time" type="time" value={details.time} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="guests">Guests</label>
              <select id="guests" name="guests" value={details.guests} onChange={handleChange}>
                <option value="1">1 guest</option>
                <option value="2">2 guests</option>
                <option value="3">3 guests</option>
                <option value="4">4 guests</option>
                <option value="5">5 guests</option>
                <option value="6">6 guests</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="occasion">Occasion</label>
              <select id="occasion" name="occasion" value={details.occasion} onChange={handleChange}>
                <option>Lunch</option>
                <option>Dinner</option>
                <option>Birthday</option>
                <option>Anniversary</option>
                <option>Other</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="notes">Special requests</label>
            <textarea id="notes" name="notes" value={details.notes} onChange={handleChange} placeholder="Let us know how we can help." />
          </div>
          <button type="submit" className="btn btn-primary">Confirm reservation</button>
        </form>
      </section>
    </div>
  );
}

export default Reservation;
