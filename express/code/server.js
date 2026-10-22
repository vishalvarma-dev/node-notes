// server.js
// Express.js example covering routing, middleware, request helpers, and error handling
const express = require("express");
const app = express();

// --- Built-in Middleware ------------------------------------------------------

// Parse incoming JSON request bodies (makes req.body available)
app.use(express.json());

// Parse URL-encoded form data (e.g. HTML forms)
app.use(express.urlencoded({ extended: true }));

// --- Application-level Middleware --------------------------------------------

// Logger: runs on every request before reaching any route
app.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    console.log(`[${req.method}] ${req.url} - ${res.statusCode} (${Date.now() - start}ms)`);
  });
  next();
});

// --- In-memory Data -----------------------------------------------------------

const notes = [
  { id: 1, title: "Learn Express", done: false },
  { id: 2, title: "Understand middleware", done: false },
];
let nextId = 3;

// --- Routes -------------------------------------------------------------------

// GET /
// Public home route
app.get("/", (req, res) => {
  res.send("Notes API — visit /notes");
});

// GET /notes
// Returns all notes, supports ?done=true/false filter via req.query
app.get("/notes", (req, res) => {
  const { done } = req.query;

  if (done !== undefined) {
    const filtered = notes.filter((n) => String(n.done) === done);
    return res.json(filtered);
  }

  res.json(notes);
});

// GET /notes/:id
// Returns a single note by id via req.params
app.get("/notes/:id", (req, res) => {
  const note = notes.find((n) => n.id === Number(req.params.id));

  if (!note) {
    return res.status(404).json({ error: "Note not found" });
  }

  res.json(note);
});

// POST /notes
// Creates a new note from req.body
app.post("/notes", (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ error: "title is required" });
  }

  const note = { id: nextId++, title, done: false };
  notes.push(note);

  res.status(201).json(note);
});

// PATCH /notes/:id
// Updates the done status of a note
app.patch("/notes/:id", (req, res) => {
  const note = notes.find((n) => n.id === Number(req.params.id));

  if (!note) {
    return res.status(404).json({ error: "Note not found" });
  }

  if (req.body.done !== undefined) {
    note.done = req.body.done;
  }

  if (req.body.title !== undefined) {
    note.title = req.body.title;
  }

  res.json(note);
});

// DELETE /notes/:id
// Removes a note by id
app.delete("/notes/:id", (req, res) => {
  const index = notes.findIndex((n) => n.id === Number(req.params.id));

  if (index === -1) {
    return res.status(404).json({ error: "Note not found" });
  }

  const deleted = notes.splice(index, 1)[0];
  res.json({ message: "Deleted", note: deleted });
});

// --- Error-handling Middleware ------------------------------------------------

// Must have exactly 4 parameters for Express to treat it as an error handler
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err.message);
  res.status(500).json({ error: "Internal Server Error" });
});

// --- Start Server -------------------------------------------------------------

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Express server running on http://localhost:${PORT}`);
  console.log("  GET    /notes          -> all notes (supports ?done=true/false)");
  console.log("  GET    /notes/:id      -> single note");
  console.log("  POST   /notes          -> create note  { title }");
  console.log("  PATCH  /notes/:id      -> update note  { title?, done? }");
  console.log("  DELETE /notes/:id      -> delete note");
});
