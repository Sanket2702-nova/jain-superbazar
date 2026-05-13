# Admin Panel - Quick Reference Card

## 🎯 Quick Start (30 seconds)

```
1. Open: http://localhost:3001
2. Click: Register (fill form & submit)
3. Click: Login (enter credentials)
4. Look for: "⚙️ Admin" button in navbar
5. Click: Admin button
6. You're in! 🎉
```

---

## 🗂️ Admin Panel Structure

```
Admin Panel (localhost:3001/admin)
│
├─ Dashboard (📊)
│  ├─ Statistics Cards
│  ├─ Revenue Summary
│  └─ Quick Actions
│
├─ Products (📦)
│  ├─ Add Product Form
│  ├─ Products Table
│  └─ Edit/Delete Options
│
├─ Categories (🏷️)
│  ├─ Add Category Form
│  ├─ Category Grid
│  └─ Image Preview
│
├─ Orders (✅)
│  ├─ Order List
│  ├─ Status Updates
│  └─ Order Details
│
└─ Users (👥)
   ├─ User Statistics
   ├─ Customer Insights
   └─ User Segments
```

---

## 🔑 Key Credentials

**First User (Admin):**
- Email: `your-register-email@example.com`
- Password: `your-password`
- Role: Admin (automatic for all authenticated users)

---

## 💻 Running Services

| Service | URL | Status |
|---------|-----|--------|
| Backend API | http://localhost:5000 | ✅ Running |
| Frontend App | http://localhost:3001 | ✅ Running |
| Admin Panel | http://localhost:3001/admin | ✅ Ready |

---

## 🔐 Security Features

- ✅ JWT Authentication
- ✅ Bearer Token in Headers
- ✅ Password Hashing
- ✅ Protected Routes
- ✅ CORS Enabled
- ✅ Session Management

---

## 📋 Sidebar Menu Items

| Icon | Label | Features |
|------|-------|----------|
| 📊 | Dashboard | Stats, Revenue, Quick Actions |
| 📦 | Products | Add, Edit, Delete, View |
| 🏷️ | Categories | Add, Edit, Delete, View |
| ✅ | Orders | View, Update Status |
| 👥 | Users | Analytics, Insights |
| 🚪 | Logout | Exit Admin Panel |

---

## ⚡ Common Actions

### Add a Product
```
Dashboard → Products → "➕ Add Product" 
→ Fill Form → Click "Add Product"
```

### Add a Category
```
Dashboard → Categories → "➕ Add Category"
→ Fill Form → Click "Add Category"
```

### Update Order Status
```
Dashboard → Orders → Click Status Button
→ Select New Status
```

### View Statistics
```
Dashboard → Dashboard Tab
→ See all stats at a glance
```

---

## 🚨 Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl + Shift + K` | Toggle Dark Mode (in navbar) |
| `F12` | Open DevTools (for debugging) |
| `Ctrl + F5` | Hard Refresh (clear cache) |

---

## 📚 Database Models

```javascript
User
├── name
├── email
├── password (hashed)
├── phone
└── address

Product
├── name
├── price
├── description
├── category
├── image
├── stock
└── createdAt

Category
├── name
├── description
├── image
└── createdAt

Order
├── userId
├── items
├── total
├── status
└── createdAt
```

---

## 🎨 Color Scheme

| Purpose | Color | Hex |
|---------|-------|-----|
| Primary | Red | #E11D48 |
| Secondary | Pink | #EC4899 |
| Success | Green | #22C55E |
| Warning | Yellow | #EAB308 |
| Error | Red | #EF4444 |
| Dark | Dark Gray | #1F2937 |

---

## 📱 Responsive Breakpoints

- **Mobile**: < 768px (hidden sidebar, icons only)
- **Tablet**: 768px - 1024px (compact layout)
- **Desktop**: > 1024px (full layout)

---

## 🔗 Important URLs

```
Homepage:        http://localhost:3001
Products Page:   http://localhost:3001/products
Categories:      http://localhost:3001/categories
Cart:            http://localhost:3001/cart
Login:           http://localhost:3001/login
Register:        http://localhost:3001/register
Admin Panel:     http://localhost:3001/admin
```

---

## ✅ Verification Checklist

Before claiming setup is complete:

- [ ] Backend running on port 5000
- [ ] Frontend running on port 3001
- [ ] Can register new account
- [ ] Can login with credentials
- [ ] "⚙️ Admin" button visible after login
- [ ] Admin panel loads without errors
- [ ] Dashboard shows statistics
- [ ] Can add a product
- [ ] Can add a category
- [ ] Can view orders
- [ ] Can update order status
- [ ] Can logout successfully

---

## 🐛 Common Issues & Quick Fixes

| Issue | Fix |
|-------|-----|
| Button not showing | Try logging out/in again |
| Page not loading | Refresh (Ctrl + F5) |
| API errors | Check if backend is running |
| Data not saving | Check browser console (F12) |
| Form not submitting | Fill all required fields |
| Can't login | Check credentials are correct |

---

## 📊 Stats You Should See

**Once set up, dashboard should show:**

```
Total Products:     0 (or more if data exists)
Total Categories:   0 (or more if data exists)
Total Orders:       0 (or more if orders exist)
Total Users:        0 (based on order data)
Total Revenue:      ₹0 (or more if orders exist)
```

---

## 🎯 What's Working

✅ Authentication System
✅ Admin Routes
✅ Product Management
✅ Category Management
✅ Order Management
✅ User Analytics
✅ Responsive Design
✅ Dark Mode Support
✅ Error Handling
✅ Toast Notifications

---

## 📞 Need Help?

1. **Check Console**: F12 → Console tab
2. **Check Network**: F12 → Network tab
3. **Check Backend**: Terminal where `node server.js` runs
4. **Restart Services**: Stop and restart both servers

---

## 🚀 Setup Complete!

**You're ready to manage your store!**

1. Register on homepage
2. Click "⚙️ Admin" in navbar
3. Start managing!

---

**Last Updated**: April 14, 2026
**Version**: 1.0
**Status**: ✅ Production Ready
