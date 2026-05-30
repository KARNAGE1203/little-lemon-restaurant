import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Cart.css';

function Cart() {
  const { items, removeItem, updateQty, subtotal } = useCart();
  const navigate = useNavigate();
  const tax = subtotal * 0.08;
  const delivery = items.length > 0 ? 3.99 : 0;
  const total = subtotal + tax + delivery;

  if (items.length === 0) {
    return (
      <div className="Cart container">
        <div className="cart-empty">
          <div className="cart-empty-icon" aria-hidden="true">🛒</div>
          <h1>Your cart is empty</h1>
          <p>Looks like you haven't added anything yet. Browse our menu and add your favorite dishes!</p>
          <Link to="/menu" className="btn btn-primary">Browse Menu</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="Cart container">
      <div className="cart-header">
        <h1>Your Cart</h1>
        <p className="cart-count">{items.reduce((s, i) => s + i.qty, 0)} item{items.reduce((s, i) => s + i.qty, 0) !== 1 ? 's' : ''}</p>
      </div>

      <div className="cart-layout">
        <section className="cart-items" aria-label="Cart items">
          {items.map((item) => (
            <article key={item.id} className="cart-item">
              {item.image && (
                <img src={item.image} alt={item.title} className="cart-item-img" />
              )}
              <div className="cart-item-details">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <span className="cart-item-unit-price">{item.price} each</span>
              </div>
              <div className="cart-item-controls">
                <div className="qty-control">
                  <button
                    type="button"
                    className="qty-btn"
                    onClick={() => updateQty(item.id, item.qty - 1)}
                    aria-label={`Decrease quantity of ${item.title}`}
                  >
                    −
                  </button>
                  <span className="qty-value">{item.qty}</span>
                  <button
                    type="button"
                    className="qty-btn"
                    onClick={() => updateQty(item.id, item.qty + 1)}
                    aria-label={`Increase quantity of ${item.title}`}
                  >
                    +
                  </button>
                </div>
                <span className="cart-item-total">
                  ${(parseFloat(item.price.replace('$', '')) * item.qty).toFixed(2)}
                </span>
                <button
                  type="button"
                  className="cart-item-remove"
                  onClick={() => removeItem(item.id)}
                  aria-label={`Remove ${item.title} from cart`}
                >
                  ✕
                </button>
              </div>
            </article>
          ))}
        </section>

        <aside className="cart-summary">
          <h2>Order Summary</h2>
          <ul className="summary-lines">
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
          <div className="summary-total">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <button
            type="button"
            className="btn btn-primary checkout-btn"
            onClick={() => navigate('/checkout')}
          >
            Proceed to Checkout
          </button>
          <Link to="/menu" className="continue-shopping">
            ← Continue Shopping
          </Link>
        </aside>
      </div>
    </div>
  );
}

export default Cart;
