import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getOrderById } from '../hooks/useOrders';
import './OrderDetailPage.css';

export default function OrderDetailPage() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const data = await getOrderById(orderId);
      setOrder(data);
      setLoading(false);
    };
    fetch();
  }, [orderId]);

  if (loading) return <div className="order-detail-page"><p>Loading...</p></div>;
  if (!order) return <div className="order-detail-page"><p>Order not found.</p></div>;

  return (
    <div className="order-detail-page">
      <Link to="/orders" className="back-link">← Back to Orders</Link>
      <h1>Order Details</h1>
      <p className="order-meta">Order ID: {order.id}</p>
      <p className="order-meta">
        Date: {order.createdAt?.seconds
          ? new Date(order.createdAt.seconds * 1000).toLocaleString()
          : 'Recent'}
      </p>
      <div className="order-items">
        {order.items?.map((item, i) => (
          <div key={i} className="order-item">
            <img src={item.image} alt={item.title} onError={e => e.target.src = 'https://via.placeholder.com/60'} />
            <div className="order-item-info">
              <p className="order-item-title">{item.title}</p>
              <p>Qty: {item.count} x ${item.price?.toFixed(2)}</p>
            </div>
            <p className="order-item-subtotal">${(item.price * item.count).toFixed(2)}</p>
          </div>
        ))}
      </div>
      <div className="order-total-row">
        <span>Total</span>
        <strong>${order.totalPrice?.toFixed(2)}</strong>
      </div>
    </div>
  );
}
