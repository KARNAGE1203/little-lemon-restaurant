import React from 'react';
import './Testimonials.css';

const testimonials = [
  {
    id: 1,
    name: 'Adrian',
    image: '/icons_assets/Mario%20and%20Adrian%20A.jpg',
    rating: 5,
    comment: 'Amazing food and wonderful service! We had the best dining experience here.',
  },
  {
    id: 2,
    name: 'Mario',
    image: '/icons_assets/Mario%20and%20Adrian%20b.jpg',
    rating: 5,
    comment: 'The chef really knows how to bring out flavors. Everything was perfectly prepared.',
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    image: null,
    rating: 5,
    comment: 'A gem in the neighborhood. Fresh ingredients, creative dishes, and great atmosphere!',
  },
];

function Testimonials() {
  return (
    <section className="Testimonials fade-in-up">
      <div className="testimonials-container">
        <h2>What Our Guests Say</h2>
        <div className="testimonials-grid">
          {testimonials.map((t) => (
            <div key={t.id} className="testimonial-card">
              {t.image ? (
                <img src={t.image} alt={t.name} className="testimonial-image" />
              ) : (
                <div className="testimonial-avatar-placeholder" aria-hidden="true">
                  {t.name.charAt(0)}
                </div>
              )}
              <div className="stars" aria-label={`${t.rating} out of 5 stars`}>
                {'⭐'.repeat(t.rating)}
              </div>
              <p className="testimonial-text">"{t.comment}"</p>
              <p className="testimonial-author">— {t.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
