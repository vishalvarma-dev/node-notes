// node-middleware.js
// Middleware example using pure Node.js (built-in http module)
const http = require("http");

// 1. Logger Middleware
// Logs the HTTP method, URL, status code, and response time for every request
function logger(req, res, next) {
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(
      `[${req.method}] ${req.url} - ${res.statusCode} (${duration}ms)`,
    );
  });
  next();
}

// 2. Authentication Middleware
// Protects /api/dashboard by checking for a valid authorization token
function authenticate(req, res, next) {
  const token = req.headers["authorization"];

  if (req.url === "/api/dashboard" && token !== "secret-token") {
    res.writeHead(401, { "Content-Type": "application/json" });
    return res.end(
      JSON.stringify({ error: "Unauthorized: missing or invalid token" }),
    );
  }

  // Attach user info to req so downstream handlers can use it
  req.user = { id: 101, name: "Alice" };
  next();
}

// Middleware Runner
// Calls each middleware function in order. Each must call next() to continue.
function runMiddleware(req, res, middlewares, finalHandler) {
  let index = 0;

  function next(err) {
    if (err) {
      res.writeHead(500, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ error: err.message }));
    }

    if (index < middlewares.length) {
      const fn = middlewares[index++];
      fn(req, res, next);
    } else {
      finalHandler(req, res);
    }
  }

  next();
}

// Route Handler
function router(req, res) {
  if (req.method === "GET" && req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    return res.end("Home Page (Public)");
  }

  if (req.method === "GET" && req.url === "/api/dashboard") {
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ message: `Welcome, ${req.user.name}!` }));
  }

  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Route not found" }));
}

// Server setup
const server = http.createServer((req, res) => {
  runMiddleware(req, res, [logger, authenticate], router);
});

const PORT = 4000;
server.listen(PORT, () => {
  console.log(`Native Node server running on http://localhost:${PORT}`);
  console.log("  GET /                -> public (no auth)");
  console.log(
    "  GET /api/dashboard   -> protected (requires: Authorization: secret-token)",
  );
});
