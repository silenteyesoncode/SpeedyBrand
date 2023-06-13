import React, { useState, useEffect } from 'react';
import CategoryList from '../../components/categoryList';
import TopicBoard from '../../components/topic';
import {db , collection, addDoc , getDocs} from '../../firebase/firebase-utilities'
import './board.scss';

const Board = () => {
  const categories = ['All', 'Custom', 'ICP', 'Mission'];
  const [topics, setTopics] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [newTopicName, setNewTopicName] = useState('');
  const [newTopicKeywords, setNewTopicKeywords] = useState([{ id: 1, value: '' }]);
  const [refreshToken, setRefreshToken] = useState(false);

  useEffect(() => {
    const fetchTopics = async () => {
      const topicCollection = collection(db, "topics");
      const topicSnapshot = await getDocs(topicCollection);
      const topicList = topicSnapshot.docs.map(doc => doc.data());
      setTopics(topicList);
    };

    fetchTopics();
  }, [refreshToken]);

  const handleAddTopic = () => {
    setIsFormVisible(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "topics"), {
        title: newTopicName,
        keywords: newTopicKeywords.filter((keyword) => keyword.value.trim() !== '').map((keyword) => keyword.value)
      });
      console.log("Document written with ID: ", docRef.id);
      setRefreshToken(!refreshToken); // Update the refresh token to trigger the useEffect refresh
    } catch (error) {
      console.error("Error adding document: ", error);
    }
    setIsFormVisible(false);
  };

  const handleAddKeyword = () => {
    const newKeywordId = newTopicKeywords.length + 1;
    setNewTopicKeywords([...newTopicKeywords, { id: newKeywordId, value: '' }]);
  };

  const handleKeywordChange = (id, value) => {
    const updatedKeywords = newTopicKeywords.map((keyword) =>
      keyword.id === id ? { ...keyword, value: value } : keyword
    );
    setNewTopicKeywords(updatedKeywords);
  };

  const handleDeleteKeyword = (id) => {
    const updatedKeywords = newTopicKeywords.filter((keyword) => keyword.id !== id);
    setNewTopicKeywords(updatedKeywords);
  };

  return (
    <div className="board">
      {isFormVisible ? (
        <form className="topic-form" onSubmit={handleFormSubmit}>
          <h2>Add Topic</h2>
          <div className="form-group">
            <label htmlFor="topicName">Topic Name</label>
            <input
              type="text"
              id="topicName"
              value={newTopicName}
              onChange={(e) => setNewTopicName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="topicKeywords">Keywords</label>
            {newTopicKeywords.map((keyword) => (
              <div className="keyword-input" key={keyword.id}>
                <input
                  type="text"
                  value={keyword.value}
                  onChange={(e) => handleKeywordChange(keyword.id, e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="delete-keyword-button"
                  onClick={() => handleDeleteKeyword(keyword.id)}
                >
                  Delete
                </button>
              </div>
            ))}
            <div>
              <button type="button" className="add-keyword-button" onClick={handleAddKeyword}>
                Add Keyword
              </button>
            </div>
          </div>
          <button type="submit" className="form-submit-button">
            Save
          </button>
        </form>
      ) : (
        <>
          <h1 className="board-title">Categories</h1>
          <div className="category-list-container">
            <CategoryList categories={categories} />
            <button className="topic-button" onClick={handleAddTopic}>
              Add Topic
            </button>
          </div>

          <div className="topic-board-container">
            <TopicBoard topics={topics}  />
          </div>
        </>
      )}
    </div>
  );
};

export default Board;
