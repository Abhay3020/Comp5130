

// import React, { useState } from "react";
// import { retrieveNote } from "../services/api"; // Import the named export

// import "./RetrieveNote.css"; // CSS file for styling

// function RetrieveNote() {
//   const [noteId, setNoteId] = useState("");
//   const [password, setPassword] = useState("");
//   const [noteContent, setNoteContent] = useState("");
//   const [error, setError] = useState("");

//   const handleRetrieveNote = async () => {
//     try {
//       const response = await retrieveNote(noteId, password); // Call the function directly
//       setNoteContent(response.data.content);
//       setError(""); // Clear any previous errors
//     } catch (err) {
//       setError(err.response?.data.error || "An error occurred");
//       setNoteContent(""); // Clear previous content on error
//     }
//   };

//   return (
//     <div className="retrieve-note-container">
//       <h1 className="retrieve-note-title">Retrieve Note</h1>
//       <div className="retrieve-note-form">
//         <input
//           type="text"
//           placeholder="Enter Note ID"
//           value={noteId}
//           onChange={(e) => setNoteId(e.target.value)}
//           className="retrieve-note-input"
//         />
//         <input
//           type="password"
//           placeholder="Enter Password (if required)"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="retrieve-note-input"
//         />
//         <button onClick={handleRetrieveNote} className="retrieve-note-button">
//           Retrieve Note
//         </button>
//       </div>
//       {error && <p className="retrieve-note-error">{error}</p>}
//       {noteContent && <p className="retrieve-note-content">Your Note: {noteContent}</p>}
//     </div>
//   );
// }

// export default RetrieveNote;

import React, { useState } from "react";
import { retrieveNote } from "../services/api"; // Import the named export
import Header from "./Header"; // Import the Header component
import "./RetrieveNote.css"; // CSS for styling

function RetrieveNote() {
  const [noteId, setNoteId] = useState("");
  const [password, setPassword] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [error, setError] = useState("");

  const handleRetrieveNote = async () => {
    try {
      const response = await retrieveNote(noteId, password); // Call the function directly
      setNoteContent(response.data.content);
      setError(""); // Clear any previous errors
    } catch (err) {
      setError(err.response?.data.error || "An error occurred");
      setNoteContent(""); // Clear previous content on error
    }
  };

  return (
    <div className="retrieve-note-page">
      {/* Add Header */}
      <Header />
      <div className="retrieve-note-container">
        <h1 className="retrieve-note-title">Retrieve Note</h1>
        <div className="retrieve-note-form">
          <input
            type="text"
            placeholder="Enter Note ID"
            value={noteId}
            onChange={(e) => setNoteId(e.target.value)}
            className="retrieve-note-input"
          />
          <input
            type="password"
            placeholder="Enter Password (if required)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="retrieve-note-input"
          />
          <button onClick={handleRetrieveNote} className="retrieve-note-button">
            Retrieve Note
          </button>
        </div>
        {error && <p className="retrieve-note-error">{error}</p>}
        {noteContent && <p className="retrieve-note-content">Your Note: {noteContent}</p>}
      </div>
    </div>
  );
}

export default RetrieveNote;
