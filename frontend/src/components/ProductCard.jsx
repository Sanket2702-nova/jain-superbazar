import React, { useState } from 'react'
import { useCartStore } from '../store/authStore'
import { showToast } from '../utils/helpers'
import { formatPrice } from '../utils/helpers'

const ProductCard = ({ product, index }) => {
  const cartItems = useCartStore((state) => state.items)
  const addToCart = useCartStore((state) => state.addToCart)
  const updateQuantity = useCartStore((state) => state.updateQuantity)
  
  const cartItem = cartItems.find(item => item._id === product._id)
  const quantity = cartItem ? cartItem.quantity : 0

  const handleAddToCart = () => {
    addToCart(product)
    showToast(`${product.name} added to cart!`, 'success')
  }

  const handleUpdateQuantity = (newQty) => {
    updateQuantity(product._id, newQty)
    if (newQty > quantity) {
      showToast(`Quantity updated!`, 'success')
    }
  }

  const rating = 4.5 + (Math.random() * 0.5) // Random rating between 4.5-5
  const reviews = Math.floor(Math.random() * 50) + 20

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border-2 border-gray-300 dark:border-slate-700 overflow-hidden flex flex-col group relative transition-all duration-300 hover:shadow-2xl hover:border-primary active:scale-[0.98] shadow-sm">
      
      {/* Special Badge - only for first product */}
      {index === 0 && (
        <div className="absolute top-4 right-4 z-20 animate-bounce-gentle">
          <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-primary to-red-400 text-white text-xs md:text-sm font-bold px-3 py-1.5 rounded-full shadow-lg shadow-primary/40">
            <span>⭐</span>
            <span>FEATURED</span>
          </span>
        </div>
      )}

      {/* Delivery Time Badge */}
      <div className="px-3 pt-3 absolute top-0 left-0 z-10 w-full">
        <div className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm text-xs md:text-sm font-bold text-gray-700 dark:text-gray-200 px-3 py-1.5 rounded-lg shadow-sm border border-gray-100 dark:border-slate-700 flex items-center justify-center gap-1.5 w-max hover:bg-white dark:hover:bg-slate-800 transition">
          <span className="text-base">⏱</span>
          <span>13 MINS</span>
        </div>
      </div>

      {/* Image Section - COMPACT */}
      <div className="relative w-full h-40 md:h-48 flex justify-center items-center overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-800 dark:to-slate-700 p-3">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-contain mix-blend-multiply dark:mix-blend-normal transition-transform duration-300 group-hover:scale-110"
        />
        {/* Overlay gradient on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/0 to-primary/0 group-hover:from-primary/5 group-hover:to-primary/0 transition-all duration-300"></div>
      </div>
      
      {/* Content Section */}
      <div className="px-4 py-3 flex flex-col z-10 bg-white dark:bg-slate-900 gap-1.5 flex-grow">
        
        {/* Title - LARGER & CLEARER */}
        <h3 className="font-bold text-gray-900 dark:text-gray-100 text-base md:text-lg line-clamp-2 leading-snug group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        
        {/* Weight/Quantity - LARGER */}
        <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base font-medium">
          {['40 g', '38.5 g', '35 g', '26 g'][Math.floor(product._id.charCodeAt(product._id.length-1) % 4)] || '1 pc'}
        </p>

        {/* Rating Stars - LARGER */}
        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-sm md:text-base">
                {i < Math.floor(rating) ? '⭐' : '☆'}
              </span>
            ))}
          </div>
          <span className="text-xs md:text-sm text-gray-500 dark:text-gray-400">({reviews})</span>
        </div>

        {/* Bottom Row: Price & Add Button */}
        <div className="flex items-center justify-between gap-2 mt-auto pt-2">
          <div className="flex flex-col">
            <span className="text-base md:text-lg font-bold text-gray-900 dark:text-white leading-none">
              {formatPrice(product.price)}
            </span>
            {product.price > 30 && (
              <span className="text-xs md:text-sm text-gray-500 font-semibold">Bulk available</span>
            )}
          </div>

          {quantity > 0 ? (
            <div className="flex items-center bg-primary text-white rounded-lg overflow-hidden shadow-lg shadow-primary/20">
              <button
                onClick={() => handleUpdateQuantity(quantity - 1)}
                className="px-3 py-2 hover:bg-dark transition-colors font-bold text-lg"
              >
                -
              </button>
              <span className="px-2 py-2 font-bold min-w-[30px] text-center bg-primary/50">
                {quantity}
              </span>
              <button
                onClick={() => handleUpdateQuantity(quantity + 1)}
                className="px-3 py-2 hover:bg-dark transition-colors font-bold text-lg"
              >
                +
              </button>
            </div>
          ) : (
            <button
              onClick={handleAddToCart}
              className="px-4 py-2 rounded-lg font-bold text-sm md:text-base uppercase tracking-wider transition-all duration-300 flex items-center gap-1.5 border-2 border-primary bg-red-50 dark:bg-red-900/30 text-primary dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/50 hover:shadow-lg hover:shadow-primary/30 hover:scale-105"
            >
              <span className="text-lg font-bold">+</span>
              <span>ADD</span>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductCard
