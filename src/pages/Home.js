import React from 'react';
import { Link } from 'react-router-dom';
import Highlights from '../components/Highlights';
import Testimonials from '../components/Testimonials';
import './Home.css';

function Home() {
  return (
    <div className="Home">
      <section className="home-hero fade-in-up">
        <div className="home-hero-copy">
          <span className="hero-pill">Chicago • Mediterranean</span>
          <h1>Little Lemon</h1>
          <p className="hero-text">
            Bright, fresh Mediterranean-inspired dishes crafted with seasonal ingredients and warm hospitality.
          </p>
          <div className="hero-actions">
            <Link to="/reservation" className="btn btn-primary">
              Reserve a Table
            </Link>
            <Link to="/menu" className="btn btn-secondary">
              See Menu
            </Link>
          </div>

          <div className="hero-illustration">
            <div className="illustration-bubble bubble-1" />
            <div className="illustration-bubble bubble-2" />
            <div className="illustration-card">
              <span className="card-label">Today's special</span>
              <strong>Lemon Herb Salmon</strong>
              <p>Bright citrus flavors with roasted seasonal vegetables.</p>
            </div>
          </div>

          <div className="hero-features">
            <span className="feature-pill">Farm fresh ingredients</span>
            <span className="feature-pill">Chef-crafted dishes</span>
            <span className="feature-pill">Cozy neighborhood dining</span>
          </div>
        </div>

        <div className="home-hero-image">
          <img src="/icons_assets/restauranfood.jpg" alt="Restaurant Food" />
          <div className="hero-card">
            <h3>Enjoy the flavors of the season</h3>
            <p>Freshly prepared with local ingredients every day.</p>
          </div>
        </div>
      </section>

      <section className="featured-section fade-in-up">
        <div className="container">
          <div className="section-heading">
            <h2 className="section-title">This Week's Specials</h2>
            <p className="section-subtitle">
              Handcrafted dishes designed to delight your senses and make every meal unforgettable.
            </p>
          </div>

          <div className="home-menu-grid">
            <article className="home-menu-card">
              <img src="/icons_assets/greek%20salad.jpg" alt="Greek Salad" />
              <div className="home-menu-card-body">
                <div>
                  <h3>Greek Salad</h3>
                  <p>Fresh greens, olives, feta cheese, and citrus dressing.</p>
                </div>
                <span className="menu-price">$12.99</span>
              </div>
            </article>
            <article className="home-menu-card">
              <img src="/icons_assets/bruchetta.svg" alt="Bruchetta" />
              <div className="home-menu-card-body">
                <div>
                  <h3>Bruchetta</h3>
                  <p>Garlic bread topped with tomato, basil, and olive oil.</p>
                </div>
                <span className="menu-price">$8.99</span>
              </div>
            </article>
            <article className="home-menu-card">
              <img src="/icons_assets/lemon%20dessert.jpg" alt="Lemon Dessert" />
              <div className="home-menu-card-body">
                <div>
                  <h3>Lemon Dessert</h3>
                  <p>A light and refreshing citrus dessert to finish your meal.</p>
                </div>
                <span className="menu-price">$8.99</span>
              </div>
            </article>
          </div>

          <div className="section-action">
            <Link to="/menu" className="btn btn-primary">
              Explore the Menu
            </Link>
          </div>
        </div>
      </section>

      <Highlights />
      <Testimonials />
    </div>
  );
}

export default Home;
