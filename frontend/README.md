# Frontend Setup Guide

## Overview
The frontend is built with React, Tailwind CSS, and Vite, providing a modern and responsive user interface for the Jain Super Bazar e-commerce platform.

## Installation

### Step 1: Install Dependencies
```bash
cd frontend
npm install
```

### Step 2: Configure Environment
Create a `.env` file in the frontend directory:
```bash
cp .env.example .env
```

Update the API base URL if needed:
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

### Step 3: Start Development Server
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx           - Navigation bar
│   │   ├── Footer.jsx           - Footer component
│   │   ├── CategoryCard.jsx      - Category display card
│   │   ├── ProductCard.jsx       - Product display card
│   │   ├── CartItem.jsx          - Cart item component
│   │   └── CheckoutForm.jsx      - Checkout form
│   ├── pages/
│   │   ├── Home.jsx             - Homepage
│   │   ├── Products.jsx         - Products listing
│   │   ├── Categories.jsx       - Categories page
│   │   ├── Cart.jsx             - Shopping cart
│   │   ├── Checkout.jsx         - Checkout page
│   │   ├── Login.jsx            - Login page
│   │   └── Register.jsx         - Registration page
│   ├── store/
│   │   └── authStore.js         - Zustand stores (auth, cart, products, orders)
│   ├── utils/
│   │   ├── helpers.js           - Helper functions
│   │   └── components.jsx       - Utility components
│   ├── assets/                  - Images and static files
│   ├── App.jsx                  - Main App component
│   ├── main.jsx                 - App entry point
│   └── index.css                - Global styles
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

## Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

## Components Overview

### Navbar
- Sticky navigation bar
- Logo and branding
- Search functionality
- Cart icon with item count
- Authentication buttons
- Mobile-responsive menu

### ProductCard
- Product image
- Product name and category
- Price with discount
- Rating display
- Add to cart button

### CartItem
- Product image and details
- Quantity controls
- Remove button
- Subtotal calculation

### CheckoutForm
- Personal information fields
- Delivery address form
- Payment method selection
- Form validation

## State Management (Zustand)

### useAuthStore
- User authentication
- Login/Register
- User profile
- Logout

### useCartStore
- Add/remove items
- Update quantity
- Calculate total
- Clear cart

### useProductStore
- Fetch products
- Fetch categories
- Filter by category
- Search products

### useOrderStore
- Create orders
- Fetch user orders
- Order management

## Key Features

### Authentication
- JWT-based authentication
- Persistent login (localStorage)
- Protected pages
- Form validation

### Shopping Cart
- Add/remove products
- Update quantity
- Calculate totals
- Persistent cart storage

### Checkout
- Multi-step form
- Address validation
- Payment method selection
- Order creation

### Product Browsing
- Category filtering
- Product search
- Product grid display
- Sorting and filtering

## Styling with Tailwind CSS

The project uses Tailwind CSS for all styling:
- Primary color: Red (#DC2626)
- Secondary color: White (#FFFFFF)
- Responsive design with breakpoints
- Custom animations and transitions

## Building for Production

```bash
npm run build
```

This creates an optimized production build in the `dist` directory.

To preview the production build:
```bash
npm run preview
```

## Troubleshooting

### API Connection Issues
- Ensure backend is running on port 5000
- Check `.env` file for correct API URL
- Check browser console for errors

### Styling Issues
- Clear browser cache
- Rebuild Tailwind CSS: `npm run build`

### State Issues
- Clear localStorage
- Refresh the page

## Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Tips
- Code splitting enabled by Vite
- Lazy loading for routes
- Image optimization
- Bundle analysis

---

**For more information, see the main [README.md](../README.md)**
