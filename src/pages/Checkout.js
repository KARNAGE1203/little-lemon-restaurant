import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Checkout.css';

function formatCardNumber(value) {
  return value
    .replace(/\D/g, '')
    .slice(0, 16)
    .replace(/(.{4})/g, '$1 ')
    .trim();
}

function formatExpiry(value) {
  const digits = value.replace(/\D/g, '').slice(0, 4);
  if (digits.length >= 3) return digits.slice(0, 2) + '/' + digits.slice(2);
  return digits;
}

const INITIAL_CUSTOMER = {
  firstName: '', lastName: '', email: '', phone: '',
  address: '', city: '', state: '', zip: '',
};

const INITIAL_PAYMENT = {
  cardNumber: '', cardName: '', expiry: '', cvv: '',
};

function Checkout() {
  const { items, subtotal, placeOrder } = useCart();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(INITIAL_CUSTOMER);
  const [payment, setPayment] = useState(INITIAL_PAYMENT);
  const [errors, setErrors] = useState({});
  const orderPlacedRef = useRef(false);

  useEffect(() => {
    if (items.length === 0 && !orderPlacedRef.current) {
      const id = setTimeout(() => navigate('/menu'), 0);
      return () => clearTimeout(id);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const tax = subtotal * 0.08;
  const delivery = 3.99;
  const total = subtotal + tax + delivery;

  const handleCustomer = (e) => {
    const { name, value } = e.target;
    setCustomer((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: '' }));
  };

  const handlePayment = (e) => {
    const { name, value } = e.target;
    let formatted = value;
    if (name === 'cardNumber') formatted = formatCardNumber(value);
    if (name === 'expiry') formatted = formatExpiry(value);
    if (name === 'cvv') formatted = value.replace(/\D/g, '').slice(0, 4);
    setPayment((p) => ({ ...p, [name]: formatted }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: '' }));
  };

  const validate = () => {
    const errs = {};
    if (!customer.firstName.trim()) errs.firstName = 'Required';
    if (!customer.lastName.trim()) errs.lastName = 'Required';
    if (!customer.email.trim() || !/\S+@\S+\.\S+/.test(customer.email)) errs.email = 'Valid email required';
    if (!customer.address.trim()) errs.address = 'Required';
    if (!customer.city.trim()) errs.city = 'Required';
    if (!customer.zip.trim()) errs.zip = 'Required';
    const rawCard = payment.cardNumber.replace(/\s/g, '');
    if (rawCard.length !== 16) errs.cardNumber = 'Enter 16-digit card number';
    if (!payment.cardName.trim()) errs.cardName = 'Required';
    if (!/^\d{2}\/\d{2}$/.test(payment.expiry)) errs.expiry = 'Use MM/YY format';
    if (payment.cvv.length < 3) errs.cvv = 'Enter 3–4 digits';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      const firstKey = Object.keys(errs)[0];
      document.getElementById(firstKey)?.focus();
      return;
    }
    orderPlacedRef.current = true;
    const order = placeOrder({ ...customer });
    navigate('/order-confirmation', { state: { order } });
  };

  return (
    <div className="Checkout container">
      <h1 className="checkout-title">Checkout</h1>

      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={handleSubmit} noValidate>

          {/* Customer Details */}
          <section className="form-section">
            <h2>Delivery Details</h2>
            <div className="form-row-2">
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  id="firstName" name="firstName" type="text"
                  value={customer.firstName} onChange={handleCustomer}
                  placeholder="Jane" autoComplete="given-name"
                  className={errors.firstName ? 'error' : ''}
                />
                {errors.firstName && <span className="field-error">{errors.firstName}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  id="lastName" name="lastName" type="text"
                  value={customer.lastName} onChange={handleCustomer}
                  placeholder="Doe" autoComplete="family-name"
                  className={errors.lastName ? 'error' : ''}
                />
                {errors.lastName && <span className="field-error">{errors.lastName}</span>}
              </div>
            </div>
            <div className="form-row-2">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  id="email" name="email" type="email"
                  value={customer.email} onChange={handleCustomer}
                  placeholder="jane@example.com" autoComplete="email"
                  className={errors.email ? 'error' : ''}
                />
                {errors.email && <span className="field-error">{errors.email}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone <span className="optional">(optional)</span></label>
                <input
                  id="phone" name="phone" type="tel"
                  value={customer.phone} onChange={handleCustomer}
                  placeholder="(312) 555-0198" autoComplete="tel"
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="address">Street Address</label>
              <input
                id="address" name="address" type="text"
                value={customer.address} onChange={handleCustomer}
                placeholder="123 Lemon Street" autoComplete="street-address"
                className={errors.address ? 'error' : ''}
              />
              {errors.address && <span className="field-error">{errors.address}</span>}
            </div>
            <div className="form-row-3">
              <div className="form-group">
                <label htmlFor="city">City</label>
                <input
                  id="city" name="city" type="text"
                  value={customer.city} onChange={handleCustomer}
                  placeholder="Chicago" autoComplete="address-level2"
                  className={errors.city ? 'error' : ''}
                />
                {errors.city && <span className="field-error">{errors.city}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="state">State</label>
                <input
                  id="state" name="state" type="text"
                  value={customer.state} onChange={handleCustomer}
                  placeholder="IL" maxLength={2} autoComplete="address-level1"
                />
              </div>
              <div className="form-group">
                <label htmlFor="zip">ZIP Code</label>
                <input
                  id="zip" name="zip" type="text"
                  value={customer.zip} onChange={handleCustomer}
                  placeholder="60601" autoComplete="postal-code"
                  className={errors.zip ? 'error' : ''}
                />
                {errors.zip && <span className="field-error">{errors.zip}</span>}
              </div>
            </div>
          </section>

          {/* Payment */}
          <section className="form-section">
            <h2>Payment</h2>
            <div className="payment-notice">
              <span className="payment-notice-icon">🔒</span>
              <span>Test mode — no real payment will be processed.</span>
            </div>
            <div className="form-group">
              <label htmlFor="cardNumber">Card Number</label>
              <input
                id="cardNumber" name="cardNumber" type="text"
                value={payment.cardNumber} onChange={handlePayment}
                placeholder="1234 5678 9012 3456"
                inputMode="numeric" autoComplete="cc-number"
                className={errors.cardNumber ? 'error' : ''}
              />
              {errors.cardNumber && <span className="field-error">{errors.cardNumber}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="cardName">Cardholder Name</label>
              <input
                id="cardName" name="cardName" type="text"
                value={payment.cardName} onChange={handlePayment}
                placeholder="Jane Doe" autoComplete="cc-name"
                className={errors.cardName ? 'error' : ''}
              />
              {errors.cardName && <span className="field-error">{errors.cardName}</span>}
            </div>
            <div className="form-row-2">
              <div className="form-group">
                <label htmlFor="expiry">Expiry Date</label>
                <input
                  id="expiry" name="expiry" type="text"
                  value={payment.expiry} onChange={handlePayment}
                  placeholder="MM/YY" inputMode="numeric" autoComplete="cc-exp"
                  className={errors.expiry ? 'error' : ''}
                />
                {errors.expiry && <span className="field-error">{errors.expiry}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="cvv">CVV</label>
                <input
                  id="cvv" name="cvv" type="text"
                  value={payment.cvv} onChange={handlePayment}
                  placeholder="123" inputMode="numeric" autoComplete="cc-csc"
                  className={errors.cvv ? 'error' : ''}
                />
                {errors.cvv && <span className="field-error">{errors.cvv}</span>}
              </div>
            </div>
          </section>

          <button type="submit" className="btn btn-primary place-order-btn">
            Place Order · ${total.toFixed(2)}
          </button>
        </form>

        {/* Order summary sidebar */}
        <aside className="checkout-summary">
          <h2>Order Summary</h2>
          <ul className="checkout-items-list">
            {items.map((item) => (
              <li key={item.id} className="checkout-item-line">
                <span className="checkout-item-qty">{item.qty}×</span>
                <span className="checkout-item-name">{item.title}</span>
                <span className="checkout-item-price">
                  ${(parseFloat(item.price.replace('$', '')) * item.qty).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
          <div className="checkout-divider" />
          <ul className="checkout-totals">
            <li>
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </li>
            <li>
              <span>Tax (8%)</span>
              <span>${tax.toFixed(2)}</span>
            </li>
            <li>
              <span>Delivery</span>
              <span>${delivery.toFixed(2)}</span>
            </li>
          </ul>
          <div className="checkout-total-row">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default Checkout;
