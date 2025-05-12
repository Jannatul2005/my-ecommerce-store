
'use client'
import { createContext, useContext, useState } from 'react'

export const CartContext = createContext(null)

export const useCart = () => useContext(CartContext)

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])

  // Add to cart
  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find(item => item.id === product.id)
      if (exists) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  // Increase product quantity
  const increaseQuantity = (id) => {
    setCart((prev) =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    )
  }

  // Decrease product quantity
  const decreaseQuantity = (id) => {
    setCart((prev) =>
      prev.map(item =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    )
  }

  // Remove product from cart
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter(item => item.id !== id))
  }

  // Calculate total price
  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, increaseQuantity, decreaseQuantity, removeFromCart, getTotalPrice }}>
      {children}
    </CartContext.Provider>
  )
}
