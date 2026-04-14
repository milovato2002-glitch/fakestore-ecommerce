import { useCategories } from '../hooks/useProducts';
import './CategoryFilter.css';

export default function CategoryFilter({ selected, onChange }) {
  const { data: categories, isLoading } = useCategories();

  return (
    <div className="category-filter">
      <label htmlFor="category-select">Filter by Category:</label>
      <select
        id="category-select"
        value={selected}
        onChange={(e) => onChange(e.target.value)}
        disabled={isLoading}
      >
        <option value="">All Products</option>
        {categories?.map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
    </div>
  );
}
