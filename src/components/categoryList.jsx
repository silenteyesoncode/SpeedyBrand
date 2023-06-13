import React, { useState } from 'react';
import './categoryList.scss';

const CategoryList = ({ categories }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryClick = (categoryIndex) => {
    setSelectedCategory(categoryIndex);
  };

  return (
    <div className="category-list">
      {categories.map((category, index) => (
        <div
          key={index}
          className={`category-row ${selectedCategory === index ? 'selected' : ''}`}
          onClick={() => handleCategoryClick(index)}
        >
          {category}
        </div>
      ))}
    </div>
  );
};

export default CategoryList;
