import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './OrderTracking.css';

const STEPS = [
  {
    id: 'placed',
    label: 'Order Placed',
    detail: 'We received your order',
    icon: '📋',
    delay: 0,
  },
  {
    id: 'confirmed',
    label: 'Confirmed',
    detail: 'Kitchen accepted your order',
    icon: '✅',
    delay: 45,
  },
  {
    id: 'preparing',
    label: 'Preparing',
    detail: 'Our chefs are cooking your meal',
    icon: '👨‍🍳',
    delay: 5 * 60,
  },
  {
    id: 'on-the-way',
    label: 'On the Way',
    detail: 'Driver is heading to you',
    icon: '🛵',
    delay: 20 * 60,
  },
  {
    id: 'delivered',
    label: 'Delivered',
    detail: 'Enjoy your meal!',
    icon: '🏠',
    delay: 35 * 60,
  },
];

function useElapsedSeconds(startIso) {
  const [elapsed, setElapsed] = useState(() =>
    Math.floor((Date.now() - new Date(startIso).getTime()) / 1000)
  );
  useEffect(() => {
    const id = setInterval(() => {
      setElapsed(Math.floor((Date.now() - new Date(startIso).getTime()) / 1000));
    }, 5000);
    return () => clearInterval(id);
  }, [startIso]);
  return elapsed;
}

function formatOffset(seconds) {
  if (seconds < 60) return 'Just now';
  const m = Math.floor(seconds / 60);
  if (m < 60) return `${m} min ago`;
  return `${Math.floor(m / 60)}h ${m % 60}m ago`;
}

function OrderTracking() {
  const location = useLocation();
  const { lastOrder } = useCart();
  const order = location.state?.order || lastOrder;
  const startIso = order?.placedAt || new Date().toISOString();
  const elapsed = useElapsedSeconds(startIso);

  const currentStepIndex = STEPS.reduce((acc, step, i) => {
    return elapsed >= step.delay ? i : acc;
  }, 0);

  const progressPct = Math.min(
    100,
    (currentStepIndex / (STEPS.length - 1)) * 100
  );

  return (
    <div className="OrderTracking container">
      <div className="ot-header">
        <h1>Order Tracking</h1>
        {order && (
          <p className="ot-order-num">Order <strong>{order.orderNumber}</strong></p>
        )}
      </div>

      {/* ETA banner */}
      <div className="ot-eta-banner">
        <div className="ot-eta-icon" aria-hidden="true">🕐</div>
        <div>
          <p className="ot-eta-label">Estimated Delivery</p>
          <p className="ot-eta-value">25 – 40 minutes</p>
        </div>
        <div className="ot-eta-address">
          {order?.customerDetails?.address && (
            <>
              <p className="ot-eta-label">Delivering to</p>
              <p>{order.customerDetails.address}, {order.customerDetails.city}</p>
            </>
          )}
        </div>
      </div>

      {/* Progress tracker */}
      <div className="ot-tracker">
        <div className="ot-progress-bar-track">
          <div
            className="ot-progress-bar-fill"
            style={{ width: `${progressPct}%` }}
          />
        </div>

        <ol className="ot-steps">
          {STEPS.map((step, index) => {
            const isDone = index < currentStepIndex;
            const isActive = index === currentStepIndex;
            const isPending = index > currentStepIndex;
            const stepElapsed = elapsed - step.delay;

            return (
              <li
                key={step.id}
                className={`ot-step${isDone ? ' done' : ''}${isActive ? ' active' : ''}${isPending ? ' pending' : ''}`}
              >
                <div className="ot-step-bubble" aria-hidden="true">
                  {isDone ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="ot-check-icon">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : (
                    <span className="ot-step-icon">{step.icon}</span>
                  )}
                  {isActive && <span className="ot-pulse-ring" aria-hidden="true" />}
                </div>
                <div className="ot-step-info">
                  <p className="ot-step-label">{step.label}</p>
                  <p className="ot-step-detail">{step.detail}</p>
                  {(isDone || isActive) && (
                    <p className="ot-step-time">
                      {isActive ? 'In progress' : formatOffset(stepElapsed)}
                    </p>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      {/* Order summary */}
      {order && (
        <section className="ot-summary">
          <h2>Your Order</h2>
          <ul className="ot-items">
            {order.items.map((item) => (
              <li key={item.id} className="ot-item">
                <span className="ot-item-qty">{item.qty}×</span>
                <span className="ot-item-name">{item.title}</span>
                <span className="ot-item-price">
                  ${(parseFloat(item.price.replace('$', '')) * item.qty).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
          <div className="ot-total">
            <span>Total Paid</span>
            <span>${order.total.toFixed(2)}</span>
          </div>
        </section>
      )}

      <div className="ot-actions">
        <Link to="/" className="btn btn-primary">Back to Home</Link>
        <Link to="/menu" className="btn btn-secondary">Order Again</Link>
      </div>
    </div>
  );
}

export default OrderTracking;
