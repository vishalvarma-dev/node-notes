// express-middleware.js
// Middleware example using Express.js
const express = require("express");
const app = express();

// Built-in middleware to parse JSON request bodies
app.use(express.json());

// 1. Application-level Logger Middleware
// Runs on every incoming request before reaching any route handler
app.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(
      `[${req.method}] ${req.url} - ${res.statusCode} (${duration}ms)`,
    );
  });
  next(); // Pass control to the next middleware or route
});

// 2. Route-level Authentication Middleware
// Only applied to routes that need protection
function requireAuth(req, res, next) {
  const token = req.headers["authorization"];

  if (token !== "secret-token") {
    return res
      .status(401)
      .json({ error: "Unauthorized: missing or invalid token" });
  }

  // Attach user info to req for use in the route handler
  req.user = { id: 101, name: "Alice" };
  next();
}

// Public Route (no auth required)
app.get("/", (req, res) => {
  res.send("Home Page (Public)");
});

// Protected Route (requireAuth runs before the handler)
app.get("/api/dashboard", requireAuth, (req, res) => {
  res.json({ message: `Welcome, ${req.user.name}!` });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Express server running on http://localhost:${PORT}`);
  console.log("  GET /                -> public (no auth)");
  console.log(
    "  GET /api/dashboard   -> protected (requires: Authorization: secret-token)",
  );
});
