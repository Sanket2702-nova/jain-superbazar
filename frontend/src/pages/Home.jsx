import React, { useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useProductStore } from '../store/authStore'
import CategoryCard from '../components/CategoryCard'
import ProductCard from '../components/ProductCard'
import { LoadingSpinner, ErrorState } from '../utils/components'

// Swiper Imports
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-cube';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { EffectCube, Pagination, Navigation, Autoplay } from 'swiper/modules';

const Home = () => {
  const { products, categories, fetchProducts, fetchCategories, loading, error } = useProductStore()
  const navigate = useNavigate()
  const categoryScrollRef = useRef(null)
  const heroScrollRef = useRef(null)

  const scrollLeft = () => {
    if (categoryScrollRef.current) {
      categoryScrollRef.current.scrollBy({ left: -300, behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    if (categoryScrollRef.current) {
      categoryScrollRef.current.scrollBy({ left: 300, behavior: 'smooth' })
    }
  }

  const scrollHeroLeft = () => {
    if (heroScrollRef.current) {
      heroScrollRef.current.scrollLeft -= 400
    }
  }

  const scrollHeroRight = () => {
    if (heroScrollRef.current) {
      heroScrollRef.current.scrollLeft += 400
    }
  }

  useEffect(() => {
    fetchProducts()
    fetchCategories()
  }, [])

  const bestSellingProducts = products.slice(0, 8)
  const displayCategories = categories.slice(0, 6)
  const carouselImages = categories.slice(0, 6)

  return (
    <div>
      {/* Hero Banner - Scrollable */}
      <section className="relative bg-gradient-to-br from-red-500 via-red-600 to-red-700 text-white overflow-hidden py-12 lg:py-16 px-4 sm:px-6 lg:px-8 shadow-inner">
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-72 h-72 rounded-full bg-white opacity-10 blur-3xl mix-blend-overlay pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-yellow-300 opacity-20 blur-3xl mix-blend-overlay pointer-events-none"></div>
        
        {/* Left Arrow Button */}
        <button
          onClick={scrollHeroLeft}
          className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-40 bg-white/20 hover:bg-white/40 backdrop-blur-md text-white rounded-full p-3 transition-all flex-shrink-0"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Scrollable Hero Content */}
        <div
          ref={heroScrollRef}
          className="relative z-10 flex gap-8 overflow-x-auto scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] max-w-7xl mx-auto px-16 md:px-20"
        >
          {/* Hero Slide 1 */}
          <div className="flex-shrink-0 w-full md:w-4/5 lg:w-3/4 flex items-center rounded-3xl bg-white/10 backdrop-blur-lg border border-white/20 p-8 md:p-12 shadow-2xl">
            <div className="flex-1">
              <div className="inline-block px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md mb-6 border border-white/30 text-sm font-bold tracking-wider uppercase text-white shadow-sm">
                100% Organic Products
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight text-white drop-shadow-lg">
                Fresh <span className="text-yellow-300">Groceries</span><br /> At Your Doorstep
              </h1>
              <p className="text-base md:text-lg mb-6 text-white/90 font-medium max-w-lg leading-relaxed drop-shadow-sm">
                Experience premium online grocery shopping with freshness guaranteed, delivered fast.
              </p>
              <button
                onClick={() => navigate('/products')}
                className="bg-white text-primary font-bold px-6 md:px-8 py-3 md:py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-50 active:scale-95 transition-all shadow-xl shadow-emerald-900/20"
              >
                Shop Now
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>

          {/* Hero Slide 2 */}
          <div className="flex-shrink-0 w-full md:w-4/5 lg:w-3/4 flex items-center rounded-3xl bg-white/10 backdrop-blur-lg border border-white/20 p-8 md:p-12 shadow-2xl">
            <div className="flex-1">
              <div className="inline-block px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md mb-6 border border-white/30 text-sm font-semibold tracking-wider uppercase shadow-sm">
                🚚 Fast Delivery
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight drop-shadow-md">
                Free Shipping<br /> On Orders <span className="text-yellow-300">Over ₹500</span>
              </h2>
              <p className="text-base md:text-lg mb-6 text-white/90 font-medium max-w-lg leading-relaxed">
                Get your groceries delivered to your doorstep within 24 hours with zero delivery charges.
              </p>
              <button
                onClick={() => navigate('/products')}
                className="bg-white text-primary font-bold px-6 md:px-8 py-3 md:py-4 rounded-xl hover:bg-gray-50 active:scale-95 transition-all shadow-xl shadow-emerald-900/20"
              >
                Explore Now →
              </button>
            </div>
          </div>

          {/* Hero Slide 3 */}
          <div className="flex-shrink-0 w-full md:w-4/5 lg:w-3/4 flex items-center rounded-3xl bg-secondary dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 p-8 md:p-12">
            <div className="flex-1">
              <div className="inline-block px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md mb-6 border border-white/30 text-sm font-semibold tracking-wider uppercase shadow-sm">
                💰 Special Offer
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight drop-shadow-md text-red-950">
                Save <span className="text-primary">₹500</span><br /> On Your First <span className="text-primary">Order</span>
              </h2>
              <p className="text-base md:text-lg mb-6 text-gray-700 font-medium max-w-lg leading-relaxed">
                Use code WELCOME500 at checkout and get instant cashback on your purchase.
              </p>
              <button
                onClick={() => navigate('/categories')}
                className="bg-primary text-white font-bold px-6 md:px-8 py-3 md:py-4 rounded-xl hover:bg-dark active:scale-95 transition-all shadow-xl shadow-red-900/20"
              >
                Browse Categories →
              </button>
            </div>
          </div>
        </div>

        {/* Right Arrow Button */}
        <button
          onClick={scrollHeroRight}
          className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-40 bg-white/20 hover:bg-white/40 backdrop-blur-md text-white rounded-full p-3 transition-all flex-shrink-0"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </section>
      <div className="border-b-2 border-gray-300 dark:border-slate-700"></div>

      {/* Top Selling Products Auto-Scroll Banner */}
      <section className="py-8 md:py-12 bg-gradient-to-r from-red-600 via-red-500 to-red-600 text-white overflow-hidden shadow-inner">
        <div className="w-full px-2 sm:px-4 md:px-6 lg:px-8">
          <div className="mb-6 text-center">
            <h2 className="text-2xl md:text-3xl font-extrabold mb-1 text-white drop-shadow-md">
              🔥 Top Selling Products
            </h2>
            <p className="text-white/90 font-medium text-sm md:text-base">Shop our most popular items right now</p>
          </div>

          {loading ? (
            <LoadingSpinner />
          ) : error ? (
            <ErrorState message={error} onRetry={() => fetchProducts()} />
          ) : (
            <Swiper
              spaceBetween={12}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 2, spaceBetween: 14 },
                1024: { slidesPerView: 3, spaceBetween: 16 },
                1280: { slidesPerView: 4, spaceBetween: 16 },
                1536: { slidesPerView: 5, spaceBetween: 16 },
              }}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              loop={true}
              modules={[Autoplay, Pagination]}
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              className="topSellingSwiper"
            >
              {bestSellingProducts.map((product) => (
                <SwiperSlide key={product._id}>
                  <div className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col">
                    {/* Product Image */}
                    <div className="relative w-full h-32 md:h-40 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-slate-700 dark:to-slate-600 overflow-hidden group flex-shrink-0">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-3xl">📦</div>
                      )}
                      <div className="absolute top-2 right-2 bg-emerald-500 text-white px-2 py-0.5 rounded-full text-xs font-bold shadow-lg">
                        ⭐ Best
                      </div>
                    </div>

                    {/* Product info */}
                    <div className="p-3 md:p-4 flex-grow flex flex-col">
                      <h3 className="text-sm md:text-base font-bold text-gray-900 dark:text-white mb-1 line-clamp-2">
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-1.5">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className="text-sm md:text-base">
                              {i < Math.floor(product.rating || 0) ? '⭐' : '☆'}
                            </span>
                          ))}
                        </div>
                        <span className="text-xs md:text-sm text-gray-500 dark:text-gray-400">({product.reviews || 0})</span>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-2 line-clamp-1">
                        {product.description || 'Premium quality'}
                      </p>

                      {/* Price and Stock */}
                      <div className="flex items-center justify-between mb-3 flex-grow">
                        <div>
                          <p className="text-lg md:text-xl font-bold text-primary">₹{product.price}</p>
                          {product.originalPrice && (
                            <p className="text-xs text-gray-500 line-through">₹{product.originalPrice}</p>
                          )}
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-600 dark:text-gray-400">Stock: {product.stock || 0}</p>
                          <p className="text-xs font-semibold text-green-600">In Stock</p>
                        </div>
                      </div>

                      {/* Add to Cart Button */}
                      <button
                        onClick={() => navigate(`/products`)}
                        className="w-full bg-gradient-to-r from-primary to-red-400 text-white font-bold py-2 rounded-lg text-sm hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200"
                      >
                        View →
                      </button>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none translate-x-1/2 translate-y-1/2"></div>
      </section>
      <div className="border-b-2 border-gray-300 dark:border-slate-700"></div>

      {/* Featured Categories */}
      <section className="py-12 md:py-16 w-full px-2 sm:px-4 md:px-6 lg:px-8 bg-secondary/30">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4 px-2 md:px-4">
          <div className="flex-shrink-0">
            <h2 className="text-2xl md:text-3xl font-extrabold text-red-950 dark:text-white mb-1">
              🛒 Shop by <span className="bg-gradient-to-r from-primary to-red-500 bg-clip-text text-transparent">Category</span>
            </h2>
            <p className="text-sm md:text-base text-red-900/70 dark:text-white/70 font-medium">Explore our wide range of products</p>
          </div>
          <Link
            to="/categories"
            className="text-primary font-semibold hover:text-pink-600 transition-all flex items-center gap-2 group whitespace-nowrap"
          >
            View All
            <span className="text-lg group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorState message={error} onRetry={() => fetchCategories()} />
        ) : (
          <div className="relative group">
            {/* Left Arrow */}
            <button
              onClick={scrollLeft}
              className="absolute left-0 top-[40%] -translate-y-1/2 -ml-6 z-10 bg-white dark:bg-slate-800 shadow-lg border border-gray-100 dark:border-slate-700 rounded-full p-3 text-gray-600 dark:text-gray-300 hover:text-white hover:bg-primary hover:scale-125 transition-all opacity-0 group-hover:opacity-100 hidden md:flex items-center justify-center cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Scroll Container */}
            <div 
              ref={categoryScrollRef}
              className="flex gap-3 md:gap-6 overflow-x-auto pb-6 pt-2 snap-x scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] px-2 md:px-4"
            >
              {categories.map((category) => (
                <div key={category._id} className="snap-start">
                  <CategoryCard
                    id={category._id}
                    name={category.name}
                    image={category.image}
                  />
                </div>
              ))}
            </div>

            {/* Right Arrow */}
            <button
              onClick={scrollRight}
              className="absolute right-0 top-[40%] -translate-y-1/2 -mr-6 z-10 bg-white dark:bg-slate-800 shadow-lg border border-gray-100 dark:border-slate-700 rounded-full p-3 text-gray-600 dark:text-gray-300 hover:text-white hover:bg-primary hover:scale-125 transition-all opacity-0 group-hover:opacity-100 hidden md:flex items-center justify-center cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </section>
      <div className="border-b-2 border-gray-300 dark:border-slate-700"></div>

      {/* Best Selling Products */}
      <section className="py-12 md:py-16 w-full px-2 sm:px-4 md:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4 px-2 md:px-4">
          <div className="flex-shrink-0">
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white mb-1">
              ⭐ <span className="bg-gradient-to-r from-primary to-red-500 bg-clip-text text-transparent">Best Selling</span> Products
            </h2>
            <p className="text-sm md:text-base text-gray-600 dark:text-white/70 font-medium">Customer favorites that everyone loves</p>
          </div>
          <Link
            to="/products"
            className="text-primary font-semibold hover:text-pink-600 transition-all flex items-center gap-2 group whitespace-nowrap"
          >
            View All
            <span className="text-lg group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorState message={error} onRetry={() => fetchProducts()} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 px-2 md:px-4">
            {bestSellingProducts.map((product, index) => (
              <ProductCard key={product._id} product={product} index={index} />
            ))}
          </div>
        )}
      </section>
      <div className="border-b-2 border-gray-300 dark:border-slate-700"></div>

      {/* Premium Offer Banner */}
      <section className="py-12 md:py-16 w-full px-2 sm:px-4 md:px-6 lg:px-8 bg-white dark:bg-slate-900">
        <div className="relative overflow-hidden bg-gradient-to-br from-red-500 via-red-600 to-red-700 p-6 md:p-12 rounded-3xl shadow-2xl w-full border border-red-500/30">
          {/* Animated background elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-300/10 rounded-full blur-3xl pointer-events-none animate-pulse" style={{animationDelay: '1s'}}></div>
          
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            <div className="group bg-white/10 backdrop-blur-xl border border-white/20 p-6 md:p-8 rounded-2xl hover:border-white/40 hover:shadow-2xl transition-all duration-300 cursor-pointer">
              <div className="text-4xl md:text-5xl mb-3 group-hover:scale-110 transition-transform duration-300 inline-block text-white drop-shadow-md">🎉</div>
              <h3 className="text-xl md:text-2xl font-bold mb-2 text-white">Festival Offer</h3>
              <p className="mb-4 text-sm md:text-base text-white/80 font-medium leading-relaxed">Get up to 50% off on selected items this festival season.</p>
              <button className="bg-white text-red-600 font-bold px-6 md:px-8 py-2 md:py-3 rounded-xl text-sm md:text-base hover:bg-gray-100 active:scale-95 transition-all shadow-lg w-full">
                Shop Now →
              </button>
            </div>

            <div className="group bg-white/10 backdrop-blur-xl border border-white/20 p-6 md:p-8 rounded-2xl hover:border-white/40 hover:shadow-2xl transition-all duration-300 cursor-pointer">
              <div className="text-4xl md:text-5xl mb-3 group-hover:scale-110 transition-transform duration-300 inline-block text-white drop-shadow-md">🚚</div>
              <h3 className="text-xl md:text-2xl font-bold mb-2 text-white">Free Delivery</h3>
              <p className="mb-4 text-sm md:text-base text-white/80 font-medium leading-relaxed">Enjoy free & fast delivery on all orders above ₹500.</p>
              <button className="border-2 border-white text-white font-bold px-6 md:px-8 py-2 md:py-3 rounded-xl text-sm md:text-base hover:bg-white hover:text-red-600 active:scale-95 transition-all w-full">
                Order Now →
              </button>
            </div>

            <div className="group bg-white/10 backdrop-blur-xl border border-white/20 p-6 md:p-8 rounded-2xl hover:border-white/40 hover:shadow-2xl transition-all duration-300 cursor-pointer">
              <div className="text-4xl md:text-5xl mb-3 group-hover:scale-110 transition-transform duration-300 inline-block text-white drop-shadow-md">💳</div>
              <h3 className="text-xl md:text-2xl font-bold mb-2 text-white">Cashback</h3>
              <p className="mb-4 text-sm md:text-base text-white/80 font-medium leading-relaxed">Get up to ₹500 cashback on digital wallet payments.</p>
              <button className="bg-white text-red-600 font-bold px-6 md:px-8 py-2 md:py-3 rounded-xl text-sm md:text-base hover:bg-gray-100 active:scale-95 transition-all shadow-lg w-full">
                Learn More →
              </button>
            </div>
          </div>
        </div>
      </section>
      <div className="border-b-2 border-gray-300 dark:border-slate-700"></div>
    </div>
  )
}

export default Home
