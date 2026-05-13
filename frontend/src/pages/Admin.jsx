import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import AdminDashboard from '../components/Admin/AdminDashboard'
import AdminProducts from '../components/Admin/AdminProducts'
import AdminCategories from '../components/Admin/AdminCategories'
import AdminOrders from '../components/Admin/AdminOrders'
import AdminUsers from '../components/Admin/AdminUsers'

const Admin = () => {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [scrollPosition, setScrollPosition] = useState(0)
  const scrollContainerRef = React.useRef(null)
  const { user, isAuthenticated } = useAuthStore()
  const navigate = useNavigate()

  // Check if user is authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
    }
  }, [isAuthenticated, navigate])

  if (!isAuthenticated) {
    return null
  }

  const menuItems = [
    { id: 'dashboard', label: '📊 Dashboard', icon: '📈' },
    { id: 'products', label: '🛍️ Products', icon: '📦' },
    { id: 'categories', label: '📂 Categories', icon: '🏷️' },
    { id: 'orders', label: '📋 Orders', icon: '✅' },
    { id: 'users', label: '👥 Users', icon: '🧑' },
  ]

  // Scroll navigation
  const scroll = (direction) => {
    const container = scrollContainerRef.current
    if (container) {
      const scrollAmount = 200
      if (direction === 'left') {
        container.scrollLeft -= scrollAmount
      } else {
        container.scrollLeft += scrollAmount
      }
      setScrollPosition(container.scrollLeft)
    }
  }

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      setScrollPosition(scrollContainerRef.current.scrollLeft)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-slate-900">
      {/* Top Banner Navigation */}
      <div className="w-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white shadow-2xl">
        {/* Header Section */}
        <div className="px-8 py-6 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-red-400 bg-clip-text text-transparent">
                JSB Admin Panel
              </h1>
              <p className="text-sm text-gray-400 mt-1">Welcome, {user?.name} 👋</p>
            </div>
            <button
              onClick={() => {
                const { logout } = useAuthStore.getState()
                logout()
                navigate('/login')
              }}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg transition-all duration-300 flex items-center gap-2"
            >
              🚪 Logout
            </button>
          </div>
        </div>

        {/* Navigation Menu - Scrollable */}
        <div className="px-4 py-4 flex items-center gap-3 overflow-hidden">
          {/* Left Scroll Button */}
          <button
            onClick={() => scroll('left')}
            className="flex-shrink-0 bg-gray-700/50 hover:bg-gray-600 text-white p-2 rounded-lg transition-all duration-300"
            aria-label="Scroll left"
          >
            ←
          </button>

          {/* Scrollable Menu Container */}
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex gap-3 overflow-x-auto scroll-smooth flex-1 px-2 no-scrollbar"
            style={{ scrollBehavior: 'smooth' }}
          >
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 whitespace-nowrap flex-shrink-0 ${
                  activeTab === item.id
                    ? 'bg-gradient-to-r from-primary to-red-400 text-white shadow-lg transform scale-105'
                    : 'bg-red-950/50 text-gray-300 hover:bg-red-800 hover:text-white'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          {/* Right Scroll Button */}
          <button
            onClick={() => scroll('right')}
            className="flex-shrink-0 bg-gray-700/50 hover:bg-gray-600 text-white p-2 rounded-lg transition-all duration-300"
            aria-label="Scroll right"
          >
            →
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-auto p-8">
        {/* Page Header */}
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            {menuItems.find(m => m.id === activeTab)?.label}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your store operations efficiently
          </p>
        </div>

        {/* Content Card */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8">
          {activeTab === 'dashboard' && <AdminDashboard />}
          {activeTab === 'products' && <AdminProducts />}
          {activeTab === 'categories' && <AdminCategories />}
          {activeTab === 'orders' && <AdminOrders />}
          {activeTab === 'users' && <AdminUsers />}
        </div>
      </div>
    </div>
  )
}

export default Admin
