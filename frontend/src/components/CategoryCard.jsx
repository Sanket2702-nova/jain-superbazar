import React from 'react'
import { Link } from 'react-router-dom'

const CategoryCard = ({ id, name, image }) => {
  return (
    <Link
      to={`/products?category=${id}`}
      className="group flex flex-col items-center gap-3 cursor-pointer w-24 md:w-32 flex-shrink-0 transition-all duration-300"
    >
      <div className="w-full aspect-square bg-gradient-to-br from-red-50 to-red-100 dark:from-slate-800 dark:to-slate-700 rounded-3xl p-4 flex justify-center items-center transition-all duration-300 group-hover:shadow-xl group-hover:shadow-primary/20 group-hover:scale-110 border border-red-100 dark:border-slate-700 group-hover:border-primary/40">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-125 filter group-hover:drop-shadow-lg"
        />
      </div>
      <h3 className="text-xs md:text-sm font-bold text-center text-primary dark:text-gray-100 leading-tight transition-colors duration-300 group-hover:text-red-600">
        {name}
      </h3>
      {/* Underline on hover */}
      <div className="w-0 h-1 bg-gradient-to-r from-primary to-red-400 rounded-full transition-all duration-300 group-hover:w-full"></div>
    </Link>
  )
}

export default CategoryCard
