// backend/server.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { exec } = require("child_process");

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post("/execute", (req, res) => {
  const { code, language } = req.body;

  let command;
  if (language === "python") {
    command = `python -c "${code}"`;
  } else if (language === "node") {
    command = `node -e "${code}"`;
  } else {
    return res.status(400).send("Unsupported language");
  }

  exec(command, (error, stdout, stderr) => {
    if (error) {
      return res.status(500).send(stderr);
    }
    res.send(stdout);
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
