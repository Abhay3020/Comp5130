import React, { useState } from 'react';

const NoteForm = () => {
  const [content, setContent] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    // Prepare the note data
    const noteData = {
      content: content,
    };

    // Send the note data to the Django backend
    fetch('http://127.0.0.1:8000/api/notes/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(noteData),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Note created:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Note Content:
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default NoteForm;
