import React, { useState } from 'react';
import './App.css';

function App() {
  const [content, setContent] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    
    const noteData = {
      content: content,
    };

    fetch('http://127.0.0.1:3000/api/notes/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(noteData),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Note created:', data);
      setContent('');
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  return (
    <div className="app-container">
      <h1>PRIVNOTE</h1>
      <hr />
      <form className="note-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="content">Enter your note</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write something here..."
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
