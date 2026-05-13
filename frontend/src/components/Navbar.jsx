import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { useCartStore } from '../store/authStore'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  // Dark mode state
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('theme') === 'dark'
  )
  
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

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  const fetchLocation = () => {
    if ("geolocation" in navigator) {
      setLocationLoading(true)
      navigator.geolocation.getCurrentPosition(async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const res = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`);
          const data = await res.json();
          const locationName = data.city || data.locality || data.principalSubdivision || "Unknown Area";
          setUserLocation(locationName);
          localStorage.setItem('userLocation', locationName);
        } catch (err) {
          console.error("Failed to fetch location", err);
          setUserLocation("Location Failed");
        } finally {
          setLocationLoading(false);
        }
      }, (error) => {
        console.error("Error getting location", error);
        setUserLocation("Permission Denied");
        setLocationLoading(false);
      }, { timeout: 10000 });
    } else {
      setUserLocation("Not Supported");
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/products?search=${searchQuery}`)
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <>
      <nav className="sticky top-0 z-50 bg-[#991B1B] dark:bg-red-950 shadow-md border-b border-white/10 transition-all duration-300">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-[72px]">
          {/* Logo & Location */}
          <div className="flex items-center space-x-6">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-red-400 rounded-xl flex items-center justify-center shadow-lg shadow-primary/30 group-hover:shadow-primary/50 group-hover:scale-110 transition-all duration-300">
                <span className="text-white font-bold text-xl drop-shadow-md">JS</span>
              </div>
              <span className="hidden md:inline font-extrabold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-200 transition-colors group-hover:from-white">
                Jain Super Bazar
              </span>
            </Link>

            {/* Location Pill */}
            <button 
              onClick={fetchLocation}
              title="Fetch current location"
              className="hidden lg:flex items-center space-x-1.5 text-sm bg-gradient-to-r from-blue-50 to-blue-100 dark:from-slate-800 dark:to-slate-700 border border-blue-200 dark:border-slate-700 px-4 py-2 rounded-full hover:from-blue-100 hover:to-blue-200 dark:hover:from-slate-700 dark:hover:to-slate-600 transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <span className="text-lg">📍</span>
              <span className="font-bold text-gray-700 dark:text-gray-200 truncate max-w-[120px]">
                {locationLoading ? 'Locating...' : userLocation ? userLocation : 'Set Location'}
              </span>
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8 font-bold text-sm">
            <Link to="/" className="text-white/90 hover:text-white transition-colors duration-300 relative group">
              Home
              <span className="absolute bottom-0 left-0 w-0 h-1 bg-white group-hover:w-full transition-all duration-300 rounded-full"></span>
            </Link>
            <Link to="/categories" className="text-white/90 hover:text-white transition-colors duration-300 relative group">
              Categories
              <span className="absolute bottom-0 left-0 w-0 h-1 bg-white group-hover:w-full transition-all duration-300 rounded-full"></span>
            </Link>
            <Link to="/products" className="text-white/90 hover:text-white transition-colors duration-300 relative group">
              Products
              <span className="absolute bottom-0 left-0 w-0 h-1 bg-white group-hover:w-full transition-all duration-300 rounded-full"></span>
            </Link>
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            
            {/* Theme Dongle (Navbar Horizontal) */}
            <button 
              onClick={toggleDarkMode}
              className="hidden lg:flex items-center gap-2 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-slate-800 dark:to-slate-700 p-1.5 px-2.5 rounded-full border border-gray-200 dark:border-slate-600 shadow-sm hover:shadow-md transition-all group"
              title="Toggle Theme"
            >
              <span className={`text-base transition-all duration-300 ${!darkMode ? 'scale-110 drop-shadow-md' : 'scale-75 opacity-40'}`}>☀️</span>
              
              {/* Horizontal Track */}
              <div className="w-11 h-6 rounded-full bg-gray-300 dark:bg-slate-900 shadow-inner relative overflow-hidden flex items-center p-0.5 border border-gray-300 dark:border-slate-600">
                {/* Horizontal Thumb */}
                <div 
                  className={`w-5 h-5 rounded-full shadow-sm transition-all duration-500 ${darkMode ? 'translate-x-5 bg-gradient-to-br from-primary to-red-400 shadow-primary/50' : 'translate-x-0 bg-gradient-to-br from-yellow-300 to-yellow-400 shadow-yellow-400/50'}`}
                />
              </div>

              <span className={`text-base transition-all duration-300 ${darkMode ? 'scale-110 drop-shadow-md' : 'scale-75 opacity-40'}`}>🌙</span>
            </button>

            {/* Cart Icon */}
            <Link
              to="/cart"
              className="relative p-2.5 text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-all duration-300 group"
            >
              <div className="absolute inset-0 rounded-lg bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300"></div>
              <svg
                className="w-6 h-6 transition-transform duration-300 group-hover:scale-110 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293a1 1 0 00.263 1.605A2 2 0 007 18h12M17 18a1 1 0 11-2 0m12 0a1 1 0 11-2 0"
                />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-br from-primary to-red-400 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shadow-lg shadow-primary/40 animate-bounce-gentle">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Auth Buttons */}
            {isAuthenticated ? (
              <div className="hidden md:flex items-center space-x-4">
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Hi, {user?.name}</span>
                <Link
                  to="/admin"
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-5 py-2 rounded-lg hover:shadow-lg hover:shadow-purple-500/40 active:scale-105 transition-all duration-300 font-bold text-sm flex items-center gap-2"
                  title="Admin Panel"
                >
                  <span>⚙️</span> Admin
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-[#8C0B0B] text-white px-5 py-2 rounded-lg hover:bg-red-900 active:scale-95 transition-all duration-300 font-bold text-sm"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-3">
                <Link
                  to="/login"
                  className="text-white hover:text-yellow-300 transition-colors font-bold text-sm"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-primary to-red-400 text-white px-5 py-2 rounded-lg hover:shadow-lg hover:shadow-primary/40 active:scale-95 transition-all duration-300 font-bold text-sm"
                >
                  Register
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
              onClick={() => setIsOpen(!isOpen)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-gray-200">
            <form onSubmit={handleSearch} className="mb-4 px-2">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
              />
            </form>
            <Link
              to="/"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/categories"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              Categories
            </Link>
            <Link
              to="/products"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              Products
            </Link>
            {isAuthenticated ? (
              <>
                <div className="px-4 py-2 border-t border-gray-200 mt-2">
                  <p className="text-sm text-gray-700 mb-2">Hi, {user?.name}</p>
                  <button
                    onClick={() => {
                      handleLogout()
                      setIsOpen(false)
                    }}
                    className="w-full bg-primary text-white px-4 py-2 rounded-lg hover:bg-rose-700 transition"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="px-4 py-2 border-t border-gray-200 mt-2 space-y-2">
                <Link
                  to="/login"
                  className="block text-center text-gray-700 hover:text-primary transition"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block text-center bg-primary text-white px-4 py-2 rounded-lg hover:bg-rose-700 transition"
                  onClick={() => setIsOpen(false)}
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
      </nav>
    </>
  )
}

export default Navbar
