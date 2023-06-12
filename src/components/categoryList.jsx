import React from 'react';
import "./categoryList.scss"

const CategoryList = ({ categories }) => {
  return (
    <>
      {categories.map((category, index) => (
        <div key={index} className="category-row">
          {category}
        </div>
      ))}
    </>
  );
};

export default CategoryList;
