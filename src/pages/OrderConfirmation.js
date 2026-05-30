import React from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './OrderConfirmation.css';

function OrderConfirmation() {
  const location = useLocation();
  const { lastOrder } = useCart();
  const order = location.state?.order || lastOrder;

  if (!order) return <Navigate to="/" replace />;

  const placedAt = new Date(order.placedAt);
  const formattedTime = placedAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const formattedDate = placedAt.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' });

  return (
    <div className="OrderConfirmation container">
      <div className="oc-card">
        <div className="oc-check-wrap" aria-hidden="true">
          <div className="oc-check-circle">
            <svg viewBox="0 0 52 52" fill="none" className="oc-check-svg">
              <circle cx="26" cy="26" r="25" stroke="currentColor" strokeWidth="2" />
              <path d="M14 27l9 9 15-18" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        <h1>Order Placed!</h1>
        <p className="oc-subtitle">
          Thank you, <strong>{order.customerDetails.firstName}</strong>! Your order is confirmed and we're already preparing it.
        </p>

        <div className="oc-order-badge">
          <span className="oc-order-label">Order Number</span>
          <span className="oc-order-number">{order.orderNumber}</span>
        </div>

        <div className="oc-meta">
          <div className="oc-meta-item">
            <span className="oc-meta-label">Placed</span>
            <span>{formattedDate} at {formattedTime}</span>
          </div>
          <div className="oc-meta-item">
            <span className="oc-meta-label">Deliver to</span>
            <span>{order.customerDetails.address}, {order.customerDetails.city}</span>
          </div>
          <div className="oc-meta-item">
            <span className="oc-meta-label">Estimated delivery</span>
            <span className="oc-eta">25 – 40 minutes</span>
          </div>
        </div>

        <section className="oc-items">
          <h2>Items Ordered</h2>
          <ul>
            {order.items.map((item) => (
              <li key={item.id} className="oc-item-line">
                <span className="oc-item-qty">{item.qty}×</span>
                <span className="oc-item-name">{item.title}</span>
                <span className="oc-item-price">
                  ${(parseFloat(item.price.replace('$', '')) * item.qty).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
          <div className="oc-totals">
            <div className="oc-total-line">
              <span>Subtotal</span>
              <span>${order.subtotal.toFixed(2)}</span>
            </div>
            <div className="oc-total-line">
              <span>Tax (8%)</span>
              <span>${order.tax.toFixed(2)}</span>
            </div>
            <div className="oc-total-line">
              <span>Delivery</span>
              <span>${order.delivery.toFixed(2)}</span>
            </div>
            <div className="oc-total-line oc-grand-total">
              <span>Total</span>
              <span>${order.total.toFixed(2)}</span>
            </div>
          </div>
        </section>

        <div className="oc-actions">
          <Link to="/order-tracking" state={{ order }} className="btn btn-primary">
            Track Your Order
          </Link>
          <Link to="/" className="btn btn-secondary">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default OrderConfirmation;
