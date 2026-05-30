import React from 'react';
import './Contact.css';

function Contact() {
  return (
    <div className="Contact container">
      <div className="contact-grid">
        <section className="contact-panel">
          <p className="hero-pill">Get in Touch</p>
          <h1>Contact Little Lemon</h1>
          <p>Whether you have a question, want to reserve a large table, or need catering information, we are here to help.</p>

          <div className="contact-details">
            <div className="contact-detail">
              <h4>Visit Us</h4>
              <p>123 Lemon Street, Chicago, IL 60601</p>
            </div>
            <div className="contact-detail">
              <h4>Call Us</h4>
              <p>(312) 555-0198</p>
            </div>
            <div className="contact-detail">
              <h4>Email</h4>
              <p>hello@littlelemon.com</p>
            </div>
            <div className="contact-detail">
              <h4>Hours</h4>
              <p>Mon–Thu: 11am–10pm<br />Fri–Sat: 11am–11pm<br />Sun: 12pm–9pm</p>
            </div>
          </div>
        </section>

        <section className="contact-form">
          <h2>Send us a message</h2>
          <form onSubmit={(event) => event.preventDefault()}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input id="name" type="text" placeholder="Your name" />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input id="email" type="email" placeholder="you@example.com" />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input id="subject" type="text" placeholder="Message subject" />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" placeholder="How can we help?" />
            </div>
            <button type="submit" className="btn btn-primary">Send Message</button>
          </form>
        </section>
      </div>
    </div>
  );
}

export default Contact;
