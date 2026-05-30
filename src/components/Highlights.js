import React from 'react';
import './Highlights.css';

function Highlights() {
  return (
    <section className="Highlights fade-in-up">
      <div className="highlights-container">
        <h2>Why Choose Little Lemon?</h2>
        <div className="highlights-grid">
          <div className="highlight-card">
            <h3>🌿 Fresh Ingredients</h3>
            <p>All our dishes are prepared with the freshest, locally-sourced ingredients.</p>
          </div>
          <div className="highlight-card">
            <h3>👨‍🍳 Expert Chefs</h3>
            <p>Our experienced chefs bring passion and creativity to every dish.</p>
          </div>
          <div className="highlight-card">
            <h3>🏡 Cozy Ambiance</h3>
            <p>A warm and welcoming environment perfect for any occasion.</p>
          </div>
          <div className="highlight-card">
            <h3>💚 Sustainable</h3>
            <p>We're committed to environmentally friendly practices.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Highlights;
