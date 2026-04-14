import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cart/cartSlice';
import './ProductCard.css';

export default function ProductCard({ product }) {
  const dispatch = useDispatch();

  return (
    <div className="product-card">
      <img
        src={product.image}
        alt={product.title}
        className="product-image"
        onError={(e) => {
          e.target.src = 'https://via.placeholder.com/200x200?text=No+Image';
        }}
      />
      <div className="product-info">
        <h3 className="product-title">{product.title}</h3>
        <span className="product-category">{product.category}</span>
        <p className="product-description">{product.description.substring(0, 80)}...</p>
        <div className="product-rating">
          ⭐ {product.rating?.rate} ({product.rating?.count} reviews)
        </div>
        <div className="product-footer">
          <span className="product-price">${product.price}</span>
          <button
            className="add-to-cart-btn"
            onClick={() => dispatch(addToCart(product))}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
