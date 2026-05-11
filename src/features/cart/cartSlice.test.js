import { describe, it, expect, beforeEach } from 'vitest'
import cartReducer, {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
} from './cartSlice'

const product = { id: 1, title: 'Test Product', price: 9.99 }
const otherProduct = { id: 2, title: 'Other Product', price: 4.50 }

const initialState = { items: [] }

describe('cartSlice reducer', () => {
  beforeEach(() => {
    sessionStorage.clear()
  })

  it('returns the initial state when given an unknown action', () => {
    const result = cartReducer(initialState, { type: 'unknown/action' })
    expect(result.items).toEqual([])
  })

  describe('addToCart', () => {
    it('adds a new item with count 1', () => {
      const result = cartReducer(initialState, addToCart(product))
      expect(result.items).toHaveLength(1)
      expect(result.items[0]).toEqual({ ...product, count: 1 })
    })

    it('increments count when the same product is added again', () => {
      let state = cartReducer(initialState, addToCart(product))
      state = cartReducer(state, addToCart(product))
      expect(state.items).toHaveLength(1)
      expect(state.items[0].count).toBe(2)
    })

    it('keeps separate entries for different product ids', () => {
      let state = cartReducer(initialState, addToCart(product))
      state = cartReducer(state, addToCart(otherProduct))
      expect(state.items).toHaveLength(2)
    })
  })

  describe('removeFromCart', () => {
    it('removes the item with the given id', () => {
      let state = cartReducer(initialState, addToCart(product))
      state = cartReducer(state, addToCart(otherProduct))
      state = cartReducer(state, removeFromCart(1))
      expect(state.items).toHaveLength(1)
      expect(state.items[0].id).toBe(2)
    })

    it('is a no-op when the id is not in the cart', () => {
      let state = cartReducer(initialState, addToCart(product))
      state = cartReducer(state, removeFromCart(999))
      expect(state.items).toHaveLength(1)
    })
  })

  describe('updateQuantity', () => {
    it('updates the count for an existing item', () => {
      let state = cartReducer(initialState, addToCart(product))
      state = cartReducer(state, updateQuantity({ id: 1, count: 5 }))
      expect(state.items[0].count).toBe(5)
    })

    it('removes the item when count drops to zero or below', () => {
      let state = cartReducer(initialState, addToCart(product))
      state = cartReducer(state, updateQuantity({ id: 1, count: 0 }))
      expect(state.items).toHaveLength(0)
    })
  })

  describe('clearCart', () => {
    it('empties the cart', () => {
      let state = cartReducer(initialState, addToCart(product))
      state = cartReducer(state, addToCart(otherProduct))
      state = cartReducer(state, clearCart())
      expect(state.items).toEqual([])
    })
  })
})
