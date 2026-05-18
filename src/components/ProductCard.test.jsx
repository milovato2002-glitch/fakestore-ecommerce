import React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import cartReducer from '../features/cart/cartSlice'
import ProductCard from './ProductCard'

// Build a fresh store for each render so tests don't share state
const renderWithStore = (ui) => {
  const store = configureStore({ reducer: { cart: cartReducer } })
  return render(<Provider store={store}>{ui}</Provider>)
}

const sampleProduct = {
  id: 42,
  title: 'Sample Headphones',
  price: 49.99,
  description: 'A comfortable pair of over-ear headphones with great sound quality.',
  category: 'electronics',
  image: 'https://example.com/headphones.jpg',
  rating: { rate: 4.5, count: 120 },
}

describe('ProductCard component', () => {
  it('renders the product title', () => {
    renderWithStore(<ProductCard product={sampleProduct} />)
    expect(screen.getByText('Sample Headphones')).toBeInTheDocument()
  })

  it('renders the formatted price', () => {
    renderWithStore(<ProductCard product={sampleProduct} />)
    expect(screen.getByText('$49.99')).toBeInTheDocument()
  })

  it('renders the product category', () => {
    renderWithStore(<ProductCard product={sampleProduct} />)
    expect(screen.getByText('electronics')).toBeInTheDocument()
  })

  it('renders a truncated description with an ellipsis', () => {
    renderWithStore(<ProductCard product={sampleProduct} />)
    // description is sliced to 80 chars and "..." is appended
    const expected = sampleProduct.description.substring(0, 80) + '...'
    expect(screen.getByText(expected)).toBeInTheDocument()
  })

  it('renders the rating and review count', () => {
    renderWithStore(<ProductCard product={sampleProduct} />)
    expect(screen.getByText(/4\.5/)).toBeInTheDocument()
    expect(screen.getByText(/120 reviews/)).toBeInTheDocument()
  })

  it('renders an Add to Cart button', () => {
    renderWithStore(<ProductCard product={sampleProduct} />)
    expect(screen.getByRole('button', { name: /add to cart/i })).toBeInTheDocument()
  })
})
