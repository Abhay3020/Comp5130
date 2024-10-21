import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import NoteDisplay from './NoteDisplay';
import './App.css';

const NoteForm = () => {
  const [content, setContent] = useState('');
  const [noteUrl, setNoteUrl] = useState(null);
  const [error, setError] = useState('');

  // Function to handle the submit and get the URL
  const handleSubmit = (e) => {
    e.preventDefault();
    generateNoteUrl();
  };

  // Function to generate the note URL
  const generateNoteUrl = () => {
    const noteData = { content };

    fetch('http://127.0.0.1:8000/api/notes/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(noteData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.url) {
          console.log('Note created:', data);
          setNoteUrl(data.url); // Set the URL for displaying the note
          setContent(''); // Clear the input field after submission
        } else {
          setError('Failed to create the note. Please try again.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setError('Error occurred while creating the note. Please try again.');
      });
  };

  // Function to handle the 'Send Email' functionality
  const handleSendEmail = (e) => {
    e.preventDefault();

    if (!noteUrl) {
      // Generate the note URL if not already generated
      generateNoteUrl();
    }

    // Use a timeout to ensure the URL is set before opening the email client
    setTimeout(() => {
      if (noteUrl) {
        const mailtoLink = `mailto:?subject=Your%20Privnote&body=Here%20is%20your%20Privnote:%20${noteUrl}`;
        window.location.href = mailtoLink; // Opens the email client with the note URL
      }
    }, 1000); // Add a slight delay to ensure noteUrl is updated
  };

  return (
    <div className="app-container">
      <h1>Create a Note</h1>
      <form className="note-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="content">Enter your note</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <div className="button-group">
          <button type="submit">Get URL</button>
          {/* Add the Send Email button */}
          <button onClick={handleSendEmail} type="button" style={{ marginLeft: '10px' }}>
            Send Email
          </button>
        </div>
      </form>

      {noteUrl && (
        <div>
          <h2>Your Note URL</h2>
          {/* Display the generated URL */}
          <Link to={noteUrl.replace('http://127.0.0.1:8000', '')} target="_blank">
            {noteUrl}
          </Link>
        </div>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

// Main App Component
function App() {
  return (
    <Router>
      <Routes>
        {/* Route to display the note */}
        <Route path="/notes/:unique_id" element={<NoteDisplay />} />
        {/* Route to handle note creation form */}
        <Route path="/" element={<NoteForm />} />
      </Routes>
    </Router>
  );
}

export default App;
