import { useState } from 'react';
import { useAllProducts, useProductsByCategory } from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';
import CategoryFilter from '../components/CategoryFilter';
import './Home.css';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('');

  const allProducts = useAllProducts();
  const categoryProducts = useProductsByCategory(selectedCategory);

  const { data: products, isLoading, isError } = selectedCategory
    ? categoryProducts
    : allProducts;

  return (
    <main className="home">
      <div className="home-header">
        <h1>Our Products</h1>
        <CategoryFilter selected={selectedCategory} onChange={setSelectedCategory} />
      </div>

      {isLoading && <div className="status-msg">Loading products...</div>}
      {isError && <div className="status-msg error">Failed to load products. Please try again.</div>}

      <div className="product-grid">
        {products?.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}
