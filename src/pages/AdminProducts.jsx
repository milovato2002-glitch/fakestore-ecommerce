import { useState } from 'react';
import { useFirestoreProducts, useAddProduct, useUpdateProduct, useDeleteProduct } from '../hooks/useProducts';
import './AdminProducts.css';

export default function AdminProducts() {
  const { data: products, isLoading } = useFirestoreProducts();
  const addProduct = useAddProduct();
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();

  const [form, setForm] = useState({ title: '', price: '', category: '', description: '', image: '' });
  const [editingId, setEditingId] = useState(null);
  const [msg, setMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { ...form, price: parseFloat(form.price) };
    if (editingId) {
      await updateProduct.mutateAsync({ id: editingId, updates: data });
      setMsg('Product updated!');
      setEditingId(null);
    } else {
      await addProduct.mutateAsync(data);
      setMsg('Product added!');
    }
    setForm({ title: '', price: '', category: '', description: '', image: '' });
    setTimeout(() => setMsg(''), 2000);
  };

  const handleEdit = (product) => {
    setEditingId(product.id);
    setForm({
      title: product.title,
      price: product.price,
      category: product.category,
      description: product.description,
      image: product.image,
    });
  };

  return (
    <div className="admin-page">
      <h1>Manage Products</h1>
      <div className="admin-layout">
        <form className="product-form" onSubmit={handleSubmit}>
          <h2>{editingId ? 'Edit Product' : 'Add Product'}</h2>
          {msg && <p className="form-msg">{msg}</p>}
          <input placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
          <input placeholder="Price" type="number" step="0.01" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} required />
          <input placeholder="Category" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} required />
          <input placeholder="Image URL" value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} />
          <textarea placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={3} />
          <button type="submit">{editingId ? 'Update Product' : 'Add Product'}</button>
          {editingId && <button type="button" onClick={() => { setEditingId(null); setForm({ title: '', price: '', category: '', description: '', image: '' }); }}>Cancel</button>}
        </form>
        <div className="product-list-admin">
          {isLoading && <p>Loading...</p>}
          {products?.map(product => (
            <div key={product.id} className="admin-product-item">
              <img src={product.image || 'https://via.placeholder.com/60'} alt={product.title} onError={e => e.target.src = 'https://via.placeholder.com/60'} />
              <div className="admin-product-info">
                <p className="admin-product-title">{product.title}</p>
                <p className="admin-product-price">${product.price}</p>
              </div>
              <div className="admin-product-actions">
                <button onClick={() => handleEdit(product)}>Edit</button>
                <button className="del" onClick={() => deleteProduct.mutate(product.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
