'use client'

import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { useAuth } from '@/context/AuthContext'
import { ShoppingCart } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  const { cart } = useCart()
  const { logout } = useAuth()
  const router = useRouter()

  const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0)

  const handleLogout = () => {
    logout()
    router.push('/login') // redirect to login
  }

  return (
    <div>
      <nav className="bg-white shadow-md p-4 flex justify-between items-center">
        <Link href="/store" className="text-xl font-bold text-indigo-600">Mini Store</Link>

        <div className="flex items-center space-x-4">
          {/* Cart Icon */}
          <div className="relative">
            <Link href="/cart">
              <ShoppingCart className="w-6 h-6 text-gray-700" />
            </Link>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded-full">
                {totalItems}
              </span>
            )}
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </nav>

      <main className="p-4">{children}</main>
    </div>
  )
}
