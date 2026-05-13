// Loading Spinner Component
export const LoadingSpinner = () => (
  <div className="flex justify-center items-center py-12">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
  </div>
)

// Empty State Component
export const EmptyState = ({ message = 'No items found' }) => (
  <div className="text-center py-12">
    <p className="text-gray-500 text-lg">{message}</p>
  </div>
)

// Error State Component
export const ErrorState = ({ message = 'Something went wrong', onRetry }) => (
  <div className="text-center py-12">
    <p className="text-red-500 text-lg mb-4">{message}</p>
    {onRetry && (
      <button
        onClick={onRetry}
        className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-rose-700 transition"
      >
        Try Again
      </button>
    )}
  </div>
)
