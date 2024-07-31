// frontend/src/components/CodeEditor.js
import axios from "axios";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/python/python";
import React, { useState } from "react";
import { Controlled as CodeMirror } from "react-codemirror2";

function CodeEditor() {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [output, setOutput] = useState("");

  const handleRunCode = async () => {
    try {
      const response = await axios.post("http://localhost:5000/execute", {
        code,
        language,
      });
      setOutput(response.data);
    } catch (error) {
      setOutput(error.response ? error.response.data : "Error executing code");
    }
  };

  return (
    <div>
      <h1>Online Code Editor</h1>
      <select onChange={(e) => setLanguage(e.target.value)} value={language}>
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
      </select>
      <CodeMirror
        value={code}
        options={{
          mode: language === "javascript" ? "javascript" : "python",
          lineNumbers: true,
        }}
        onBeforeChange={(editor, data, value) => setCode(value)}
      />
      <button onClick={handleRunCode}>Run Code</button>
      <pre>{output}</pre>
    </div>
  );
}

export default CodeEditor;
