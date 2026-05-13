import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import axios from 'axios'

// API Base URL - Use relative path to leverage Vite proxy
const API_BASE_URL = '/api'

// Configure axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      loading: false,
      isAuthenticated: false,

      setUser: (user) => set({ user }),
      setToken: (token) => set({ token }),
      setLoading: (loading) => set({ loading }),

      checkAuth: () => {
        const token = localStorage.getItem('token')
        const user = localStorage.getItem('user')
        if (token && user) {
          set({ token, user: JSON.parse(user), isAuthenticated: true })
          apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        }
      },

      login: async (email, password) => {
        set({ loading: true })
        try {
          console.log('🔐 Mock Login attempt:', { email })
          
          // Simulate network delay
          await new Promise(resolve => setTimeout(resolve, 600))
          
          // Mock successful login response
          const mockUser = {
            _id: 'demo_user_123',
            name: email.split('@')[0] || 'Demo User',
            email: email,
            role: 'admin' // Grant admin access for demo purposes
          }
          const mockToken = 'mock_jwt_token_123456789'
          
          set({ token: mockToken, user: mockUser, isAuthenticated: true, loading: false })
          localStorage.setItem('token', mockToken)
          localStorage.setItem('user', JSON.stringify(mockUser))
          
          return { success: true }
        } catch (error) {
          console.error('❌ Login error:', error)
          set({ loading: false })
          return { success: false, error: 'Login failed.' }
        }
      },

      register: async (name, email, password) => {
        set({ loading: true })
        try {
          console.log('📝 Mock Registration attempt:', { name, email })
          
          // Simulate network delay
          await new Promise(resolve => setTimeout(resolve, 600))
          
          // Mock successful registration
          const mockUser = {
            _id: 'demo_user_123',
            name: name || email.split('@')[0] || 'Demo User',
            email: email,
            role: 'admin'
          }
          const mockToken = 'mock_jwt_token_123456789'
          
          set({ token: mockToken, user: mockUser, isAuthenticated: true, loading: false })
          localStorage.setItem('token', mockToken)
          localStorage.setItem('user', JSON.stringify(mockUser))
          
          return { success: true }
        } catch (error) {
          console.error('❌ Registration error:', error)
          set({ loading: false })
          return { success: false, error: 'Registration failed.' }
        }
      },

      logout: () => {
        set({ user: null, token: null, isAuthenticated: false })
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        delete apiClient.defaults.headers.common['Authorization']
        delete axios.defaults.headers.common['Authorization']
      },
    }),
    {
      name: 'auth-storage',
    }
  )
)

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      total: 0,

      addToCart: (product) => {
        const { items } = get()
        const existingItem = items.find((item) => item._id === product._id)

        if (existingItem) {
          set({
            items: items.map((item) =>
              item._id === product._id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          })
        } else {
          set({ items: [...items, { ...product, quantity: 1 }] })
        }
        get().calculateTotal()
      },

      removeFromCart: (productId) => {
        set({ items: get().items.filter((item) => item._id !== productId) })
        get().calculateTotal()
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(productId)
        } else {
          set({
            items: get().items.map((item) =>
              item._id === productId ? { ...item, quantity } : item
            ),
          })
          get().calculateTotal()
        }
      },

      calculateTotal: () => {
        const total = get().items.reduce((sum, item) => sum + item.price * item.quantity, 0)
        set({ total: parseFloat(total.toFixed(2)) })
      },

      clearCart: () => {
        set({ items: [], total: 0 })
      },

      getCartCount: () => get().items.reduce((count, item) => count + item.quantity, 0),
    }),
    {
      name: 'cart-storage',
    }
  )
)

export const useProductStore = create((set, get) => ({
  products: [],
  categories: [],
  loading: false,
  error: null,

  fetchProducts: async () => {
    set({ loading: true })
    try {
      const response = await axios.get(`${API_BASE_URL}/products`)
      set({ products: response.data, loading: false })
    } catch (error) {
      set({ error: error.message, loading: false })
    }
  },

  fetchCategories: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/categories`)
      set({ categories: response.data })
    } catch (error) {
      set({ error: error.message })
    }
  },

  getProductsByCategory: (categoryId) => {
    return get().products.filter((product) => product.category === categoryId)
  },

  searchProducts: (query) => {
    return get().products.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    )
  },
}))

export const useOrderStore = create((set, get) => ({
  orders: [],
  loading: false,
  error: null,

  createOrder: async (orderData) => {
    set({ loading: true })
    try {
      const response = await axios.post(`${API_BASE_URL}/orders`, orderData)
      set({ orders: [...get().orders, response.data], loading: false })
      return { success: true, order: response.data }
    } catch (error) {
      set({ error: error.response?.data?.message || 'Order creation failed', loading: false })
      return { success: false, error: error.response?.data?.message }
    }
  },

  fetchOrders: async () => {
    set({ loading: true })
    try {
      const response = await axios.get(`${API_BASE_URL}/orders`)
      set({ orders: response.data, loading: false })
    } catch (error) {
      set({ error: error.message, loading: false })
    }
  },
}))
