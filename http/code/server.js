/**
 * Core Node.js HTTP Server Example
 * Demonstrates:
 * - Handling raw HTTP requests & responses (no frameworks)
 * - Inspecting req.method, req.url, and req.headers
 * - Parsing request body from incoming stream chunks
 * - Setting status codes and response headers
 * - Implementing basic CRUD operations using HTTP methods
 */

const http = require("http");

// In-memory data store
let notes = [
  { id: 1, title: "Learn HTTP Basics" },
  { id: 2, title: "Master Request & Response Cycle" },
];

// Helper to read JSON request body from stream
function getRequestBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (err) {
        reject(err);
      }
    });
  });
}

// Helper to send JSON response
function sendJsonResponse(res, statusCode, data) {
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
}

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  // 1. GET / - Health / welcome check
  if (method === "GET" && url === "/") {
    return sendJsonResponse(res, 200, {
      message: "HTTP server is running smoothly",
    });
  }

  // 2. GET /notes - Read all notes
  if (method === "GET" && url === "/notes") {
    return sendJsonResponse(res, 200, notes);
  }

  // 3. POST /notes - Create a new note (201 Created)
  if (method === "POST" && url === "/notes") {
    try {
      const body = await getRequestBody(req);
      if (!body.title) {
        return sendJsonResponse(res, 400, { error: "Title is required" });
      }

      const newNote = {
        id: notes.length > 0 ? notes[notes.length - 1].id + 1 : 1,
        title: body.title,
      };

      notes.push(newNote);
      return sendJsonResponse(res, 201, newNote);
    } catch {
      return sendJsonResponse(res, 400, { error: "Invalid JSON format" });
    }
  }

  // 4. PUT /notes/:id or PATCH /notes/:id - Update a note
  if ((method === "PUT" || method === "PATCH") && url.startsWith("/notes/")) {
    const id = parseInt(url.split("/")[2], 10);
    const note = notes.find((n) => n.id === id);

    if (!note) {
      return sendJsonResponse(res, 404, { error: "Note not found" });
    }

    try {
      const body = await getRequestBody(req);
      if (body.title) {
        note.title = body.title;
      }
      return sendJsonResponse(res, 200, note);
    } catch {
      return sendJsonResponse(res, 400, { error: "Invalid JSON format" });
    }
  }

  // 5. DELETE /notes/:id - Remove a note
  if (method === "DELETE" && url.startsWith("/notes/")) {
    const id = parseInt(url.split("/")[2], 10);
    const index = notes.findIndex((n) => n.id === id);

    if (index === -1) {
      return sendJsonResponse(res, 404, { error: "Note not found" });
    }

    notes.splice(index, 1);
    return sendJsonResponse(res, 200, { message: "Note deleted successfully" });
  }

  // Fallback: 404 Not Found
  return sendJsonResponse(res, 404, { error: "Route not found" });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`HTTP Server running at http://localhost:${PORT}`);
});
