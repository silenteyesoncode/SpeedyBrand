import React from 'react';
import './topic.scss';

const TopicBoard = ({ topics, onWriteButtonClick, onDeleteButtonClick }) => {
  const getRandomColor = () => {
    const luminosity = '80'; // Control the luminosity to generate lighter colors (e.g., '80' for light colors)
    const hex = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += hex[Math.floor(Math.random() * 16)];
    }
    return color + luminosity;
  };

  return (
    <>
      {topics.map((topic, index) => (
        <div key={index} className="topic-box">
          <div className="topic-title">{topic.title}</div>
          <div className="keyword-container">
            <div>
              {topic.keywords.map((keyword, keywordIndex) => (
                <span
                  key={keywordIndex}
                  className="keyword"
                  style={{ backgroundColor: getRandomColor() }}
                >
                  {keyword}
                </span>
              ))}
            </div>
            <div className="button-container">
              <button className="write-button" onClick={() => onWriteButtonClick(topic)}>
                Write
              </button>
              <button className="write-button" onClick={() => onDeleteButtonClick(topic)}>
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default TopicBoard;
