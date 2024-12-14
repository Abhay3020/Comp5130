// import React, { useState } from "react";
// import axios from "axios";

// function CreateNote() {
//   const [content, setContent] = useState("");
//   const [password, setPassword] = useState("");
//   const [expiryOption, setExpiryOption] = useState("1v");
//   const [noteUrl, setNoteUrl] = useState("");
//   const [error, setError] = useState("");
//   const [advancedOptionsVisible, setAdvancedOptionsVisible] = useState(false);

//   const handleCreateNote = async () => {
//     try {
//       const response = await axios.post("http://127.0.0.1:8000/api/notes/create/", {
//         content,
//         password,
//         expiry_option: expiryOption,
//       });
//       setNoteUrl(response.data.url);
//       setError("");
//     } catch (err) {
//       setError("Failed to create the note. Please try again.");
//     }
//   };

//   const handleSendEmail = () => {
//     if (noteUrl) {
//       const subject = "Here is your PrivNote!";
//       const body = `You can access your note at the following URL:\n\n${noteUrl}`;
//       window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
//     }
//   };

//   return (
//     <div style={{ textAlign: "center", marginTop: "50px" }}>
//       <h2>Create Note</h2>
//       <textarea
//         placeholder="Write your note here..."
//         value={content}
//         onChange={(e) => setContent(e.target.value)}
//         style={{
//           width: "80%",
//           height: "100px",
//           margin: "20px 0",
//           padding: "10px",
//           border: "1px solid #ccc",
//           borderRadius: "5px",
//         }}
//       />
//       <br />
//       {/* Buttons Row */}
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           width: "80%",
//           margin: "20px auto",
//         }}
//       >
//         <button
//           onClick={() => setAdvancedOptionsVisible(!advancedOptionsVisible)}
//           style={{
//             backgroundColor: "#007bff",
//             color: "white",
//             border: "none",
//             padding: "10px 20px",
//             borderRadius: "5px",
//             cursor: "pointer",
//           }}
//         >
//           {advancedOptionsVisible ? "Hide Options" : "Show Options"}
//         </button>
//         <button
//           onClick={handleCreateNote}
//           style={{
//             backgroundColor: "#28a745",
//             color: "white",
//             border: "none",
//             padding: "10px 20px",
//             borderRadius: "5px",
//             cursor: "pointer",
//           }}
//         >
//           Create Note
//         </button>
//       </div>
//       {/* Advanced Options Section */}
//       {advancedOptionsVisible && (
//         <div style={{ marginTop: "20px" }}>
//           <div>
//             <label>Expiry Option: </label>
//             <select
//               value={expiryOption}
//               onChange={(e) => setExpiryOption(e.target.value)}
//               style={{
//                 padding: "5px",
//                 borderRadius: "5px",
//                 border: "1px solid #ccc",
//                 marginBottom: "10px",
//               }}
//             >
//               <option value="1v">One View</option>
//               <option value="1hr">1 Hour</option>
//               <option value="24hr">24 Hours</option>
//               <option value="1week">1 Week</option>
//             </select>
//           </div>
//           <div>
//             <label>Password: </label>
//             <input
//               type="password"
//               placeholder="Set a password (optional)"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               style={{
//                 padding: "5px",
//                 borderRadius: "5px",
//                 border: "1px solid #ccc",
//                 marginTop: "10px",
//               }}
//             />
//           </div>
//         </div>
//       )}
//       {/* Display Note URL and Email Button */}
//       {noteUrl && (
//         <div style={{ marginTop: "20px" }}>
//           <p>Note created! Access it here:</p>
//           <p
//             style={{
//               wordBreak: "break-word",
//               color: "#007bff",
//               cursor: "pointer",
//               textDecoration: "underline",
//             }}
//           >
//             {noteUrl}
//           </p>
//           <button
//             onClick={handleSendEmail}
//             style={{
//               backgroundColor: "#17a2b8",
//               color: "white",
//               border: "none",
//               padding: "10px 20px",
//               borderRadius: "5px",
//               cursor: "pointer",
//               marginTop: "10px",
//             }}
//           >
//             Send Email
//           </button>
//         </div>
//       )}
//       {/* Display Error */}
//       {error && (
//         <p style={{ color: "red", marginTop: "20px" }}>{error}</p>
//       )}
//     </div>
//   );
// }

// export default CreateNote;

import React, { useState } from "react";
import axios from "axios";
import Header from "./Header"; // Import the Header component

function CreateNote() {
  const [content, setContent] = useState("");
  const [password, setPassword] = useState("");
  const [expiryOption, setExpiryOption] = useState("1v");
  const [noteUrl, setNoteUrl] = useState("");
  const [error, setError] = useState("");
  const [advancedOptionsVisible, setAdvancedOptionsVisible] = useState(false);

  const handleCreateNote = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/notes/create/", {
        content,
        password,
        expiry_option: expiryOption,
      });
      setNoteUrl(response.data.url);
      setError("");
    } catch (err) {
      setError("Failed to create the note. Please try again.");
    }
  };

  const handleSendEmail = () => {
    if (noteUrl) {
      const subject = "Here is your SecureNote!";
      const body = `You can access your note at the following URL:\n\n${noteUrl}`;
      window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <Header /> {/* Add the Header */}
      <h2>Create Note</h2>
      <textarea
        placeholder="Write your note here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={{
          width: "80%",
          height: "100px",
          margin: "20px 0",
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "5px",
        }}
      />
      <br />
      {/* Buttons Row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "80%",
          margin: "20px auto",
        }}
      >
        <button
          onClick={() => setAdvancedOptionsVisible(!advancedOptionsVisible)}
          style={{
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {advancedOptionsVisible ? "Hide Options" : "Show Options"}
        </button>
        <button
          onClick={handleCreateNote}
          style={{
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Create Note
        </button>
      </div>
      {/* Advanced Options Section */}
      {advancedOptionsVisible && (
        <div style={{ marginTop: "20px" }}>
          <div>
            <label>Expiry Option: </label>
            <select
              value={expiryOption}
              onChange={(e) => setExpiryOption(e.target.value)}
              style={{
                padding: "5px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                marginBottom: "10px",
              }}
            >
              <option value="1v">One View</option>
              <option value="1hr">1 Hour</option>
              <option value="24hr">24 Hours</option>
              <option value="1week">1 Week</option>
            </select>
          </div>
          <div>
            <label>Password: </label>
            <input
              type="password"
              placeholder="Set a password (optional)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                padding: "5px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                marginTop: "10px",
              }}
            />
          </div>
        </div>
      )}
      {/* Display Note URL and Email Button */}
      {noteUrl && (
        <div style={{ marginTop: "20px" }}>
          <p>Note created! Access it here:</p>
          <p
            style={{
              wordBreak: "break-word",
              color: "#007bff",
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            {noteUrl}
          </p>
          <button
            onClick={handleSendEmail}
            style={{
              backgroundColor: "#17a2b8",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "5px",
              cursor: "pointer",
              marginTop: "10px",
            }}
          >
            Send Email
          </button>
        </div>
      )}
      {/* Display Error */}
      {error && (
        <p style={{ color: "red", marginTop: "20px" }}>{error}</p>
      )}
    </div>
  );
}

export default CreateNote;
