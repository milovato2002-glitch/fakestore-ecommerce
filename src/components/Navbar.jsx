import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Navbar.css';

export default function Navbar() {
  const items = useSelector(state => state.cart.items);
  const totalCount = items.reduce((sum, item) => sum + item.count, 0);

  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo">FakeStore</Link>
      <Link to="/cart" className="nav-cart">
        🛒 Cart <span className="cart-badge">{totalCount}</span>
      </Link>
    </nav>
  );
}
