const fs = require("fs");
const path = require("path");

console.log("Start");

const filePath = path.join(__dirname, "../theroy/indroduction.md");

fs.readFile(filePath, "utf8", (err, data) => {
  if (err) {
    console.error("Could not read file:", err.message);
    return;
  }
  console.log("File contents:", data);
});

console.log("End");
