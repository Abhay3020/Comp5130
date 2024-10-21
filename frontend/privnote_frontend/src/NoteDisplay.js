import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './NoteDisplay.css';

const NoteDisplay = () => {
  const { unique_id } = useParams();
  const [noteContent, setNoteContent] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/notes/${unique_id}/`)
      .then((response) => response.json())
      .then((data) => {
        if (data.content) {
          setNoteContent(data.content);
        } else {
          setError('Failed to load the note.');
        }
      })
      .catch((error) => {
        setError('Error fetching the note.');
        console.error('Error:', error);
      });
  }, [unique_id]);

  return (
    <div className="note-display">
      <h1>Note Content</h1>
      <hr></hr>
      {error ? <p>{error}</p> : <p>{noteContent}</p>}
    </div>
  );
};

export default NoteDisplay;
