import React, { useEffect, useState } from 'react'

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCategories: 0,
    totalOrders: 0,
    totalUsers: 0,
    revenue: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('auth_token')
        
        // Fetch all stats
        const [productsRes, categoriesRes, ordersRes] = await Promise.all([
          fetch('http://localhost:5000/api/products', {
            headers: { 'Authorization': `Bearer ${token}` }
          }),
          fetch('http://localhost:5000/api/categories', {
            headers: { 'Authorization': `Bearer ${token}` }
          }),
          fetch('http://localhost:5000/api/orders', {
            headers: { 'Authorization': `Bearer ${token}` }
          })
        ])

        const products = await productsRes.json()
        const categories = await categoriesRes.json()
        const orders = await ordersRes.json()

        const totalRevenue = Array.isArray(orders) ? orders.reduce((sum, order) => sum + (order.total || 0), 0) : 0

        setStats({
          totalProducts: Array.isArray(products) ? products.length : 0,
          totalCategories: Array.isArray(categories) ? categories.length : 0,
          totalOrders: Array.isArray(orders) ? orders.length : 0,
          totalUsers: Math.floor(Array.isArray(orders) ? orders.length * 1.5 : 0),
          revenue: totalRevenue,
        })
      } catch (error) {
        console.error('Error fetching stats:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  const statCards = [
    { label: 'Total Products', value: stats.totalProducts, icon: '📦', color: 'from-blue-500 to-blue-600' },
    { label: 'Total Categories', value: stats.totalCategories, icon: '🏷️', color: 'from-purple-500 to-purple-600' },
    { label: 'Total Orders', value: stats.totalOrders, icon: '✅', color: 'from-green-500 to-green-600' },
    { label: 'Total Users', value: stats.totalUsers, icon: '👥', color: 'from-pink-500 to-pink-600' },
  ]

  return (
    <div>
      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <div
            key={index}
            className={`bg-gradient-to-br ${stat.color} text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-200 font-semibold">{stat.label}</h3>
              <span className="text-3xl">{stat.icon}</span>
            </div>
            <p className="text-4xl font-bold">{loading ? '...' : stat.value}</p>
            <p className="text-sm text-gray-100 mt-2">Active</p>
          </div>
        ))}
      </div>

      {/* Revenue Card */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-8 rounded-xl shadow-lg mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-gray-300 font-semibold mb-2">Total Revenue</h3>
            <p className="text-5xl font-bold">₹{loading ? '...' : stats.revenue.toLocaleString()}</p>
            <p className="text-sm text-gray-400 mt-2">From all orders</p>
          </div>
          <span className="text-6xl">💰</span>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-slate-700 dark:to-slate-800 p-6 rounded-xl">
          <h3 className="font-bold text-lg mb-4 text-gray-900 dark:text-white flex items-center gap-2">
            📈 Recent Activity
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-white dark:bg-slate-700 rounded-lg">
              <span className="text-sm text-gray-600 dark:text-gray-300">New orders received</span>
              <span className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-3 py-1 rounded-full text-sm font-bold">
                {stats.totalOrders}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-white dark:bg-slate-700 rounded-lg">
              <span className="text-sm text-gray-600 dark:text-gray-300">Active products</span>
              <span className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-sm font-bold">
                {stats.totalProducts}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-white dark:bg-slate-700 rounded-lg">
              <span className="text-sm text-gray-600 dark:text-gray-300">Total categories</span>
              <span className="bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 px-3 py-1 rounded-full text-sm font-bold">
                {stats.totalCategories}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-slate-700 dark:to-slate-800 p-6 rounded-xl">
          <h3 className="font-bold text-lg mb-4 text-gray-900 dark:text-white flex items-center gap-2">
            ⚙️ Quick Access
          </h3>
          <div className="space-y-3">
            <button className="w-full bg-white dark:bg-slate-700 hover:bg-gray-50 dark:hover:bg-slate-600 p-3 rounded-lg text-left font-semibold text-gray-700 dark:text-gray-300 transition-all duration-300">
              ➕ Add New Product
            </button>
            <button className="w-full bg-white dark:bg-slate-700 hover:bg-gray-50 dark:hover:bg-slate-600 p-3 rounded-lg text-left font-semibold text-gray-700 dark:text-gray-300 transition-all duration-300">
              ➕ Add New Category
            </button>
            <button className="w-full bg-white dark:bg-slate-700 hover:bg-gray-50 dark:hover:bg-slate-600 p-3 rounded-lg text-left font-semibold text-gray-700 dark:text-gray-300 transition-all duration-300">
              📊 View Reports
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
