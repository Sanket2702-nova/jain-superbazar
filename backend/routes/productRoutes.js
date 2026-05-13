import express from 'express'
import * as productController from '../controllers/productController.js'
import authenticateToken from '../middleware/auth.js'

const router = express.Router()

router.get('/', productController.getProducts)
router.get('/:id', productController.getProductById)
router.post('/', authenticateToken, productController.createProduct)
router.put('/:id', authenticateToken, productController.updateProduct)
router.delete('/:id', authenticateToken, productController.deleteProduct)

export default router
