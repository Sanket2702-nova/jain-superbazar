const staticProducts = [
  { _id: 'prod1', name: 'Organic Red Apples', description: 'Fresh, shiny organic red apples.', price: 120, originalPrice: 150, image: '/images/prod_apples.png', category: 'cat1', stock: 50, rating: 4.8, discount: 20 },
  { _id: 'prod2', name: 'Fresh Organic Spinach', description: 'Crisp green organic spinach leaves.', price: 40, originalPrice: 50, image: '/images/prod_spinach.png', category: 'cat2', stock: 100, rating: 4.7, discount: 20 },
  { _id: 'prod3', name: 'Farm Fresh Whole Milk', description: '1 Liter glass bottle of fresh organic whole milk.', price: 80, originalPrice: 90, image: '/images/prod_milk.png', category: 'cat3', stock: 30, rating: 4.9, discount: 11 },
  { _id: 'prod4', name: 'Artisan Whole Wheat Bread', description: 'Freshly baked whole wheat artisanal bread sliced perfectly.', price: 60, originalPrice: 60, image: '/images/prod_bread.png', category: 'cat4', stock: 40, rating: 4.6, discount: 0 },
  { _id: 'prod5', name: 'Premium Strawberries', description: 'Sweet and juicy strawberries.', price: 200, originalPrice: 250, image: '/images/cat_fruits.png', category: 'cat1', stock: 25, rating: 4.9, discount: 20 },
  { _id: 'prod6', name: 'Farm Carrots', description: 'Crunchy orange carrots.', price: 30, originalPrice: 40, image: '/images/cat_vegetables.png', category: 'cat2', stock: 80, rating: 4.5, discount: 25 },
  { _id: 'prod7', name: 'Organic Cheese Wedges', description: 'Aged Cheddar cheese.', price: 350, originalPrice: 400, image: '/images/cat_dairy.png', category: 'cat3', stock: 15, rating: 4.8, discount: 12 },
  { _id: 'prod8', name: 'Butter Croissant', description: 'Flaky and buttery French croissants.', price: 45, originalPrice: 50, image: '/images/cat_bakery.png', category: 'cat4', stock: 60, rating: 4.7, discount: 10 }
];

export const getProducts = async (req, res) => {
  try {
    const { category, search } = req.query
    let results = staticProducts;

    if (category) {
      results = results.filter(p => p.category === category);
    }

    if (search) {
      results = results.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
    }

    res.json(results)
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch products', error: error.message })
  }
}

export const getProductById = async (req, res) => {
  try {
    const product = staticProducts.find(p => p._id === req.params.id)
    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }
    res.json(product)
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch product', error: error.message })
  }
}

export const createProduct = async (req, res) => {
  res.status(201).json({ ...req.body, _id: 'new_prod_' + Date.now() })
}

export const updateProduct = async (req, res) => {
  res.json({ ...req.body, _id: req.params.id })
}

export const deleteProduct = async (req, res) => {
  res.json({ message: 'Product deleted successfully' })
}
