import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useProductStore } from '../store/authStore'
import ProductCard from '../components/ProductCard'
import { LoadingSpinner, EmptyState, ErrorState } from '../utils/components'

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [filteredProducts, setFilteredProducts] = useState([])
  const { products, categories, fetchProducts, fetchCategories, loading, error } = useProductStore()

  const categoryId = searchParams.get('category')
  const searchQuery = searchParams.get('search')
  
  const [localSearch, setLocalSearch] = useState(searchQuery || '')
  const [activeCategory, setActiveCategory] = useState(categoryId || 'all')

  useEffect(() => {
    if (products.length === 0) {
      fetchProducts()
      fetchCategories()
    }
  }, [])

  useEffect(() => {
    let filtered = products

    if (activeCategory !== 'all') {
      filtered = filtered.filter((product) => product.category === activeCategory)
      setSearchParams({ category: activeCategory })
    } else {
      const params = new URLSearchParams(searchParams)
      params.delete('category')
      setSearchParams(params)
    }

    if (localSearch) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(localSearch.toLowerCase())
      )
    }

    setFilteredProducts(filtered)
  }, [products, activeCategory, localSearch, setSearchParams])

  return (
    <div className="flex flex-col h-[calc(100vh-72px)] bg-gray-50 dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800">
      
      {/* Mobile Sticky Search Bar (Top overlay for space) */}
      <div className="md:hidden p-3 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 z-10">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search products..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-sm shadow-inner transition-all dark:text-white"
          />
          <span className="absolute left-3 top-2.5 text-gray-400 text-sm">🔍</span>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden relative">
        
        {/* Left Sidebar (Categories) */}
        {!loading && categories.length > 0 && (
          <div className="w-[76px] md:w-[85px] bg-[#f3f4f6] dark:bg-slate-900 border-r border-[#e5e7eb] dark:border-slate-800 overflow-y-auto no-scrollbar flex-shrink-0 z-10">
            <div className="flex flex-col">
              {categories.map((cat, index) => {
                // Initialize first category as active if none selected
                if (index === 0 && activeCategory === 'all') {
                  setActiveCategory(cat._id)
                }
                const isActive = activeCategory === cat._id || (activeCategory === 'all' && index === 0);
                return (
                  <button
                    key={cat._id}
                    onClick={() => setActiveCategory(cat._id)}
                    className={`flex flex-col items-center gap-[4px] py-4 border-r-4 transition-colors ${
                      isActive
                        ? 'border-green-600 bg-white dark:bg-slate-800 text-black dark:text-white'
                        : 'border-transparent text-gray-700 hover:bg-[#ebedef] dark:hover:bg-slate-800'
                    }`}
                  >
                    <div className="w-[48px] h-[48px] rounded-xl bg-gray-100 dark:bg-slate-800 p-1 flex items-center justify-center flex-shrink-0 overflow-hidden">
                      <img src={cat.image} alt={cat.name} className="w-full h-full object-contain mix-blend-darken" />
                    </div>
                    <span className={`text-[10px] text-center leading-[1.2] mt-1 px-1 w-full break-words ${isActive ? 'font-bold' : 'font-medium'}`}>
                      {cat.name}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* Right Pane (Products Grid) */}
        <div className="flex-1 overflow-y-auto bg-white dark:bg-slate-950 p-3 lg:p-6 pb-24 relative scroll-smooth">
          
          {/* Desktop Search Header */}
          <div className="hidden lg:flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6 sticky top-0 z-20 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md pb-4 border-b border-gray-200 dark:border-slate-800">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              {categories.find(c => c._id === activeCategory)?.name || 'Products'}
            </h1>
            <div className="relative w-80">
              <input
                type="text"
                placeholder="Search products..."
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-full focus:outline-none focus:border-green-500 shadow-sm dark:text-white"
              />
              <span className="absolute left-3 top-2.5 text-gray-400 text-sm">🔍</span>
            </div>
          </div>

          {/* Grid Area: 4 Columns per user spec */}
          {loading ? (
            <div className="mt-10"><LoadingSpinner /></div>
          ) : error ? (
            <div className="mt-10"><ErrorState message={error} onRetry={() => fetchProducts()} /></div>
          ) : filteredProducts.length === 0 ? (
            <div className="mt-10"><EmptyState message="No products found in this category." /></div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-5 animate-[fadeIn_0.3s_ease-out]">
              {filteredProducts.map((product, index) => (
                <ProductCard key={product._id} product={product} index={index} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Products
