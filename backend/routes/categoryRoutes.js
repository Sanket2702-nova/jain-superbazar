import express from 'express'
import * as categoryController from '../controllers/categoryController.js'
import authenticateToken from '../middleware/auth.js'

const router = express.Router()

router.get('/', categoryController.getCategories)
router.get('/:id', categoryController.getCategoryById)
router.post('/', authenticateToken, categoryController.createCategory)
router.put('/:id', authenticateToken, categoryController.updateCategory)
router.delete('/:id', authenticateToken, categoryController.deleteCategory)

export default router
