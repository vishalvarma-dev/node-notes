/**
 * Express Routing Example
 * Demonstrates:
 * - Basic routes (GET, POST, PUT, DELETE)
 * - Route parameters (req.params)
 * - Query string parameters (req.query)
 * - Chained route handlers using app.route()
 * - Modular routing with express.Router()
 * - 404 Catch-all route handler
 */

const express = require("express");
const app = express();
const PORT = 3000;

// Built-in middleware to parse JSON body
app.use(express.json());

// In-memory data
let notes = [
  { id: 1, title: "Learn Express Routing", category: "study" },
  { id: 2, title: "Understand req.params and req.query", category: "study" },
  { id: 3, title: "Buy groceries", category: "personal" },
];

// --- 1. Basic Route ---
app.get("/", (req, res) => {
  res.send("Welcome to the Routing API");
});

// --- 2. Modular Router for /notes ---
const noteRouter = express.Router();

// GET /notes - with optional query filtering (?category=study)
noteRouter.get("/", (req, res) => {
  const { category } = req.query;

  if (category) {
    const filteredNotes = notes.filter(
      (n) => n.category.toLowerCase() === category.toLowerCase()
    );
    return res.json(filteredNotes);
  }

  res.json(notes);
});

// POST /notes - Create a new note
noteRouter.post("/", (req, res) => {
  const { title, category } = req.body;

  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }

  const newNote = {
    id: notes.length > 0 ? notes[notes.length - 1].id + 1 : 1,
    title,
    category: category || "general",
  };

  notes.push(newNote);
  res.status(201).json(newNote);
});

// GET, PUT, DELETE for /notes/:id using chained route handlers
noteRouter
  .route("/:id")
  .get((req, res) => {
    const id = parseInt(req.params.id, 10);
    const note = notes.find((n) => n.id === id);

    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    res.json(note);
  })
  .put((req, res) => {
    const id = parseInt(req.params.id, 10);
    const note = notes.find((n) => n.id === id);

    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    const { title, category } = req.body;
    if (title) note.title = title;
    if (category) note.category = category;

    res.json(note);
  })
  .delete((req, res) => {
    const id = parseInt(req.params.id, 10);
    const index = notes.findIndex((n) => n.id === id);

    if (index === -1) {
      return res.status(404).json({ error: "Note not found" });
    }

    notes.splice(index, 1);
    res.json({ message: "Note deleted successfully" });
  });

// Mount the modular router under the '/notes' path prefix
app.use("/notes", noteRouter);

// --- 3. 404 Catch-all handler for undefined routes ---
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
