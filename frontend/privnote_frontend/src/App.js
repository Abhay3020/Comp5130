import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import NoteDisplay from "./NoteDisplay";
import "./App.css";

const NoteForm = () => {
  const [noteContent, setNoteContent] = useState("");
  const [noteUrl, setNoteUrl] = useState("");
  const [error, setError] = useState("");
  const [showOptions, setShowOptions] = useState(false); // Toggle for showing options
  const [selfDestructTime, setSelfDestructTime] = useState("after_reading"); // Default option
  const navigate = useNavigate();

  const handleCreateNote = async () => {
    if (!noteContent) {
      setError("Note content cannot be empty.");
      return;
    }

    setError(""); // Clear previous errors
    const noteData = { content: noteContent, selfDestructTime };

    try {
      const response = await fetch("http://127.0.0.1:8000/api/notes/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(noteData),
      });

      if (!response.ok) {
        throw new Error("Failed to create the note.");
      }

      const data = await response.json();

      if (data.unique_id) {
        const generatedUrl = `http://localhost:3000/notes/${data.unique_id}`;
        setNoteUrl(generatedUrl);
      } else {
        setError("Failed to create the note. Response is missing the unique ID.");
      }
    } catch (err) {
      console.error("Error creating note:", err);
      setError(err.message || "An error occurred while creating the note.");
    }
  };

  return (
    <div className="note-form-container">
      <h2>New note</h2>
      <textarea
        className="note-textarea"
        placeholder="Write your note here..."
        value={noteContent}
        onChange={(e) => setNoteContent(e.target.value)}
      />
      <div className="button-group">
        <button className="create-note-button" onClick={handleCreateNote}>
          Create note
        </button>
        <button
          className="options-button"
          onClick={() => setShowOptions((prev) => !prev)} // Toggle options visibility
        >
          {showOptions ? "Disable options" : "Show options"}
        </button>
      </div>
      {showOptions && (
        <div className="advanced-options">
          <h3>Advanced Options</h3>
          <label>
            Note self-destructs
            <select
              value={selfDestructTime}
              onChange={(e) => setSelfDestructTime(e.target.value)}
            >
              <option value="after_reading">After reading it</option>
              <option value="after_1_hour">After 1 hour</option>
              <option value="after_24_hours">After 24 hours</option>
              <option value="after_7_days">After 7 days</option>
            </select>
          </label>
          <label>
            Manual password
            <input type="password" placeholder="Enter a custom password to encrypt the note" />
          </label>
          <label>
            Confirm password
            <input type="password" placeholder="Confirm password" />
          </label>
          <label>
            Destruction notification
            <input type="email" placeholder="E-mail to notify when note is destroyed" />
          </label>
          <label>
            Reference name for the note (optional)
            <input type="text" placeholder="Reference name" />
          </label>
        </div>
      )}
      {noteUrl && (
        <div className="note-url">
          <h3>Generated URL:</h3>
          <a href={noteUrl} target="_blank" rel="noopener noreferrer">
            {noteUrl}
          </a>
        </div>
      )}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <header className="header">
          <h1>privnote</h1>
          <p></p>
        </header>
        <Routes>
          <Route path="/" element={<NoteForm />} />
          <Route path="/notes/:unique_id" element={<NoteDisplay />} />
        </Routes>
        <footer>
          <p>Write a new note | Support | Privacy</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;
