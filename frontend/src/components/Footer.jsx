import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-red-900 text-white mt-20">
      {/* Top accent */}
      <div className="h-1 bg-gradient-to-r from-primary via-red-400 to-primary"></div>
      <div className="h-1 bg-gradient-to-r from-red-600 via-red-400 to-red-600"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3 group">
              <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-400 rounded-xl flex items-center justify-center shadow-lg shadow-red-600/40 group-hover:shadow-red-600/60 transition-shadow">
                <span className="text-white font-bold text-xl">JS</span>
              </div>
              <span className="font-extrabold text-xl bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">Jain Super Bazar</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Fresh groceries delivered to your doorstep. Quality and freshness guaranteed, premium service.
            </p>
            <div className="flex gap-3 pt-4">
              <a href="#" className="w-10 h-10 bg-red-600/20 hover:bg-red-600/40 rounded-lg flex items-center justify-center transition-all duration-300">📱</a>
              <a href="#" className="w-10 h-10 bg-red-600/20 hover:bg-red-600/40 rounded-lg flex items-center justify-center transition-all duration-300">💬</a>
              <a href="#" className="w-10 h-10 bg-red-600/20 hover:bg-red-600/40 rounded-lg flex items-center justify-center transition-all duration-300">🔗</a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold mb-6 text-lg bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Quick Links</h3>
            <ul className="space-y-3 text-gray-400">
              <li className="group">
                <Link to="/" className="hover:text-rose-400 transition-colors duration-300 font-medium flex items-center gap-2">
                  <span className="text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  Home
                </Link>
              </li>
              <li className="group">
                <Link to="/products" className="hover:text-rose-400 transition-colors duration-300 font-medium flex items-center gap-2">
                  <span className="text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  Products
                </Link>
              </li>
              <li className="group">
                <Link to="/categories" className="hover:text-rose-400 transition-colors duration-300 font-medium flex items-center gap-2">
                  <span className="text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  Categories
                </Link>
              </li>
              <li className="group">
                <Link to="/cart" className="hover:text-rose-400 transition-colors duration-300 font-medium flex items-center gap-2">
                  <span className="text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-bold mb-6 text-lg bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Customer Service</h3>
            <ul className="space-y-3 text-gray-400">
              <li className="group">
                <a href="#" className="hover:text-rose-400 transition-colors duration-300 font-medium flex items-center gap-2">
                  <span className="text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  About Us
                </a>
              </li>
              <li className="group">
                <a href="#" className="hover:text-rose-400 transition-colors duration-300 font-medium flex items-center gap-2">
                  <span className="text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  Privacy Policy
                </a>
              </li>
              <li className="group">
                <a href="#" className="hover:text-rose-400 transition-colors duration-300 font-medium flex items-center gap-2">
                  <span className="text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  Terms & Conditions
                </a>
              </li>
              <li className="group">
                <a href="#" className="hover:text-red-400 transition-colors duration-300 font-medium flex items-center gap-2">
                  <span className="text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold mb-6 text-lg bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Contact Us</h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li className="flex items-center gap-3 hover:text-rose-400 transition-colors duration-300">
                <span className="text-lg">📞</span>
                <span className="font-medium">+91 1234567890</span>
              </li>
              <li className="flex items-center gap-3 hover:text-rose-400 transition-colors duration-300">
                <span className="text-lg">📧</span>
                <span className="font-medium">support@jsb.com</span>
              </li>
              <li className="flex items-center gap-3 hover:text-rose-400 transition-colors duration-300">
                <span className="text-lg">📍</span>
                <span className="font-medium">123 Market Street, City</span>
              </li>
              <li className="flex items-center gap-3 hover:text-rose-400 transition-colors duration-300">
                <span className="text-lg">⏰</span>
                <span className="font-medium">6 AM - 11 PM Daily</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              &copy; 2024 Jain Super Bazar. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="group flex items-center gap-2 text-gray-400 hover:text-rose-400 transition-colors duration-300 font-medium">
                <span>f</span>
                <span className="opacity-0 group-hover:opacity-100 text-sm transition-opacity">Facebook</span>
              </a>
              <a href="#" className="group flex items-center gap-2 text-gray-400 hover:text-rose-400 transition-colors duration-300 font-medium">
                <span>𝕏</span>
                <span className="opacity-0 group-hover:opacity-100 text-sm transition-opacity">Twitter</span>
              </a>
              <a href="#" className="group flex items-center gap-2 text-gray-400 hover:text-primary transition-colors duration-300 font-medium">
                <span>📷</span>
                <span className="opacity-0 group-hover:opacity-100 text-sm transition-opacity">Instagram</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
