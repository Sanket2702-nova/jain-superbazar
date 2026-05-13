import React, { useEffect, useState } from 'react'
import { showToast } from '../../utils/helpers'

const AdminCategories = () => {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: '',
  })

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/categories')
      const data = await response.json()
      setCategories(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Error fetching categories:', error)
      showToast('Failed to fetch categories', 'error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCategories()
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
        ? `http://localhost:5000/api/categories/${editingId}`
        : 'http://localhost:5000/api/categories'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        showToast(editingId ? 'Category updated!' : 'Category added!', 'success')
        setFormData({ name: '', description: '', image: '' })
        setEditingId(null)
        setShowForm(false)
        fetchCategories()
      } else {
        showToast('Failed to save category', 'error')
      }
    } catch (error) {
      console.error('Error:', error)
      showToast('Error saving category', 'error')
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure?')) return

    const token = localStorage.getItem('auth_token')
    try {
      const response = await fetch(`http://localhost:5000/api/categories/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      })

      if (response.ok) {
        showToast('Category deleted!', 'success')
        fetchCategories()
      } else {
        showToast('Failed to delete category', 'error')
      }
    } catch (error) {
      console.error('Error:', error)
      showToast('Error deleting category', 'error')
    }
  }

  const handleEdit = (category) => {
    setFormData({
      name: category.name,
      description: category.description || '',
      image: category.image || '',
    })
    setEditingId(category._id)
    setShowForm(true)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Categories</h3>
        <button
          onClick={() => {
            setShowForm(!showForm)
            setEditingId(null)
            setFormData({ name: '', description: '', image: '' })
          }}
          className="bg-gradient-to-r from-primary to-pink-500 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-300"
        >
          {showForm ? '❌ Cancel' : '➕ Add Category'}
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
              placeholder="Category name"
            />
          </div>
          <div>
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
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
              placeholder="Category description"
              rows="3"
            />
          </div>
          <button
            type="submit"
            className="md:col-span-2 bg-gradient-to-r from-primary to-pink-500 text-white font-bold py-2 px-4 rounded-lg hover:shadow-lg transition-all duration-300"
          >
            {editingId ? '✏️ Update Category' : '➕ Add Category'}
          </button>
        </form>
      )}

      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">Loading categories...</p>
        </div>
      ) : categories.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">No categories found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map(category => (
            <div key={category._id} className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-700 dark:to-slate-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
              {category.image && (
                <img src={category.image} alt={category.name} className="w-full h-40 object-cover" />
              )}
              <div className="p-4">
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{category.name}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{category.description}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(category)}
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg text-sm transition-all duration-300"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDelete(category._id)}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg text-sm transition-all duration-300"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AdminCategories
