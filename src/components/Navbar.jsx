import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { auth } from '../firebase/config';
import { signOut } from 'firebase/auth';
import { clearUser } from '../features/auth/authSlice';
import './Navbar.css';

export default function Navbar() {
  const items = useSelector(state => state.cart.items);
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const totalCount = items.reduce((sum, item) => sum + item.count, 0);

  const handleLogout = async () => {
    await signOut(auth);
    dispatch(clearUser());
    navigate('/');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo">FakeStore</Link>
      <div className="nav-links">
        {user ? (
          <>
            <Link to="/orders" className="nav-link">Orders</Link>
            <Link to="/profile" className="nav-link">Profile</Link>
            <Link to="/admin" className="nav-link">Admin</Link>
            <button className="nav-logout" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/register" className="nav-link">Register</Link>
          </>
        )}
        <Link to="/cart" className="nav-cart">
          🛒 <span className="cart-badge">{totalCount}</span>
        </Link>
      </div>
    </nav>
  );
}
