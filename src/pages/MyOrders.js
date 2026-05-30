import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './MyOrders.css';

const STATUS_CONFIG = {
  placed:     { label: 'Order Placed',   color: 'status-placed',    icon: '📋' },
  confirmed:  { label: 'Confirmed',      color: 'status-confirmed', icon: '✅' },
  preparing:  { label: 'Preparing',      color: 'status-preparing', icon: '👨‍🍳' },
  'on-the-way': { label: 'On the Way',   color: 'status-onway',     icon: '🛵' },
  delivered:  { label: 'Delivered',      color: 'status-delivered', icon: '✓'  },
};

function getStatus(placedAt) {
  const elapsed = Math.floor((Date.now() - new Date(placedAt).getTime()) / 1000);
  if (elapsed >= 35 * 60) return 'delivered';
  if (elapsed >= 20 * 60) return 'on-the-way';
  if (elapsed >= 5 * 60)  return 'preparing';
  if (elapsed >= 45)      return 'confirmed';
  return 'placed';
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString([], {
    weekday: 'short', month: 'short', day: 'numeric',
  });
}

function formatTime(iso) {
  return new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function OrderCard({ order }) {
  const { addItem } = useCart();
  const navigate = useNavigate();
  const [status, setStatus] = useState(() => getStatus(order.placedAt));
  const isActive = status !== 'delivered';
  const cfg = STATUS_CONFIG[status];

  // Refresh status every 30 s while active
  useEffect(() => {
    if (!isActive) return;
    const id = setInterval(() => setStatus(getStatus(order.placedAt)), 30000);
    return () => clearInterval(id);
  }, [isActive, order.placedAt]);

  const handleOrderAgain = () => {
    order.items.forEach((item) => addItem({ ...item, qty: undefined }));
    navigate('/cart');
  };

  const itemPreview = order.items
    .map((i) => (i.qty > 1 ? `${i.qty}× ${i.title}` : i.title))
    .join(', ');

  return (
    <article className={`order-card${isActive ? ' order-card--active' : ''}`}>
      <div className="order-card-header">
        <div className="order-card-meta">
          <span className={`order-status-badge ${cfg.color}`}>
            <span aria-hidden="true">{cfg.icon}</span>
            {cfg.label}
            {isActive && <span className="status-pulse" aria-hidden="true" />}
          </span>
          <span className="order-number">{order.orderNumber}</span>
        </div>
        <div className="order-card-date">
          <span>{formatDate(order.placedAt)}</span>
          <span className="order-time">{formatTime(order.placedAt)}</span>
        </div>
      </div>

      <div className="order-card-body">
        <p className="order-items-preview">{itemPreview}</p>
        <div className="order-card-row">
          <span className="order-total">${order.total.toFixed(2)}</span>
          <span className="order-item-count">
            {order.items.reduce((s, i) => s + i.qty, 0)} item
            {order.items.reduce((s, i) => s + i.qty, 0) !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      <div className="order-card-footer">
        {isActive ? (
          <Link
            to="/order-tracking"
            state={{ order }}
            className="btn btn-primary order-action-btn"
          >
            Track Order
          </Link>
        ) : (
          <button
            type="button"
            className="btn btn-secondary order-action-btn"
            onClick={handleOrderAgain}
          >
            Order Again
          </button>
        )}
        <Link
          to="/order-tracking"
          state={{ order }}
          className="order-details-link"
        >
          View details →
        </Link>
      </div>
    </article>
  );
}

function MyOrders() {
  const { orders } = useCart();
  const sorted = [...orders].reverse(); // most recent first
  const active = sorted.filter((o) => getStatus(o.placedAt) !== 'delivered');
  const past   = sorted.filter((o) => getStatus(o.placedAt) === 'delivered');

  if (orders.length === 0) {
    return (
      <div className="MyOrders container">
        <div className="my-orders-empty">
          <div className="my-orders-empty-icon" aria-hidden="true">🧾</div>
          <h1>No orders yet</h1>
          <p>Once you place an order it'll appear here — along with its live tracking status.</p>
          <Link to="/menu" className="btn btn-primary">Browse Menu</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="MyOrders container">
      <div className="my-orders-header">
        <h1>My Orders</h1>
        <p className="my-orders-sub">
          {orders.length} order{orders.length !== 1 ? 's' : ''} total
        </p>
      </div>

      {active.length > 0 && (
        <section className="orders-section">
          <h2 className="orders-section-title">
            <span className="section-dot section-dot--active" aria-hidden="true" />
            Active
          </h2>
          <div className="orders-list">
            {active.map((o) => <OrderCard key={o.orderNumber} order={o} />)}
          </div>
        </section>
      )}

      {past.length > 0 && (
        <section className="orders-section">
          <h2 className="orders-section-title">
            <span className="section-dot section-dot--past" aria-hidden="true" />
            Past Orders
          </h2>
          <div className="orders-list">
            {past.map((o) => <OrderCard key={o.orderNumber} order={o} />)}
          </div>
        </section>
      )}
    </div>
  );
}

export default MyOrders;
