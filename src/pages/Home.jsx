import { useState, useEffect } from 'react';
import { useFirestoreProducts } from '../hooks/useProducts';
import { seedProducts } from '../utils/seedProducts';
import ProductCard from '../components/ProductCard';
import './Home.css';

export default function Home() {
  const { data: products, isLoading, isError } = useFirestoreProducts();
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    seedProducts();
  }, []);

  const categories = products
    ? ['', ...new Set(products.map(p => p.category))]
    : [''];

  const filtered = selectedCategory
    ? products?.filter(p => p.category === selectedCategory)
    : products;

  return (
    <main className="home">
      <div className="home-header">
        <h1>Our Products</h1>
        <div className="category-filter">
          <label htmlFor="cat">Filter by Category:</label>
          <select id="cat" value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat || 'All Products'}</option>
            ))}
          </select>
        </div>
      </div>
      {isLoading && <div className="status-msg">Loading products...</div>}
      {isError && <div className="status-msg error">Failed to load products.</div>}
      <div className="product-grid">
        {filtered?.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}
