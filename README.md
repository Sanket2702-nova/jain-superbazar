# Jain Super Bazar - Full Stack E-Commerce Grocery Store

A modern, production-ready e-commerce platform for grocery shopping built with React, Tailwind CSS, Node.js, Express, and MongoDB.

## 🎯 Features

### Frontend Features
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Red and white modern UI with Tailwind CSS
- ✅ User authentication (Login/Register)
- ✅ Product browsing and search
- ✅ Category-based filtering
- ✅ Shopping cart management
- ✅ Checkout process
- ✅ Order creation
- ✅ Toast notifications
- ✅ Loading states
- ✅ Smooth animations

### Backend Features
- ✅ User authentication with JWT
- ✅ RESTful API design
- ✅ Product management (CRUD)
- ✅ Category management
- ✅ Order management
- ✅ MongoDB database integration
- ✅ Password hashing with bcrypt
- ✅ Error handling
- ✅ Input validation

## 📁 Project Structure

```
website jsb/
├── frontend/                 # React + Tailwind CSS
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/           # Page components
│   │   ├── store/           # Zustand store (state management)
│   │   ├── utils/           # Helper functions
│   │   ├── assets/          # Images and icons
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── .env.example
│
└── backend/                 # Node.js + Express + MongoDB
    ├── controllers/         # Business logic
    ├── models/              # Database models
    ├── routes/              # API routes
    ├── middleware/          # Custom middleware
    ├── scripts/
    │   └── seed.js          # Database seeding
    ├── server.js            # Express server
    ├── package.json
    └── .env.example
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env` file:**
   ```bash
   cp .env.example .env
   ```

4. **Update `.env` with your MongoDB URI:**
   ```env
   MONGODB_URI=mongodb://localhost:27017/jain-super-bazar
   PORT=5000
   JWT_SECRET=your_secret_key_here
   NODE_ENV=development
   ```

5. **Seed the database with sample data:**
   ```bash
   npm run seed
   ```

6. **Start the server:**
   ```bash
   npm run dev
   ```
   Server will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env` file:**
   ```bash
   cp .env.example .env
   ```

4. **Update `.env` if needed:**
   ```env
   VITE_API_BASE_URL=http://localhost:5000/api
   ```

5. **Start the development server:**
   ```bash
   npm run dev
   ```
   Frontend will run on `http://localhost:3000`

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Register
```
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}

Response:
{
  "message": "Registration successful",
  "token": "jwt_token",
  "user": {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### Login
```
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response:
{
  "message": "Login successful",
  "token": "jwt_token",
  "user": {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### Product Endpoints

#### Get All Products
```
GET /products
GET /products?category=category_id
GET /products?search=tomato

Response: Array of products
```

#### Get Product by ID
```
GET /products/product_id

Response: Single product object
```

#### Create Product (Admin)
```
POST /products
Authorization: Bearer token
Content-Type: application/json

{
  "name": "Product Name",
  "description": "Description",
  "price": 100,
  "originalPrice": 150,
  "image": "image_url",
  "category": "category_id",
  "stock": 50,
  "rating": 4.5,
  "discount": 20
}
```

### Category Endpoints

#### Get All Categories
```
GET /categories

Response: Array of categories
```

#### Get Category by ID
```
GET /categories/category_id

Response: Single category object
```

### Order Endpoints

#### Create Order
```
POST /orders
Authorization: Bearer token
Content-Type: application/json

{
  "items": [
    {
      "product": "product_id",
      "quantity": 2,
      "price": 100
    }
  ],
  "deliveryAddress": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890",
    "address": "123 Street",
    "city": "City",
    "postalCode": "12345"
  },
  "total": 250,
  "paymentMethod": "cod"
}
```

#### Get All Orders
```
GET /orders
Authorization: Bearer token

Response: Array of user's orders
```

#### Get Order by ID
```
GET /orders/order_id
Authorization: Bearer token

Response: Single order object
```

## 💾 Database Models

### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  phone: String,
  address: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Category Model
```javascript
{
  name: String (unique),
  image: String,
  description: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Product Model
```javascript
{
  name: String,
  description: String,
  price: Number,
  originalPrice: Number,
  image: String,
  category: ObjectId (ref: Category),
  stock: Number,
  rating: Number,
  discount: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### Order Model
```javascript
{
  user: ObjectId (ref: User),
  items: [
    {
      product: ObjectId (ref: Product),
      quantity: Number,
      price: Number
    }
  ],
  deliveryAddress: {
    name: String,
    email: String,
    phone: String,
    address: String,
    city: String,
    postalCode: String
  },
  total: Number,
  paymentMethod: String (cod, online),
  status: String (pending, confirmed, shipped, delivered, cancelled),
  orderNumber: String (unique),
  createdAt: Date,
  updatedAt: Date
}
```

## 🔐 Demo Credentials

After seeding the database, use these credentials to login:

```
Email: demo@example.com
Password: password123
```

Or create a new account by registering.

## 🛠️ Tech Stack

### Frontend
- **React** - UI library
- **Tailwind CSS** - Styling
- **Vite** - Build tool
- **React Router DOM** - Navigation
- **Zustand** - State management
- **Axios** - HTTP client
- **React Toastify** - Notifications

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing

## 📝 Available Scripts

### Frontend
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

### Backend
```bash
npm run dev      # Start with nodemon (development)
npm start        # Start server
npm run seed     # Seed database with sample data
```

## 🎨 UI Features

- **Navbar** - Sticky navigation with search, cart, and auth
- **Hero Section** - Eye-catching banner with CTAs
- **Category Cards** - Grid layout with hover effects
- **Product Cards** - Image, price, rating, and add to cart button
- **Cart Page** - Item management with quantity controls
- **Checkout** - Form validation and order summary
- **Auth Pages** - Login/Register with validation
- **Footer** - Links and contact information
- **Toast Notifications** - User feedback for actions
- **Loading States** - Spinners while fetching data
- **Responsive Design** - Mobile-first approach

## 🔑 Key Features Implemented

### State Management
- User authentication state
- Cart state with add/remove/update operations
- Product and category data
- Order management

### Form Validation
- Email validation
- Password validation
- Checkout form validation
- Real-time error messages

### Authentication
- JWT-based authentication
- Password hashing with bcrypt
- Protected routes
- User session persistence

### API Integration
- RESTful endpoints
- Error handling
- Loading states
- Request/response formatting

## 📱 Responsive Breakpoints

- **Mobile** - 320px to 640px
- **Tablet** - 641px to 1024px
- **Desktop** - 1025px and above

## 🚨 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check MongoDB URI in `.env`
- Verify database name

### CORS Error
- Backend `cors` middleware is enabled
- Ensure frontend URL is accessible

### Token Expired
- Login again to get a new token
- Token expires in 7 days

### Port Already in Use
- Change ports in `.env` (backend) or modify Vite config (frontend)

## 📈 Future Enhancements

- Admin dashboard for management
- Payment gateway integration (Stripe, Razorpay)
- Advanced search and filters
- User reviews and ratings
- Wishlist functionality
- Notification system
- Analytics and reporting
- Email notifications
- SMS notifications
- Real-time order tracking
- Multiple language support

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💼 Support

For issues, questions, or suggestions, please create an issue in the repository.

---

**Happy Shopping! 🛒**
