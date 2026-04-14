import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, updateQuantity, clearCart } from '../features/cart/cartSlice';
import { useState } from 'react';
import './CartPage.css';

export default function CartPage() {
  const dispatch = useDispatch();
  const items = useSelector(state => state.cart.items);
  const [checkedOut, setCheckedOut] = useState(false);

  const totalItems = items.reduce((sum, item) => sum + item.count, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.count, 0);

  const handleCheckout = () => {
    dispatch(clearCart());
    setCheckedOut(true);
  };

  if (checkedOut) {
    return (
      <div className="cart-page">
        <div className="checkout-success">
          <h2>✅ Order Placed!</h2>
          <p>Your cart has been cleared. Thanks for shopping at FakeStore!</p>
          <a href="/" className="continue-btn">Continue Shopping</a>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-empty">
          <h2>Your cart is empty</h2>
          <a href="/" className="continue-btn">Browse Products</a>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1>Shopping Cart</h1>
      <div className="cart-layout">
        <div className="cart-items">
          {items.map(item => (
            <div key={item.id} className="cart-item">
              <img
                src={item.image}
                alt={item.title}
                className="cart-item-image"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/80x80?text=N/A';
                }}
              />
              <div className="cart-item-details">
                <h3>{item.title}</h3>
                <p className="cart-item-price">${item.price.toFixed(2)} each</p>
              </div>
              <div className="cart-item-controls">
                <button onClick={() => dispatch(updateQuantity({ id: item.id, count: item.count - 1 }))}>-</button>
                <span>{item.count}</span>
                <button onClick={() => dispatch(updateQuantity({ id: item.id, count: item.count + 1 }))}>+</button>
              </div>
              <span className="cart-item-subtotal">${(item.price * item.count).toFixed(2)}</span>
              <button className="remove-btn" onClick={() => dispatch(removeFromCart(item.id))}>✕</button>
            </div>
          ))}
        </div>
        <div className="cart-summary">
          <h2>Order Summary</h2>
          <div className="summary-row">
            <span>Total Items:</span>
            <strong>{totalItems}</strong>
          </div>
          <div className="summary-row">
            <span>Total Price:</span>
            <strong>${totalPrice.toFixed(2)}</strong>
          </div>
          <button className="checkout-btn" onClick={handleCheckout}>
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
