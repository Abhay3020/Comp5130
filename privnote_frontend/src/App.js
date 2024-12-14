import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateNote from "./components/CreateNote";
import RetrieveNote from "./components/RetrieveNote";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CreateNote />} />
        <Route path="/note/:id" element={<RetrieveNote />} />
      </Routes>
    </Router>
  );
}

export default App;
