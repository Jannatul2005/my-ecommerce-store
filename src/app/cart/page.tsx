'use client'
import { useCart } from '@/context/CartContext'
import { useRouter } from 'next/navigation'

export default function CartPage() {
  const { cart, increaseQuantity, decreaseQuantity, removeFromCart, getTotalPrice } = useCart()
  const router = useRouter()  // Get the router

  if (cart.length === 0) {
    return (
      <div className="text-center mt-10">
        Your cart is empty!
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Your Cart</h1>
      <div className="space-y-4">
        {cart.map((product) => (
          <div key={product.id} className="flex items-center justify-between p-4 border rounded-lg shadow-sm">
            <img src={product.image} alt={product.title} className="w-20 h-20 object-contain" />
            <div className="flex-1 ml-4">
              <h2 className="text-lg font-semibold">{product.title}</h2>
              <p className="text-gray-600">{product.category}</p>
              <p className="text-indigo-600 font-semibold">${(product.price * product.quantity).toFixed(2)}</p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => decreaseQuantity(product.id)}
                className="bg-gray-200 px-3 py-1 rounded text-gray-600 hover:bg-gray-300"
              >
                -
              </button>
              <span>{product.quantity}</span>
              <button
                onClick={() => increaseQuantity(product.id)}
                className="bg-gray-200 px-3 py-1 rounded text-gray-600 hover:bg-gray-300"
              >
                +
              </button>
              <button
                onClick={() => removeFromCart(product.id)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Total Price */}
      <div className="mt-6 text-xl font-semibold">
        Total: ${getTotalPrice().toFixed(2)}
      </div>

      {/* Back to Store Button */}
      <div className="mt-6 text-center">
        <button
          onClick={() => router.push('/store')}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Back to Store
        </button>
      </div>
    </div>
  )
}
