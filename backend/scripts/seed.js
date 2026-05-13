import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Category from '../models/Category.js'
import Product from '../models/Product.js'
import User from '../models/User.js'

dotenv.config()

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/jain-super-bazar')
    console.log('✓ MongoDB connected')
  } catch (error) {
    console.error('✗ MongoDB connection error:', error)
    process.exit(1)
  }
}

const seedCategories = async () => {
  const categories = [
    {
      name: 'Grocery',
      image: 'https://via.placeholder.com/150?text=Grocery',
      description: 'Fresh vegetables and staple groceries',
    },
    {
      name: 'Pickle',
      image: 'https://via.placeholder.com/150?text=Pickle',
      description: 'Traditional pickles and preserves',
    },
    {
      name: 'Biscuit',
      image: 'https://via.placeholder.com/150?text=Biscuit',
      description: 'Delicious biscuits and crackers',
    },
    {
      name: 'Namkeen',
      image: 'https://via.placeholder.com/150?text=Namkeen',
      description: 'Savory snacks and namkeen',
    },
    {
      name: 'Soap',
      image: 'https://via.placeholder.com/150?text=Soap',
      description: 'Personal care soaps',
    },
    {
      name: 'Detergent',
      image: 'https://via.placeholder.com/150?text=Detergent',
      description: 'Cleaning and laundry products',
    },
  ]

  return await Category.insertMany(categories)
}

