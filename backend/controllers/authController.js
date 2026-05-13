import jwt from 'jsonwebtoken'

// In-memory storage for users (development only)
let mockUsers = [
  {
    _id: 'admin_123',
    name: 'Master Admin',
    email: 'admin@jsb.com',
    password: 'admin123',
    phone: '9876543210',
    address: 'JSB Headquarters',
    createdAt: new Date()
  }
]

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key_development_only'

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body

    console.log('Register request:', { name, email, password })

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'All fields are required' })
    }

    if (password.length < 6) {
      return res.status(400).json({ success: false, message: 'Password must be at least 6 characters' })
    }

    // Check if user exists
    const existingUser = mockUsers.find(u => u.email === email)
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email already registered' })
    }

    // Create new user
    const user = {
      _id: 'user_' + Date.now(),
      name,
      email,
      password, // Plain text for development
      phone: '',
      address: '',
      createdAt: new Date()
    }

    mockUsers.push(user)
    console.log('User registered:', user._id)
    console.log('Total users:', mockUsers.length)

    // Generate JWT token
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: '7d',
    })

    const { password: _, ...userWithoutPassword } = user

    res.status(201).json({
      success: true,
      message: 'Registration successful',
      token,
      user: userWithoutPassword,
    })
  } catch (error) {
    console.error('Registration error:', error)
    res.status(500).json({ success: false, message: 'Registration failed', error: error.message })
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    console.log('Login request:', { email, password })
    console.log('Available users:', mockUsers.map(u => ({ email: u.email, id: u._id })))

    // Validation
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' })
    }

    // Find user
    const user = mockUsers.find(u => u.email === email)
    if (!user) {
      console.log('User not found:', email)
      return res.status(404).json({ success: false, message: 'User not found. Please register first.' })
    }

    // Compare password (simple string comparison for development)
    const isPasswordValid = user.password === password
    if (!isPasswordValid) {
      console.log('Invalid password for user:', email)
      return res.status(401).json({ success: false, message: 'Invalid password' })
    }

    console.log('Login successful for user:', email)

    // Generate JWT token
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: '7d',
    })

    const { password: _, ...userWithoutPassword } = user

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: userWithoutPassword,
    })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ success: false, message: 'Login failed', error: error.message })
  }
}

export const getProfile = async (req, res) => {
  try {
    const user = mockUsers.find(u => u._id === req.user.id)
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' })
    }
    const { password: _, ...userWithoutPassword } = user
    res.json(userWithoutPassword)
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch profile', error: error.message })
  }
}

export const updateProfile = async (req, res) => {
  try {
    const user = mockUsers.find(u => u._id === req.user.id)
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' })
    }
    
    const { name, phone, address } = req.body
    
    if (name) user.name = name
    if (phone) user.phone = phone
    if (address) user.address = address
    
    const { password: _, ...userWithoutPassword } = user
    res.json({ success: true, message: 'Profile updated', user: userWithoutPassword })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update profile', error: error.message })
  }
}
