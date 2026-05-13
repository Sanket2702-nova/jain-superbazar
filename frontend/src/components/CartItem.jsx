import React from 'react'
import { useCartStore } from '../store/authStore'
import { formatPrice } from '../utils/helpers'

const CartItem = ({ item }) => {
  const updateQuantity = useCartStore((state) => state.updateQuantity)
  const removeFromCart = useCartStore((state) => state.removeFromCart)

  return (
    <div className="flex gap-4 bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md border border-transparent dark:border-slate-700 transition-colors">
      {/* Product Image */}
      <div className="w-24 h-24 bg-gray-100 dark:bg-slate-700 rounded-lg overflow-hidden flex-shrink-0">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Product Details */}
      <div className="flex-1">
        <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-1">{item.name}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{item.category}</p>
        <p className="font-bold text-primary">{formatPrice(item.price)}</p>
      </div>

      {/* Quantity Controls */}
      <div className="flex flex-col items-end justify-between">
        <button
          onClick={() => removeFromCart(item._id)}
          className="text-red-500 hover:text-red-700 font-semibold text-sm"
        >
          ✕ Remove
        </button>

        <div className="flex items-center border border-gray-300 dark:border-slate-600 rounded-lg overflow-hidden">
          <button
            onClick={() => updateQuantity(item._id, item.quantity - 1)}
            className="px-3 py-1 bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 text-gray-800 dark:text-gray-100 transition"
          >
            −
          </button>
          <span className="px-4 py-1 font-semibold text-gray-800 dark:text-gray-100">{item.quantity}</span>
          <button
            onClick={() => updateQuantity(item._id, item.quantity + 1)}
            className="px-3 py-1 bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 text-gray-800 dark:text-gray-100 transition"
          >
            +
          </button>
        </div>

        {/* Subtotal */}
        <p className="font-bold text-gray-800 dark:text-gray-100">
          {formatPrice(item.price * item.quantity)}
        </p>
      </div>
    </div>
  )
}

export default CartItem