const seedProducts = async () => {
  const categories = await Category.find()
  const categoryMap = {}
  categories.forEach((cat) => {
    categoryMap[cat.name] = cat._id
  })

  const products = [
    // Grocery
    {
      name: 'Fresh Tomatoes',
      description: 'Juicy red tomatoes, organically grown',
      price: 60,
      originalPrice: 80,
      image: 'https://via.placeholder.com/300?text=Tomatoes',
      category: categoryMap['Grocery'],
      stock: 100,
      rating: 4.5,
      discount: 25,
    },
    {
      name: 'Green Chillies',
      description: 'Fresh green chillies for cooking',
      price: 40,
      originalPrice: 50,
      image: 'https://via.placeholder.com/300?text=Green+Chillies',
      category: categoryMap['Grocery'],
      stock: 50,
      rating: 4.7,
      discount: 20,
    },
    {
      name: 'Onions',
      description: 'Premium quality onions',
      price: 50,
      originalPrice: 70,
      image: 'https://via.placeholder.com/300?text=Onions',
      category: categoryMap['Grocery'],
      stock: 150,
      rating: 4.3,
      discount: 28,
    },
    {
      name: 'Potatoes',
      description: 'Fresh potatoes direct from farm',
      price: 40,
      originalPrice: 60,
      image: 'https://via.placeholder.com/300?text=Potatoes',
      category: categoryMap['Grocery'],
      stock: 200,
      rating: 4.6,
      discount: 33,
    },
    // Pickle
    {
      name: 'Mango Pickle',
      description: 'Traditional sweet mango pickle',
      price: 180,
      originalPrice: 250,
      image: 'https://via.placeholder.com/300?text=Mango+Pickle',
      category: categoryMap['Pickle'],
      stock: 30,
      rating: 4.8,
      discount: 28,
    },
    {
      name: 'Lemon Pickle',
      description: 'Tangy lemon pickle',
      price: 150,
      originalPrice: 200,
      image: 'https://via.placeholder.com/300?text=Lemon+Pickle',
      category: categoryMap['Pickle'],
      stock: 40,
      rating: 4.6,
      discount: 25,
    },
    {
      name: 'Mixed Vegetable Pickle',
      description: 'Mix of vegetables in spiced oil',
      price: 160,
      originalPrice: 220,
      image: 'https://via.placeholder.com/300?text=Mixed+Vegetables',
      category: categoryMap['Pickle'],
      stock: 25,
      rating: 4.5,
      discount: 27,
    },
    // Biscuit
    {
      name: 'Marie Biscuits',
      description: 'Crispy, light and delicious biscuits',
      price: 80,
      originalPrice: 100,
      image: 'https://via.placeholder.com/300?text=Marie+Biscuits',
      category: categoryMap['Biscuit'],
      stock: 200,
      rating: 4.4,
      discount: 20,
    },
    {
      name: 'Digestive Biscuits',
      description: 'Healthy wholesome biscuits',
      price: 120,
      originalPrice: 150,
      image: 'https://via.placeholder.com/300?text=Digestive',
      category: categoryMap['Biscuit'],
      stock: 150,
      rating: 4.5,
      discount: 20,
    },
    {
      name: 'Chocolate Cookies',
      description: 'Delicious chocolate chip cookies',
      price: 100,
      originalPrice: 140,
      image: 'https://via.placeholder.com/300?text=Chocolate+Cookies',
      category: categoryMap['Biscuit'],
      stock: 100,
      rating: 4.7,
      discount: 28,
    },
    // Namkeen
    {
      name: 'Fried Moong Dal',
      description: 'Crunchy and salty fried moong dal',
      price: 200,
      originalPrice: 280,
      image: 'https://via.placeholder.com/300?text=Moong+Dal',
      category: categoryMap['Namkeen'],
      stock: 50,
      rating: 4.6,
      discount: 28,
    },
    {
      name: 'Chikhalwali Mix',
      description: 'Mix of various roasted snacks',
      price: 220,
      originalPrice: 300,
      image: 'https://via.placeholder.com/300?text=Chikhalwali',
      category: categoryMap['Namkeen'],
      stock: 40,
      rating: 4.5,
      discount: 26,
    },
    {
      name: 'Sev',
      description: 'Thin crispy savory snack',
      price: 180,
      originalPrice: 250,
      image: 'https://via.placeholder.com/300?text=Sev',
      category: categoryMap['Namkeen'],
      stock: 60,
      rating: 4.4,
      discount: 28,
    },
    // Soap
    {
      name: 'Glycerin Soap',
      description: 'Soft and moisturizing glycerin soap',
      price: 40,
      originalPrice: 60,
      image: 'https://via.placeholder.com/300?text=Glycerin+Soap',
      category: categoryMap['Soap'],
      stock: 100,
      rating: 4.4,
      discount: 33,
    },
    {
      name: 'Neem Soap',
      description: 'Medicinal neem soap for healthy skin',
      price: 50,
      originalPrice: 70,
      image: 'https://via.placeholder.com/300?text=Neem+Soap',
      category: categoryMap['Soap'],
      stock: 80,
      rating: 4.6,
      discount: 28,
    },
    {
      name: 'Aloe Vera Soap',
      description: 'Soothing aloe vera enriched soap',
      price: 60,
      originalPrice: 80,
      image: 'https://via.placeholder.com/300?text=Aloe+Vera',
      category: categoryMap['Soap'],
      stock: 70,
      rating: 4.7,
      discount: 25,
    },
    // Detergent
    {
      name: 'Laundry Detergent Powder',
      description: 'Strong cleaning detergent powder',
      price: 180,
      originalPrice: 250,
      image: 'https://via.placeholder.com/300?text=Detergent+Powder',
      category: categoryMap['Detergent'],
      stock: 50,
      rating: 4.5,
      discount: 28,
    },
    {
      name: 'Liquid Detergent',
      description: 'Gentle liquid detergent for clothes',
      price: 220,
      originalPrice: 300,
      image: 'https://via.placeholder.com/300?text=Liquid+Detergent',
      category: categoryMap['Detergent'],
      stock: 40,
      rating: 4.6,
      discount: 26,
    },
    {
      name: 'Dishwash Liquid',
      description: 'Effective dishwash liquid for clean dishes',
      price: 120,
      originalPrice: 160,
      image: 'https://via.placeholder.com/300?text=Dishwash',
      category: categoryMap['Detergent'],
      stock: 60,
      rating: 4.4,
      discount: 25,
    },
  ]

  return await Product.insertMany(products)
}

const seedUsers = async () => {
  const users = [
    {
      name: 'Demo User',
      email: 'demo@example.com',
      password: 'password123',
      phone: '1234567890',
      address: '123 Market Street',
    },
    {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
      phone: '9876543210',
      address: '456 Shopping Lane',
    },
  ]

  return await User.insertMany(users)
}

const seed = async () => {
  try {
    await connectDB()

    // Clear existing data
    await Category.deleteMany({})
    await Product.deleteMany({})
    await User.deleteMany({})

    console.log('✓ Cleared existing data')

    // Seed data
    const categories = await seedCategories()
    console.log(`✓ Created ${categories.length} categories`)

    const products = await seedProducts()
    console.log(`✓ Created ${products.length} products`)

    const users = await seedUsers()
    console.log(`✓ Created ${users.length} users`)

    console.log('\n✓ Database seeded successfully!')
    console.log('\nDemo Credentials:')
    console.log('Email: demo@example.com')
    console.log('Password: password123')

    process.exit(0)
  } catch (error) {
    console.error('✗ Seeding failed:', error.message)
    process.exit(1)
  }
}

seed()
