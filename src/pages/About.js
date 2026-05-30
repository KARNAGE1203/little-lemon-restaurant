import React from 'react';
import { Link } from 'react-router-dom';
import './About.css';

function About() {
  return (
    <div className="About container">
      <section className="about-hero">
        <div className="about-copy">
          <span className="hero-pill">Our Story</span>
          <h1>Bright food, warm hospitality, unforgettable moments.</h1>
          <p>
            Little Lemon was created to bring a fresh Mediterranean experience to Chicago. We believe in crisp flavors, thoughtful hospitality, and meals that bring people together.
          </p>
          <p>
            From locally sourced produce to hand-crafted desserts, every dish is made with a focus on quality, balance, and bright, refreshing flavors.
          </p>
          <Link to="/reservation" className="btn btn-secondary">
            Book a Table
          </Link>
        </div>
        <div className="about-image">
          <img src="/icons_assets/restaurant chef B.jpg" alt="Chef preparing food" />
        </div>
      </section>

      <section className="about-highlights">
        <div className="about-grid">
          <article className="about-card">
            <h3>Our Philosophy</h3>
            <p>Fresh ingredients, seasonal menus, and mindful cooking are at the heart of everything we do.</p>
          </article>
          <article className="about-card">
            <h3>Community First</h3>
            <p>We build relationships with local growers and serve dishes inspired by our neighborhood.</p>
          </article>
          <article className="about-card">
            <h3>Modern Comfort</h3>
            <p>Every meal is polished, approachable, and designed to feel like home.</p>
          </article>
        </div>

        <div className="about-values">
          <article>
            <h3>Fresh Ingredients</h3>
            <p>We source from local farms and treat every plate with care, freshness, and quality.</p>
          </article>
          <article>
            <h3>Joyful dining</h3>
            <p>From relaxed lunches to celebratory dinners, we make dining feel effortless and special.</p>
          </article>
        </div>
      </section>
    </div>
  );
}

export default About;
