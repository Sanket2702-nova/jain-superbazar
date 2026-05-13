import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore, useCartStore, useOrderStore } from '../store/authStore'
import CheckoutForm from '../components/CheckoutForm'
import { showToast } from '../utils/helpers'
import { formatPrice } from '../utils/helpers'

const Checkout = () => {
  const navigate = useNavigate()
  const { isAuthenticated, user } = useAuthStore()
  const { items, total, clearCart } = useCartStore()
  const { createOrder, loading } = useOrderStore()
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [orderData, setOrderData] = useState(null)

  useEffect(() => {
    if (!isAuthenticated) {
      showToast('Please login to checkout', 'error')
      navigate('/login')
    }

    if (items.length === 0) {
      showToast('Your cart is empty', 'error')
      navigate('/cart')
    }
  }, [isAuthenticated, items])

  const handleCheckoutSubmit = async (formData) => {
    setOrderData(formData)

    if (formData.paymentMethod === 'online') {
      setShowPaymentModal(true)
    } else {
      await submitOrder(formData)
    }
  }

  const submitOrder = async (formData) => {
    const orderPayload = {
      user: user._id,
      items: items.map((item) => ({
        product: item._id,
        quantity: item.quantity,
        price: item.price,
      })),
      total: total * 1.05, // Including 5% tax
      deliveryAddress: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        postalCode: formData.postalCode,
      },
      paymentMethod: formData.paymentMethod,
      status: 'pending',
    }

    const result = await createOrder(orderPayload)

    if (result.success) {
      clearCart()
      showToast('Order placed successfully!', 'success')
      setTimeout(() => {
        navigate(`/order-confirmation/${result.order._id}`)
      }, 1000)
    } else {
      showToast(result.error || 'Failed to place order', 'error')
    }
  }

  const handlePaymentSuccess = () => {
    setShowPaymentModal(false)
    submitOrder(orderData)
  }

  if (!isAuthenticated || items.length === 0) {
    return null
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2">
          <CheckoutForm
            onSubmit={handleCheckoutSubmit}
            loading={loading}
            cartTotal={total}
          />
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-lg shadow-md p-6 h-fit sticky top-20">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>

          <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
            {items.map((item) => (
              <div key={item._id} className="flex justify-between text-sm">
                <span className="text-gray-700">
                  {item.name} × {item.quantity}
                </span>
                <span className="font-semibold">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-200 pt-4 space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-700">Subtotal</span>
              <span className="font-semibold">{formatPrice(total)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">Delivery</span>
              <span className="font-semibold text-green-600">FREE</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">Tax (5%)</span>
              <span className="font-semibold">{formatPrice(total * 0.05)}</span>
            </div>
            <div className="flex justify-between text-lg pt-4 border-t border-gray-200">
              <span className="font-bold">Total</span>
              <span className="font-bold text-primary">
                {formatPrice(total * 1.05)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Payment Gateway</h2>
            <p className="text-gray-600 mb-6">
              Simulated online payment for {orderData?.name}
            </p>

            <div className="space-y-4 mb-6">
              <button
                onClick={handlePaymentSuccess}
                className="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition"
              >
                ✓ Payment Successful
              </button>
              <button
                onClick={() => setShowPaymentModal(false)}
                className="w-full bg-gray-300 text-gray-800 font-bold py-3 rounded-lg hover:bg-gray-400 transition"
              >
                ✕ Cancel Payment
              </button>
            </div>

            <p className="text-xs text-gray-500 text-center">
              Note: This is a simulated payment gateway for demonstration.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Checkout
