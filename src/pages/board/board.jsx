import React from 'react';
import './board.scss';
import CategoryList from '../../components/categoryList';
import TopicBoard from '../../components/topic';

const Board = () => {
  const categories = ['Category 1', 'Category 2', 'Category 3', 'Category 4'];
  const topics = [
    { title: 'Topic 1', keywords: ['keyword1', 'keyword2', 'keyword3'] },
    { title: 'Topic 2', keywords: ['keyword4', 'keyword5', 'keyword6'] },
    { title: 'Topic 3', keywords: ['keyword7', 'keyword8', 'keyword9'] },
  ];

  return (
    <div className="board">
      <h1 className="board-title">Categories</h1>
 
        <div className="category-list-container">
          <CategoryList categories={categories} />
          <button className="topic-button">Add Topic</button>
        </div>
      
        <div className="topic-board-container">
          <TopicBoard topics={topics} />
        </div>
    
    </div>
  );
};

export default Board;
