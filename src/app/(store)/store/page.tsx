'use client'
import { useEffect, useState } from 'react'
import { useCart } from '@/context/CartContext'
import Link from 'next/link'

export default function StorePage() {
  const [products, setProducts] = useState([])
  const { addToCart } = useCart()

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => setProducts(data))
  }, [])

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {products.map(product => (
        <div key={product.id} className="border p-4 rounded shadow">
          <img src={product.image} alt={product.title} className="h-40 object-contain mx-auto" />
          <h2 className="mt-2 font-semibold text-lg">{product.title}</h2>
          <p className="text-sm text-gray-600">{product.category}</p>
          <p className="text-indigo-600 font-bold">${product.price}</p>

          <div className="flex gap-2 mt-2">
            <button
              onClick={() => addToCart(product)}
              className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700"
            >
              Add to Cart
            </button>

            <Link
              href={`/products/${product.id}`}
              className="bg-gray-200 text-gray-800 px-3 py-1 rounded hover:bg-gray-300"
            >
              Details
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}
