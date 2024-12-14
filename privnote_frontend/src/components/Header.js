import React from "react";

function Header() {
  return (
    <div style={{ textAlign: "center", marginBottom: "20px" }}>
      <h1 style={{ fontFamily: "'Roboto', sans-serif", color: "#007bff" }}>
        SecureNotes
      </h1>
      <hr style={{ width: "80%", margin: "0 auto", border: "1px solid #007bff" }} />
    </div>
  );
}

export default Header;
