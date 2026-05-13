import React, { useEffect } from 'react'
import { useProductStore } from '../store/authStore'
import CategoryCard from '../components/CategoryCard'
import { LoadingSpinner, EmptyState, ErrorState } from '../utils/components'

const Categories = () => {
  const { products, categories, fetchProducts, fetchCategories, loading, error } = useProductStore()

  useEffect(() => {
    fetchProducts()
    fetchCategories()
  }, [])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
          Categories
        </h1>
        <p className="text-gray-600">
          Browse our wide selection of grocery categories
        </p>
      </div>

      {/* Categories Grid */}
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <ErrorState message={error} onRetry={() => fetchCategories()} />
      ) : categories.length === 0 ? (
        <EmptyState message="No categories available." />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <CategoryCard
              key={category._id}
              id={category._id}
              name={category.name}
              image={category.image}
              productCount={products.filter((p) => p.category === category._id).length}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Categories
