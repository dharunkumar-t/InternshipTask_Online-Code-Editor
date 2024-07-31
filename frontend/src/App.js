// frontend/src/App.js
import React from "react";
import "./App.css";
import CodeEditor from "./components/CodeEditor";

function App() {
  return (
    <div className="App">
      <CodeEditor />
      <footer className="footer">
        <div className="footer-container">
          <p>&copy; 2024 Dharun Kumar T. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
