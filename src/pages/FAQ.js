import React, { useState } from 'react';
import './FAQ.css';

const questions = [
  {
    question: 'Can I make a reservation for a large group?',
    answer: 'Yes, we welcome group bookings. Please contact us in advance so we can prepare your table and menu preferences.',
  },
  {
    question: 'Do you offer vegetarian and vegan options?',
    answer: 'Absolutely. Our menu includes a variety of vegetarian, vegan, and gluten-friendly dishes made from fresh ingredients.',
  },
  {
    question: 'What are your opening hours?',
    answer: 'We are open Monday through Thursday from 11am to 10pm, Friday and Saturday from 11am to 11pm, and Sunday from 12pm to 9pm.',
  },
  {
    question: 'Can I request a specific table?',
    answer: 'We will do our best to accommodate table requests, but cannot guarantee specific seating. Please mention your preference when reserving.',
  },
];

function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="FAQ container">
      <section className="faq-header">
        <h1>Frequently Asked Questions</h1>
        <p>Find quick answers about reservations, menu options, and our dining experience.</p>
      </section>

      <div className="faq-list">
        {questions.map((item, index) => (
          <article key={item.question} className="faq-item">
            <button
              type="button"
              className="faq-question"
              onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
            >
              <span>{item.question}</span>
              <span className="faq-toggle">{openIndex === index ? '−' : '+'}</span>
            </button>
            {openIndex === index && <div className="faq-answer">{item.answer}</div>}
          </article>
        ))}
      </div>
    </div>
  );
}

export default FAQ;
