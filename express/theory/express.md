## What is Express.js

Express.js is a minimal and flexible web framework built on top of Node.js. It gives you a set of tools for building web servers and APIs, so you don't have to write low-level HTTP code yourself.

## Why we need Express

Node.js has a built-in `http` module, but it is low-level. Without a framework you have to:

- check the request method and URL by hand for every route
- parse request bodies yourself
- set headers and status codes manually
- handle errors in every place they can occur
- serve static files (HTML, CSS, images) yourself

Express handles these jobs so you can focus on your application logic.

> Reference: [`middleware/code/node-middleware.js`](../../middleware/code/node-middleware.js)

## What Express provides

These are some of the commonly used features Express gives you. The framework is flexible enough that you can add more capabilities through third-party packages.

- **Routing:** define handlers for specific methods and paths, such as `app.get('/notes', handler)`.
- **Middleware:** functions that run before the route handler, for logging, authentication, CORS, body parsing, and more. Reference: [`node-middleware.js`](../../middleware/code/node-middleware.js) (raw Node.js) and [`express-middleware.js`](../../middleware/code/express-middleware.js) (Express).
- **Request and response helpers:** shortcuts like `res.json()`, `res.status()`, `req.params`, and `req.query`.
- **Error handling:** a central place to catch errors and send a consistent response.
- **Static file serving:** `express.static()` serves files from a folder.

There is a lot more Express can do (template engines, cookies, sessions, rate limiting, etc.), but the features above cover most of what you need to build a REST API.

## Minimal example

```javascript
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello from Express");
});

app.get("/notes", (req, res) => {
  res.json([{ id: 1, title: "First note" }]);
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
```

## Setup

```bash
npm init -y
npm install express
```

Run the file with `node server.js`, then open `http://localhost:3000` in your browser.

## Key points to remember

- Express is not a replacement for Node.js. It runs on top of it.
- Routes are matched in the order they are defined.
- Always send a response or call `next()`, otherwise the request hangs.
- Install `node_modules` is ignored in Git, so add it to `.gitignore`.
