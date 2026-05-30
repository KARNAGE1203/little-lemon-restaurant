import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Navigation.css';

function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { totalItems } = useCart();

  const close = () => setMenuOpen(false);

  return (
    <nav className="Navigation">
      <div className="nav-container container">
        <NavLink to="/" className="nav-logo" onClick={close}>
          <img src="/icons_assets/Logo.svg" alt="Little Lemon Logo" className="logo-image" />
        </NavLink>

        <button
          type="button"
          className={`nav-toggle ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen((s) => !s)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>

        <ul className={`nav-menu ${menuOpen ? 'nav-menu--open' : ''}`}>
          {[
            { to: '/', label: 'Home' },
            { to: '/about', label: 'About' },
            { to: '/menu', label: 'Menu' },
            { to: '/reservation', label: 'Reserve' },
            { to: '/contact', label: 'Contact' },
            { to: '/faq', label: 'FAQ' },
            { to: '/my-orders', label: 'My Orders' },
          ].map((item) => (
            <li key={item.to} className="nav-item">
              <NavLink
                end
                to={item.to}
                className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
                onClick={close}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <Link to="/cart" className="nav-cart" aria-label={`Cart, ${totalItems} items`} onClick={close}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
          {totalItems > 0 && (
            <span className="cart-badge">{totalItems > 99 ? '99+' : totalItems}</span>
          )}
        </Link>
      </div>
    </nav>
  );
}

export default Navigation;
