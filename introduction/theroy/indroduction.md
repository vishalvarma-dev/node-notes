# Node.js Introduction

## What is Node.js?

Node.js is a JavaScript runtime built on Google's V8 engine. It lets you run JavaScript outside the browser, such as on a server or your own computer.

In the browser, JavaScript handles things like button clicks and page updates. With Node.js, JavaScript can also read and write files, handle network requests, and talk to databases.

## Key Ideas

**Non-blocking and event-driven**
Node handles many tasks at once. While one request waits on a database, Node can serve other requests. This makes it a good fit for web servers and APIs.

**Single-threaded event loop**
Your code runs on one main thread. Slow operations, such as reading a file, run in the background and return their result when they finish.

**npm (Node Package Manager)**
npm comes with Node and gives access to thousands of reusable packages, such as Express for building web servers.

## Common Uses

- REST APIs and web servers
- Real-time apps such as chat
- Command-line tools
- Build tools for frontend projects

## Examples

### 1. Hello World

```javascript
console.log("Hello from Node.js!");
```

Save this as `hello.js` and run:

```bash
node hello.js
```

### 2. Reading a File Without Blocking

Create a file called `notes.txt` first, then save this as `read.js`:

```javascript
const fs = require("fs");

console.log("Start");

fs.readFile("notes.txt", "utf8", (err, data) => {
  if (err) {
    console.error("Could not read file:", err.message);
    return;
  }
  console.log("File contents:", data);
});

console.log("End");
```

The output appears in this order: `Start`, `End`, then the file contents. Node does not wait for the file to load before running the last line.

### 3. A Simple HTTP Server

Save this as `server.js`:

```javascript
const http = require("node:http");

const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello World");
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
```

Run `node server.js`, then open `http://127.0.0.1:3000` in your browser.

### 4. Using an npm Package (Express)

In your project folder, run:

```bash
npm init -y
npm install express
```

Save this as `app.js`:

```javascript
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello from Express!");
});

app.listen(3000, () => {
  console.log("Express running on http://localhost:3000");
});
```

Run `node app.js`, then visit `http://localhost:3000`.

> **Note:** The examples use `require`, which works in plain `.js` files. If you use `import` syntax instead, add `"type": "module"` to your `package.json` or save the file with a `.mjs` extension.
