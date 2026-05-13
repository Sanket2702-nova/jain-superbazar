# Quick Start Guide - Jain Super Bazar

## 🚀 Get Up and Running in 5 Minutes!

### Prerequisites
- Node.js (v16+)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

---

## Step 1: Setup Backend (2 minutes)

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Update .env with your MongoDB URI
# Default: mongodb://localhost:27017/jain-super-bazar

# Seed database with sample data
npm run seed

# Start backend server
npm run dev
```

✅ Backend running on `http://localhost:5000`

---

## Step 2: Setup Frontend (2 minutes)

In a **new terminal**:

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Start development server
npm run dev
```

✅ Frontend running on `http://localhost:3000`

---

## Step 3: Login & Test (1 minute)

Open `http://localhost:3000` in your browser

**Demo Credentials:**
- Email: `demo@example.com`
- Password: `password123`

Or register a new account!

---

## 📱 Test Features

1. **Home Page** - See hero banner and featured products
2. **Browse Products** - Check out all categories and products
3. **Add to Cart** - Add items to shopping cart
4. **Checkout** - Complete the checkout process
5. **Orders** - View your orders

---

## 🛠️ Useful Commands

### Backend
```bash
npm run dev      # Start server (with auto-reload)
npm start        # Start server normal
npm run seed     # Populate database
```

### Frontend
```bash
npm run dev      # Start development server
npm run build    # Create production build
npm run preview  # Preview production build
```

---

## 📊 Sample Data

After seeding, you'll have:
- **6 Categories** - Grocery, Pickle, Biscuit, Namkeen, Soap, Detergent
- **19 Products** - Various items with prices and ratings
- **2 Users** - Demo accounts for testing

---

## ⚠️ Troubleshooting

### Port Already in Use
```bash
# Kill process on port 5000 (backend)
lsof -i :5000 | grep LISTEN | awk '{print $2}' | xargs kill -9

# Frontend uses 3000 (change in vite.config.js if needed)
```

### MongoDB Connection Error
- Ensure MongoDB is running: `mongosh`
- Or use MongoDB Atlas (cloud)
- Check URI in `.env`

### API 404 Errors
- Ensure backend is running on port 5000
- Check browser console for actual error
- Reload frontend page

---

## 🎨 UI Tour

- **Navbar** - Navigation, search, cart, login
- **Hero** - Eye-catching banner with CTAs
- **Categories** - Grid of product categories
- **Products** - Responsive product cards
- **Cart** - Add, remove, update quantities
- **Checkout** - Form with validation
- **Orders** - Track your purchases

---

## 📚 Full Documentation

- [Main README](./README.md)
- [Frontend Guide](./frontend/README.md)
- [Backend Guide](./backend/README.md)

---

## 🎉 You're All Set!

Start building and testing! 🚀

For detailed information, check the documentation files.

---

**Need help?** Check the README.md files or review error messages in browser console and terminal.
