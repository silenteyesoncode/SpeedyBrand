import React from 'react';
import './topic.scss';

const TopicBoard = ({ topics }) => {
  return (
    <>
      {topics.map((topic, index) => (
        <div key={index} className="topic-box">
          <div className="topic-title">{topic.title}</div>
          <div className="keyword-container">
            <div>
              {topic.keywords.map((keyword, keywordIndex) => (
                <span key={keywordIndex} className="keyword">{keyword}</span>
              ))}
            </div>
            <div className="button-container ">
              <button className="write-button">Write</button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default TopicBoard;
