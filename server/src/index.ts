// index.js
const express = require("express");
const bodyParser = require("body-parser");
const PORT = 3000;
import issueRouter from "./routes/issuesRoute";

const app = express();
app.use(bodyParser.json());

// GET all issues
app.use("/api/issues", issueRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
