// In-memory mock for orders to bypass MongoDB
let mockOrders = [];

export const createOrder = async (req, res) => {
  try {
    const { items, deliveryAddress, total, paymentMethod } = req.body

    const order = {
      _id: 'order_' + Date.now(),
      user: req.user.id,
      items, // Simplified
      deliveryAddress,
      total,
      paymentMethod,
      status: 'pending',
      createdAt: new Date().toISOString()
    }

    mockOrders.push(order)

    res.status(201).json(order)
  } catch (error) {
    res.status(500).json({ message: 'Failed to create order', error: error.message })
  }
}

export const getOrders = async (req, res) => {
  try {
    const orders = mockOrders.filter(o => o.user === req.user.id)
    res.json(orders)
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch orders', error: error.message })
  }
}

export const getOrderById = async (req, res) => {
  try {
    const order = mockOrders.find(o => o._id === req.params.id)

    if (!order) {
      return res.status(404).json({ message: 'Order not found' })
    }

    // Check if user owns this order
    if (order.user !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' })
    }

    res.json(order)
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch order', error: error.message })
  }
}

export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body
    
    const orderIndex = mockOrders.findIndex(o => o._id === req.params.id)

    if (orderIndex === -1) {
      return res.status(404).json({ message: 'Order not found' })
    }

    mockOrders[orderIndex].status = status

    res.json(mockOrders[orderIndex])
  } catch (error) {
    res.status(500).json({ message: 'Failed to update order', error: error.message })
  }
}

export const cancelOrder = async (req, res) => {
  try {
    const orderIndex = mockOrders.findIndex(o => o._id === req.params.id)

    if (orderIndex === -1) {
      return res.status(404).json({ message: 'Order not found' })
    }
    
    mockOrders[orderIndex].status = 'cancelled'

    res.json({ message: 'Order cancelled successfully', order: mockOrders[orderIndex] })
  } catch (error) {
    res.status(500).json({ message: 'Failed to cancel order', error: error.message })
  }
}
