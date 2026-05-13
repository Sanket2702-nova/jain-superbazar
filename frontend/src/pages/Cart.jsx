import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useCartStore } from '../store/authStore'
import CartItem from '../components/CartItem'
import { EmptyState } from '../utils/components'
import { formatPrice } from '../utils/helpers'

const Cart = () => {
  const navigate = useNavigate()
  const items = useCartStore((state) => state.items)
  const total = useCartStore((state) => state.total)
  const clearCart = useCartStore((state) => state.clearCart)

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Shopping Cart</h1>
        <div className="bg-white rounded-lg shadow-md p-8">
          <EmptyState message="Your cart is empty. Start shopping!" />
          <div className="text-center mt-6">
            <button
              onClick={() => navigate('/products')}
              className="bg-primary text-white font-bold px-8 py-3 rounded-lg hover:bg-rose-700 transition"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {items.map((item) => (
              <CartItem key={item._id} item={item} />
            ))}
          </div>

          <button
            onClick={() => {
              if (window.confirm('Are you sure you want to clear your cart?')) {
                clearCart()
              }
            }}
            className="mt-6 text-rose-500 hover:text-rose-700 font-semibold"
          >
            Clear Cart
          </button>
        </div>

        {/* Order Summary */}
        <div className="bg-white dark:bg-slate-800 transition-colors rounded-lg shadow-md p-6 h-fit sticky top-20 border border-transparent dark:border-slate-700">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Order Summary</h2>

          <div className="space-y-3 mb-4 border-b border-gray-200 dark:border-slate-700 pb-4">
            <div className="flex justify-between">
              <span className="text-gray-700 dark:text-gray-300">Subtotal</span>
              <span className="font-semibold text-gray-900 dark:text-white">{formatPrice(total)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700 dark:text-gray-300">Delivery Fee</span>
              <span className="font-semibold text-green-600 dark:text-green-400">FREE</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700 dark:text-gray-300">Tax (5%)</span>
              <span className="font-semibold text-gray-900 dark:text-white">{formatPrice(total * 0.05)}</span>
            </div>
          </div>

          <div className="flex justify-between mb-6 border-b border-gray-200 dark:border-slate-700 pb-4">
            <span className="text-lg font-bold text-gray-800 dark:text-white">Total</span>
            <span className="text-lg font-bold text-primary">
              {formatPrice(total * 1.05)}
            </span>
          </div>

          <button
            onClick={() => navigate('/checkout')}
            className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-rose-700 transition"
          >
            Proceed to Checkout
          </button>

          <button
            onClick={() => navigate('/products')}
            className="w-full mt-3 border-2 border-primary text-primary font-bold py-3 rounded-lg hover:bg-rose-50 transition"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  )
}

export default Cart
