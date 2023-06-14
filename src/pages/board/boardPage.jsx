import React, { useState, useEffect } from 'react';
import CategoryList from '../../components/categoryList';
import TopicBoard from '../../components/topic';
import BlogEditor from '../edit/edit';
import {db , collection, addDoc , getDocs, deleteDoc} from '../../firebase/firebase-utilities'
import './boardPage.scss';

const Board = () => {

  const [EditMode, changeMode] = useState(false)


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
    const newTopic = {
      title: newTopicName,
      keywords: newTopicKeywords.filter((keyword) => keyword.value.trim() !== '').map((keyword) => keyword.value),
    };
  
    // Check if the title already exists in the collection
    const topicCollection = collection(db, "topics");
    const querySnapshot = await getDocs(topicCollection);
    const matchingDocs = querySnapshot.docs.filter(doc => doc.data().title === newTopic.title);
  
    if (matchingDocs.length > 0) {
      const errorMessage = `Topic with the same title already exists: ${newTopic.title}`;
      alert(errorMessage);
      console.log(errorMessage);
      return;
    }
  
    try {
      const docRef = await addDoc(collection(db, "topics"), newTopic);
      console.log("Document written with ID:", docRef.id);
      setRefreshToken(!refreshToken); // Update the refresh token to trigger the useEffect refresh
    } catch (error) {
      console.error("Error adding document:", error);
    }
  
    setIsFormVisible(false);
  };
  

  const handleDeleteTopic = async (topic) => {
    console.log(topic.title);
    try {
      const topicCollection = collection(db, "topics");
      const querySnapshot = await getDocs(topicCollection);
      const matchingDocs = querySnapshot.docs.filter(doc => doc.data().title === topic.title);
      
      if (matchingDocs.length > 0) {
        const topicDoc = matchingDocs[0].ref;
        await deleteDoc(topicDoc);
        console.log("Document deleted:", topic.title);
        setRefreshToken(!refreshToken); // Update the refresh token to trigger the useEffect refresh
      } else {
        console.log("No matching document found for topic:", topic.title);
      }
    } catch (error) {
      console.error("Error deleting document:", topic.title, error);
    }
  };

  const handleWriteButtonClick = async (topic) => {
    changeMode(true);
  
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

  if (EditMode === true) {
    return <BlogEditor changeMode={changeMode} />;
  } else
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
          <div className="form-buttons">
            <button type="submit" className="form-submit-button">
              Save
            </button>
            <button type="button" className="back-button" onClick={() => setIsFormVisible(false)}>
              Back
            </button>
          </div>
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
            <TopicBoard topics={topics} 
              onDeleteButtonClick={handleDeleteTopic} 
              onWriteButtonClick={handleWriteButtonClick}
             />
          </div>
        </>
      )}
    </div>
  );
};

export default Board;
