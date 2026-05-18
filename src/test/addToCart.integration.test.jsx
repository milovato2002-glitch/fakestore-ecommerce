import React from 'react'
import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import cartReducer from '../features/cart/cartSlice'
import ProductCard from '../components/ProductCard'

const buildStore = () =>
  configureStore({
    reducer: { cart: cartReducer },
  })

const product = {
  id: 7,
  title: 'Integration Test Mug',
  price: 12.5,
  description: 'A coffee mug used to verify add-to-cart integration end-to-end.',
  category: 'kitchen',
  image: 'https://example.com/mug.jpg',
  rating: { rate: 4.2, count: 33 },
}

describe('Add to Cart integration', () => {
  beforeEach(() => {
    sessionStorage.clear()
  })

  it('updates the Redux cart when the Add to Cart button is clicked', () => {
    const store = buildStore()

    render(
      <Provider store={store}>
        <ProductCard product={product} />
      </Provider>
    )

    // Cart should start empty
    expect(store.getState().cart.items).toEqual([])

    // Click the Add to Cart button
    fireEvent.click(screen.getByRole('button', { name: /add to cart/i }))

    // Cart should now have one entry with count 1
    const items = store.getState().cart.items
    expect(items).toHaveLength(1)
    expect(items[0]).toMatchObject({
      id: product.id,
      title: product.title,
      price: product.price,
      count: 1,
    })
  })

  it('increments the count when Add to Cart is clicked twice', () => {
    const store = buildStore()

    render(
      <Provider store={store}>
        <ProductCard product={product} />
      </Provider>
    )

    const button = screen.getByRole('button', { name: /add to cart/i })
    fireEvent.click(button)
    fireEvent.click(button)

    const items = store.getState().cart.items
    expect(items).toHaveLength(1)
    expect(items[0].count).toBe(2)
  })
})