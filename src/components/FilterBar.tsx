'use client';

import React from 'react';

interface FilterBarProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ categories, activeCategory, onCategoryChange }) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
      <button
        onClick={() => onCategoryChange('All')}
        className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
          activeCategory === 'All'
            ? 'bg-brand-bronze text-white shadow-md'
            : 'bg-white text-gray-500 hover:text-brand-bronze hover:bg-brand-bronze/5 border border-gray-100'
        }`}
      >
        All Designs
      </button>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
            activeCategory === category
              ? 'bg-brand-bronze text-white shadow-md'
              : 'bg-white text-gray-500 hover:text-brand-bronze hover:bg-brand-bronze/5 border border-gray-100'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default FilterBar;
