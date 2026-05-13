import React, { useEffect, useState } from 'react'
import { showToast } from '../../utils/helpers'

const AdminOrders = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('auth_token')
      const response = await fetch('http://localhost:5000/api/orders', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const data = await response.json()
      setOrders(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Error fetching orders:', error)
      showToast('Failed to fetch orders', 'error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  const updateOrderStatus = async (orderId, newStatus) => {
    const token = localStorage.getItem('auth_token')
    try {
      const response = await fetch(`http://localhost:5000/api/orders/${orderId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      })

      if (response.ok) {
        showToast('Order status updated!', 'success')
        fetchOrders()
      } else {
        showToast('Failed to update order', 'error')
      }
    } catch (error) {
      console.error('Error:', error)
      showToast('Error updating order', 'error')
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-700'
      case 'confirmed': return 'bg-blue-100 text-blue-700'
      case 'shipped': return 'bg-purple-100 text-purple-700'
      case 'delivered': return 'bg-green-100 text-green-700'
      case 'cancelled': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div>
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Orders</h3>

      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">Loading orders...</p>
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">No orders found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map(order => (
            <div key={order._id} className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-slate-700 dark:to-slate-800 p-6 rounded-xl border border-gray-200 dark:border-slate-600 hover:shadow-lg transition-all duration-300">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center mb-4">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Order ID</p>
                  <p className="font-mono text-sm font-bold text-gray-900 dark:text-white">{order._id?.slice(-8)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Total</p>
                  <p className="text-lg font-bold text-primary">₹{order.total || 0}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Date</p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Status</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(order.status || 'pending')}`}>
                    {order.status || 'pending'}
                  </span>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Items</p>
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">{order.items?.length || 0} items</p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">Items</p>
                <div className="space-y-1">
                  {order.items?.map((item, index) => (
                    <p key={index} className="text-sm text-gray-700 dark:text-gray-300">
                      • {item.name} x {item.quantity} = ₹{(item.price * item.quantity).toFixed(2)}
                    </p>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 flex-wrap">
                {['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'].map(status => (
                  <button
                    key={status}
                    onClick={() => updateOrderStatus(order._id, status)}
                    className={`px-3 py-1 text-xs font-bold rounded-lg transition-all duration-300 ${
                      order.status === status
                        ? 'bg-primary text-white shadow-lg'
                        : 'bg-gray-200 dark:bg-slate-600 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-slate-500'
                    }`}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AdminOrders
