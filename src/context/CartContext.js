import React, { createContext, useContext, useReducer } from 'react';

const CartContext = createContext(null);

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find((i) => i.id === action.item.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.id === action.item.id ? { ...i, qty: i.qty + 1 } : i
          ),
        };
      }
      return { ...state, items: [...state.items, { ...action.item, qty: 1 }] };
    }
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter((i) => i.id !== action.id) };
    case 'UPDATE_QTY': {
      if (action.qty <= 0) {
        return { ...state, items: state.items.filter((i) => i.id !== action.id) };
      }
      return {
        ...state,
        items: state.items.map((i) =>
          i.id === action.id ? { ...i, qty: action.qty } : i
        ),
      };
    }
    case 'PLACE_ORDER':
      return {
        ...state,
        items: [],
        orders: [...state.orders, action.order],
      };
    case 'CLEAR_CART':
      return { ...state, items: [] };
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], orders: [] });

  const addItem = (item) => dispatch({ type: 'ADD_ITEM', item });
  const removeItem = (id) => dispatch({ type: 'REMOVE_ITEM', id });
  const updateQty = (id, qty) => dispatch({ type: 'UPDATE_QTY', id, qty });
  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  const totalItems = state.items.reduce((sum, i) => sum + i.qty, 0);
  const subtotal = state.items.reduce(
    (sum, i) => sum + parseFloat(i.price.replace('$', '')) * i.qty,
    0
  );

  const placeOrder = (customerDetails) => {
    const orderNumber = 'LL' + Math.floor(100000 + Math.random() * 900000);
    const tax = subtotal * 0.08;
    const delivery = 3.99;
    const total = subtotal + tax + delivery;
    const order = {
      orderNumber,
      items: state.items,
      subtotal,
      tax,
      delivery,
      total,
      customerDetails,
      placedAt: new Date().toISOString(),
    };
    dispatch({ type: 'PLACE_ORDER', order });
    return order;
  };

  // Most recent order — kept for backward compat with OrderConfirmation / OrderTracking
  const lastOrder = state.orders.length > 0 ? state.orders[state.orders.length - 1] : null;

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        orders: state.orders,
        lastOrder,
        addItem,
        removeItem,
        updateQty,
        clearCart,
        placeOrder,
        totalItems,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
