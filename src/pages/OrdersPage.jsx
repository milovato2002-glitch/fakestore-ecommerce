import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getUserOrders } from '../hooks/useOrders';
import { Link } from 'react-router-dom';
import './OrdersPage.css';

export default function OrdersPage() {
  const { user } = useSelector(state => state.auth);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const fetch = async () => {
      const data = await getUserOrders(user.uid);
      setOrders(data.sort((a, b) => b.createdAt?.seconds - a.createdAt?.seconds));
      setLoading(false);
    };
    fetch();
  }, [user]);

  if (!user) return <div className="orders-page"><p>Please <a href="/login">login</a> to view orders.</p></div>;
  if (loading) return <div className="orders-page"><p>Loading orders...</p></div>;
  if (orders.length === 0) return <div className="orders-page"><h1>Order History</h1><p>No orders yet.</p></div>;

  return (
    <div className="orders-page">
      <h1>Order History</h1>
      <div className="orders-list">
        {orders.map(order => (
          <Link to={`/orders/${order.id}`} key={order.id} className="order-card">
            <div className="order-card-header">
              <span className="order-id">Order #{order.id.slice(0, 8)}...</span>
              <span className="order-date">
                {order.createdAt?.seconds
                  ? new Date(order.createdAt.seconds * 1000).toLocaleDateString()
                  : 'Recent'}
              </span>
            </div>
            <div className="order-card-footer">
              <span>{order.items?.length} item(s)</span>
              <span className="order-total">${order.totalPrice?.toFixed(2)}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
