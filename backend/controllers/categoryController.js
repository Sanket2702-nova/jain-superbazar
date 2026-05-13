const staticCategories = [
  { _id: 'cat1', name: 'Chips & Namkeens', image: '/images/cat_chips.png', description: '' },
  { _id: 'cat2', name: 'Ice Cream & Frozen', image: '/images/cat_icecream.png', description: '' },
  { _id: 'cat3', name: 'Biscuits & Cookies', image: '/images/cat_biscuits.png', description: '' },
  { _id: 'cat4', name: 'Chocolates & Candies', image: '/images/cat_chocolates.png', description: '' },
  { _id: 'cat5', name: 'Indian Sweets', image: '/images/cat_sweets.png', description: '' },
  { _id: 'cat6', name: 'Drinks & Juices', image: '/images/cat_drinks.png', description: '' },
  { _id: 'cat7', name: 'Breakfast Cereals', image: '/images/cat_cereals.png', description: '' },
  { _id: 'cat8', name: 'Noodles, Pasta', image: '/images/cat_noodles.png', description: '' },
  { _id: 'cat9', name: 'Ready To Cook', image: '/images/cat_ready.png', description: '' },
  { _id: 'cat10', name: 'Spread & Sauces', image: '/images/cat_sauces.png', description: '' },
  { _id: 'cat11', name: 'Pickles & Chutney', image: '/images/cat_pickles.png', description: '' },
  { _id: 'cat12', name: 'Tea & Coffee', image: '/images/cat_tea.png', description: '' }
];

export const getCategories = async (req, res) => {
  try {
    res.json(staticCategories)
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch categories', error: error.message })
  }
}

export const getCategoryById = async (req, res) => {
  try {
    const category = staticCategories.find(c => c._id === req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' })
    }
    res.json(category)
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch category', error: error.message })
  }
}

export const createCategory = async (req, res) => {
  res.status(201).json({ ...req.body, _id: 'new_cat_' + Date.now() })
}

export const updateCategory = async (req, res) => {
  res.json({ ...req.body, _id: req.params.id })
}

export const deleteCategory = async (req, res) => {
  res.json({ message: 'Category deleted successfully' })
}
