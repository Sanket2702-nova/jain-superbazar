import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { showToast, validateEmail, validatePassword } from '../utils/helpers'

const Register = () => {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState({})
  const { register, loading, isAuthenticated } = useAuthStore()

  // Redirect if already authenticated
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/')
    }
  }, [isAuthenticated, navigate])

  const validateForm = () => {
    const newErrors = {}

    if (!name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!validatePassword(password)) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = validateForm()

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    const result = await register(name, email, password)

    if (result.success) {
      showToast('Registration successful!', 'success')
      navigate('/')
    } else {
      showToast(result.error, 'error')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">JSB</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Register</h1>
          <p className="text-gray-600 mt-2">Create your account</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div className="pt-2">
            <label htmlFor="fullName" className="block text-sm font-bold text-gray-800 mb-3">
              📝 Full Name
            </label>
            <input
              id="fullName"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value)
                if (errors.name) {
                  setErrors((prev) => ({ ...prev, name: '' }))
                }
              }}
              placeholder="Enter your full name"
              className={`w-full px-4 py-3 border-2 rounded-lg text-gray-900 placeholder-gray-400 bg-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-50 transition ${
                errors.name ? 'border-red-500' : 'border-gray-300 hover:border-gray-400'
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm font-semibold mt-2">⚠️ {errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-bold text-gray-800 mb-3">
              📧 Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                if (errors.email) {
                  setErrors((prev) => ({ ...prev, email: '' }))
                }
              }}
              placeholder="you@example.com"
              className={`w-full px-4 py-3 border-2 rounded-lg text-gray-900 placeholder-gray-400 bg-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-50 transition ${
                errors.email ? 'border-red-500' : 'border-gray-300 hover:border-gray-400'
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm font-semibold mt-2">⚠️ {errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-bold text-gray-800 mb-3">
              🔐 Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                if (errors.password) {
                  setErrors((prev) => ({ ...prev, password: '' }))
                }
              }}
              placeholder="••••••••"
              className={`w-full px-4 py-3 border-2 rounded-lg text-gray-900 placeholder-gray-400 bg-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-50 transition ${
                errors.password ? 'border-red-500' : 'border-gray-300 hover:border-gray-400'
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm font-semibold mt-2">⚠️ {errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-bold text-gray-800 mb-3">
              ✓ Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value)
                if (errors.confirmPassword) {
                  setErrors((prev) => ({ ...prev, confirmPassword: '' }))
                }
              }}
              placeholder="••••••••"
              className={`w-full px-4 py-3 border-2 rounded-lg text-gray-900 placeholder-gray-400 bg-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-50 transition ${
                errors.confirmPassword ? 'border-red-500' : 'border-gray-300 hover:border-gray-400'
              }`}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm font-semibold mt-2">⚠️ {errors.confirmPassword}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white font-bold py-2 rounded-lg hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed mt-6"
          >
            {loading ? 'Creating account...' : 'Register'}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-3 text-gray-500 text-sm">OR</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        {/* Login Link */}
        <p className="text-center text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-primary hover:underline font-semibold">
            Login here
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Register
