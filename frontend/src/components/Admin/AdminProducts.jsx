import React, { useEffect, useState } from 'react'
import { showToast } from '../../utils/helpers'

const AdminProducts = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    image: '',
    stock: '',
  })

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/products')
      const data = await response.json()
      setProducts(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Error fetching products:', error)
      showToast('Failed to fetch products', 'error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const token = localStorage.getItem('auth_token')

    try {
      const method = editingId ? 'PUT' : 'POST'
      const url = editingId 
        ? `http://localhost:5000/api/products/${editingId}`
        : 'http://localhost:5000/api/products'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        showToast(editingId ? 'Product updated!' : 'Product added!', 'success')
        setFormData({ name: '', price: '', description: '', category: '', image: '', stock: '' })
        setEditingId(null)
        setShowForm(false)
        fetchProducts()
      } else {
        showToast('Failed to save product', 'error')
      }
    } catch (error) {
      console.error('Error:', error)
      showToast('Error saving product', 'error')
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure?')) return

    const token = localStorage.getItem('auth_token')
    try {
      const response = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      })

      if (response.ok) {
        showToast('Product deleted!', 'success')
        fetchProducts()
      } else {
        showToast('Failed to delete product', 'error')
      }
    } catch (error) {
      console.error('Error:', error)
      showToast('Error deleting product', 'error')
    }
  }

  const handleEdit = (product) => {
    setFormData({
      name: product.name,
      price: product.price,
      description: product.description,
      category: product.category,
      image: product.image,
      stock: product.stock || 0,
    })
    setEditingId(product._id)
    setShowForm(true)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Products</h3>
        <button
          onClick={() => {
            setShowForm(!showForm)
            setEditingId(null)
            setFormData({ name: '', price: '', description: '', category: '', image: '', stock: '' })
          }}
          className="bg-gradient-to-r from-primary to-pink-500 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-300"
        >
          {showForm ? '❌ Cancel' : '➕ Add Product'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-700 dark:to-slate-800 p-6 rounded-xl mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
              placeholder="Product name"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
              placeholder="₹"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
              placeholder="Category"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Stock</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
              placeholder="0"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
              placeholder="Product description"
              rows="3"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Image URL</label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
              placeholder="https://..."
            />
          </div>
          <button
            type="submit"
            className="md:col-span-2 bg-gradient-to-r from-primary to-pink-500 text-white font-bold py-2 px-4 rounded-lg hover:shadow-lg transition-all duration-300"
          >
            {editingId ? '✏️ Update Product' : '➕ Add Product'}
          </button>
        </form>
      )}

      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">Loading products...</p>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">No products found</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-slate-700">
                <th className="text-left py-4 px-4 font-bold text-gray-700 dark:text-gray-300">Name</th>
                <th className="text-left py-4 px-4 font-bold text-gray-700 dark:text-gray-300">Price</th>
                <th className="text-left py-4 px-4 font-bold text-gray-700 dark:text-gray-300">Category</th>
                <th className="text-left py-4 px-4 font-bold text-gray-700 dark:text-gray-300">Stock</th>
                <th className="text-left py-4 px-4 font-bold text-gray-700 dark:text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product._id} className="border-b border-gray-100 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
                  <td className="py-4 px-4 text-gray-600 dark:text-gray-300">{product.name}</td>
                  <td className="py-4 px-4 text-gray-600 dark:text-gray-300">₹{product.price}</td>
                  <td className="py-4 px-4 text-gray-600 dark:text-gray-300">{product.category}</td>
                  <td className="py-4 px-4 text-gray-600 dark:text-gray-300">{product.stock || 0}</td>
                  <td className="py-4 px-4 flex gap-2">
                    <button
                      onClick={() => handleEdit(product)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg text-sm transition-all duration-300"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm transition-all duration-300"
                    >
                      🗑️ Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default AdminProducts
