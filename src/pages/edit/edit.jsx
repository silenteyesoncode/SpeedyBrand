import React, { useState } from "react";
import Editor from "../../components/editor";
import "./editPage.scss";

const BlogEditor = (props) => {
  const { changeMode } = props;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Title:", title);
    console.log("Content:", content);
    setSubmitted(true);
  };

  return (
    <div className="edit-page">
      <h2>Edit Page</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content</label>
          <Editor
            value={content}
            onBlur={(newContent) => setContent(newContent)}
            onChange={() => {}}
          />
        </div>
        <button type="submit">Save</button>
        <button type="submit" onClick={() => changeMode(false)}>Back</button>
      </form>

      {submitted && (
        <div className="submitted-article">
          <h3>Submitted Article</h3>
          <h4>Title: {title}</h4>
          <div>{content}</div>
        </div>
      )}
    </div>
  );
};

export default BlogEditor;
