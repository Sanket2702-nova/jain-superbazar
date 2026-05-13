# Backend Setup Guide

## Overview
The backend is built with Node.js, Express, and MongoDB, providing a robust RESTful API for the Jain Super Bazar e-commerce platform.

## Installation

### Step 1: Install Dependencies
```bash
cd backend
npm install
```

### Step 2: Configure Environment
Create a `.env` file in the backend directory:
```bash
cp .env.example .env
```

Update with your configuration:
```env
MONGODB_URI=mongodb://localhost:27017/jain-super-bazar
PORT=5000
JWT_SECRET=your_secret_key_change_in_production
NODE_ENV=development
```

### Step 3: Seed Database
```bash
npm run seed
```

This will populate the database with:
- 6 categories (Grocery, Pickle, Biscuit, Namkeen, Soap, Detergent)
- 19 sample products
- 2 demo users

### Step 4: Start Server
```bash
npm run dev
```

Server will run on `http://localhost:5000`

## Project Structure

```
backend/
├── controllers/
│   ├── authController.js      - Authentication logic
│   ├── productController.js   - Product CRUD operations
│   ├── categoryController.js  - Category management
│   └── orderController.js     - Order management
├── models/
│   ├── User.js                - User schema
│   ├── Product.js             - Product schema
│   ├── Category.js            - Category schema
│   └── Order.js               - Order schema
├── routes/
│   ├── authRoutes.js          - Auth endpoints
│   ├── productRoutes.js       - Product endpoints
│   ├── categoryRoutes.js      - Category endpoints
│   └── orderRoutes.js         - Order endpoints
├── middleware/
│   └── auth.js                - JWT authentication
├── scripts/
│   └── seed.js                - Database seeding script
├── server.js                  - Express server setup
└── package.json
```

## Available Scripts

```bash
npm run dev      # Start server with nodemon (auto-restart)
npm start        # Start server normally
npm run seed     # Seed database with sample data
```

## Database Models

### User
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed with bcrypt),
  phone: String,
  address: String,
  timestamps: true
}
```

### Category
```javascript
{
  name: String (unique),
  image: String,
  description: String,
  timestamps: true
}
```

### Product
```javascript
{
  name: String,
  description: String,
  price: Number,
  originalPrice: Number,
  image: String,
  category: ObjectId (ref: 'Category'),
  stock: Number,
  rating: Number,
  discount: Number,
  timestamps: true
}
```

### Order
```javascript
{
  user: ObjectId (ref: 'User'),
  items: [{
    product: ObjectId (ref: 'Product'),
    quantity: Number,
    price: Number
  }],
  deliveryAddress: {
    name: String,
    email: String,
    phone: String,
    address: String,
    city: String,
    postalCode: String
  },
  total: Number,
  paymentMethod: String ('cod' or 'online'),
  status: String ('pending', 'confirmed', 'shipped', 'delivered', 'cancelled'),
  orderNumber: String (unique),
  timestamps: true
}
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)
- `PUT /api/auth/profile` - Update user profile (protected)

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product (protected)
- `PUT /api/products/:id` - Update product (protected)
- `DELETE /api/products/:id` - Delete product (protected)

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get category by ID
- `POST /api/categories` - Create category (protected)
- `PUT /api/categories/:id` - Update category (protected)
- `DELETE /api/categories/:id` - Delete category (protected)

### Orders
- `POST /api/orders` - Create order (protected)
- `GET /api/orders` - Get user orders (protected)
- `GET /api/orders/:id` - Get order by ID (protected)
- `PUT /api/orders/:id/status` - Update order status (protected)
- `PUT /api/orders/:id/cancel` - Cancel order (protected)

### Health Check
- `GET /api/health` - Server health check

## Authentication

### JWT Implementation
- Tokens expire in 7 days
- Token is sent in Authorization header: `Bearer token`
- Protected routes require valid token

### Password Security
- Passwords hashed with bcryptjs
- 10-round salt
- Never returned in response

## Database Configuration

### Local MongoDB
```env
MONGODB_URI=mongodb://localhost:27017/jain-super-bazar
```

### MongoDB Atlas (Cloud)
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/jain-super-bazar
```

## Error Handling

The API returns consistent error responses:
```json
{
  "message": "Error description",
  "error": "Detailed error message"
}
```

Status codes:
- `201` - Created successfully
- `400` - Bad request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not found
- `500` - Server error

## CORS Configuration

CORS is enabled for all origins in development:
```javascript
app.use(cors())
```

For production, restrict origins:
```javascript
app.use(cors({
  origin: 'https://yourdomain.com'
}))
```

## Demo Credentials

Email: `demo@example.com`
Password: `password123`

## Deployment

### Heroku
1. Create `Procfile`:
   ```
   web: npm start
   ```

2. Set environment variables on Heroku

3. Deploy:
   ```bash
   git push heroku main
   ```

### MongoDB Atlas
1. Create cluster on MongoDB Atlas
2. Get connection string
3. Update `MONGODB_URI` in environment variables

## Troubleshooting

### MongoDB Connection Failed
- Ensure MongoDB is running
- Check connection string in `.env`
- Verify network access (if using Atlas)

### Port Already in Use
- Change PORT in `.env`
- Or kill process on port: `lsof -i :5000` (Mac/Linux)

### Seeding Failed
- Ensure MongoDB is running
- Clear existing collections first
- Check MongoDB Atlas network access

### JWT Errors
- Token expired: Ask user to login again
- Invalid token: Check token format and SECRET key
- Missing token: Include Authorization header

## Performance Optimization

- Index database queries
- Implement pagination for large datasets
- Add response caching
- Use compression middleware
- Monitor database performance

## Security Considerations

- Keep JWT_SECRET secure
- Validate all inputs
- Use HTTPS in production
- Implement rate limiting
- Regular security audits
- Update dependencies regularly

---

**For more information, see the main [README.md](../README.md)**
