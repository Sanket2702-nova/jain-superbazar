import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { useCartStore } from '../store/authStore'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [darkMode, setDarkMode] = useState(localStorage.getItem('theme') === 'dark')
  const [userLocation, setUserLocation] = useState(localStorage.getItem('userLocation') || '')
  const [locationLoading, setLocationLoading] = useState(false)
  
  const navigate = useNavigate()
  const { user, logout, isAuthenticated } = useAuthStore()
  const cartCount = useCartStore((state) => state.getCartCount())

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [darkMode])

  const toggleDarkMode = () => setDarkMode(!darkMode)

  const fetchLocation = () => {
    if ("geolocation" in navigator) {
      setLocationLoading(true)
      navigator.geolocation.getCurrentPosition(async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const res = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`);
          const data = await res.json();
          const locationName = data.city || data.locality || "Unknown Area";
          setUserLocation(locationName);
          localStorage.setItem('userLocation', locationName);
        } catch (err) {
          setUserLocation("Location Failed");
        } finally {
          setLocationLoading(false);
        }
      }, () => {
        setUserLocation("Permission Denied");
        setLocationLoading(false);
      });
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/products?search=${searchQuery}`)
      setIsOpen(false)
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/')
    setIsOpen(false)
  }

  return (
    <>
      <nav className="sticky top-0 z-50 bg-[#B00E0E] dark:bg-red-950 shadow-md border-b border-white/10 transition-all duration-300 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-[72px]">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group flex-shrink-0">
              <div className="w-10 h-10 bg-gradient-to-br from-white to-gray-200 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300">
                <span className="text-[#B00E0E] font-bold text-xl">JS</span>
              </div>
              <span className="hidden sm:inline font-extrabold text-xl md:text-2xl text-white">
                Jain Super Bazar
              </span>
            </Link>

            {/* Desktop Center Links */}
            <div className="hidden lg:flex items-center space-x-6 font-bold text-sm">
              <Link to="/" className="text-white/90 hover:text-white transition-colors relative group">
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-1 bg-white group-hover:w-full transition-all duration-300 rounded-full"></span>
              </Link>
              <Link to="/categories" className="text-white/90 hover:text-white transition-colors relative group">
                Categories
                <span className="absolute -bottom-1 left-0 w-0 h-1 bg-white group-hover:w-full transition-all duration-300 rounded-full"></span>
              </Link>
              <Link to="/products" className="text-white/90 hover:text-white transition-colors relative group">
                Products
                <span className="absolute -bottom-1 left-0 w-0 h-1 bg-white group-hover:w-full transition-all duration-300 rounded-full"></span>
              </Link>
            </div>

            {/* Right Side Icons */}
            <div className="flex items-center space-x-2 md:space-x-4">
              {/* Theme Toggle */}
              <button onClick={toggleDarkMode} className="p-2 text-white hover:bg-white/10 rounded-full transition-colors hidden sm:block">
                {darkMode ? '☀️' : '🌙'}
              </button>

              {/* Cart */}
              <Link to="/cart" className="relative p-2.5 text-white hover:bg-white/10 rounded-full transition-all group">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293a1 1 0 00.263 1.605A2 2 0 007 18h12M17 18a1 1 0 11-2 0m12 0a1 1 0 11-2 0" />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 bg-white text-[#B00E0E] rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-bold shadow-lg">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Desktop Auth */}
              <div className="hidden md:flex items-center space-x-3">
                {isAuthenticated ? (
                  <>
                    <Link to="/admin" className="text-white hover:text-gray-200 font-bold text-sm">Admin</Link>
                    <button onClick={handleLogout} className="bg-white text-[#B00E0E] px-4 py-2 rounded-lg font-bold text-sm hover:bg-gray-100 transition-colors">
                      Logout
                    </button>
                  </>
                ) : (
                  <Link to="/login" className="bg-white text-[#B00E0E] px-6 py-2 rounded-lg font-bold text-sm hover:bg-gray-100 transition-colors">
                    Login
                  </Link>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Sidebar Overlay */}
        {isOpen && (
          <div className="fixed inset-0 z-[60] lg:hidden">
            {/* Backdrop */}
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsOpen(false)}></div>
            
            {/* Sidebar Content */}
            <div className="fixed right-0 top-0 bottom-0 w-[280px] bg-white dark:bg-slate-900 shadow-2xl flex flex-col transform transition-transform duration-300">
              <div className="p-6 bg-[#B00E0E] text-white flex justify-between items-center">
                <span className="font-bold text-lg text-white">Menu</span>
                <button onClick={() => setIsOpen(false)} className="text-white">✕</button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-2">
                <form onSubmit={handleSearch} className="mb-6">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-slate-800 border border-transparent rounded-xl focus:ring-2 focus:ring-primary focus:bg-white dark:focus:bg-slate-700 transition-all outline-none"
                    />
                    <span className="absolute left-3 top-2.5">🔍</span>
                  </div>
                </form>

                <Link to="/" onClick={() => setIsOpen(false)} className="flex items-center gap-3 p-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-xl font-bold transition-all">
                  <span>🏠</span> Home
                </Link>
                <Link to="/categories" onClick={() => setIsOpen(false)} className="flex items-center gap-3 p-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-xl font-bold transition-all">
                  <span>📂</span> Categories
                </Link>
                <Link to="/products" onClick={() => setIsOpen(false)} className="flex items-center gap-3 p-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-xl font-bold transition-all">
                  <span>🛒</span> Products
                </Link>
                
                <div className="border-t border-gray-100 dark:border-slate-800 my-4 pt-4">
                  <button onClick={toggleDarkMode} className="w-full flex items-center gap-3 p-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-xl font-bold transition-all">
                    <span>{darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}</span>
                  </button>
                  <button onClick={fetchLocation} className="w-full flex items-center gap-3 p-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-xl font-bold transition-all">
                    <span>📍 {userLocation || 'Set Location'}</span>
                  </button>
                </div>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-slate-800 border-t border-gray-100 dark:border-slate-700">
                {isAuthenticated ? (
                  <div className="space-y-3">
                    <p className="text-sm text-gray-600 dark:text-gray-400 font-bold px-2">Signed in as {user?.name}</p>
                    <Link to="/admin" onClick={() => setIsOpen(false)} className="block w-full text-center bg-gray-200 dark:bg-slate-700 text-gray-800 dark:text-white py-3 rounded-xl font-bold hover:bg-gray-300 transition-all">
                      Admin Panel
                    </Link>
                    <button onClick={handleLogout} className="w-full bg-[#B00E0E] text-white py-3 rounded-xl font-bold hover:bg-red-800 transition-all">
                      Logout
                    </button>
                  </div>
                ) : (
                  <Link to="/login" onClick={() => setIsOpen(false)} className="block w-full text-center bg-[#B00E0E] text-white py-3 rounded-xl font-bold hover:bg-red-800 shadow-lg shadow-red-900/20 transition-all">
                    Login / Sign Up
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  )
}

export default Navbar
