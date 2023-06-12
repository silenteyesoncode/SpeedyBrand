import React from 'react';
import './board.scss';
import CategoryList from '../../components/categoryList';

const Board = () => {
  const categories = ['Category 1', 'Category 2', 'Category 3', 'Category 4'];

  return (
    <div className="board">
      <h1 className="board-title">Board</h1>
      <div className="center-box">
        <div className="category-list-container">
          <CategoryList categories={categories} />
        </div>
      </div>
    </div>
  );
};

export default Board;
