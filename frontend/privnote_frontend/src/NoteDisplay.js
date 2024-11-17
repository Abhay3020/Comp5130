import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const NoteDisplay = () => {
  const { unique_id } = useParams();
  const [noteContent, setNoteContent] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/notes/${unique_id}/`, {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error("Note not found or has been deleted.");
        }

        const data = await response.json();
        setNoteContent(data.content);
      } catch (err) {
        console.error("Error fetching note:", err);
        setError(err.message || "An error occurred while fetching the note.");
      }
    };

    fetchNote();
  }, [unique_id]);

  return (
    <div className="note-display-container">
      {error ? (
        <p className="error-message">{error}</p>
      ) : (
        <div>
          <h2>Note Content</h2>
          <p>{noteContent}</p>
        </div>
      )}
    </div>
  );
};

export default NoteDisplay;
