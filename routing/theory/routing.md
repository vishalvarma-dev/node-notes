## What is Routing

Routing determines how an application responds to a client request to a particular endpoint, which is a URI (or path) and a specific HTTP request method (`GET`, `POST`, `PUT`, `DELETE`, etc.).

In simple terms:
> **Route = HTTP Method + Path + Handler Function**

When a request hits your server, the router checks:
1. What **method** was used? (`GET`, `POST`, `DELETE`, etc.)
2. What **path** was requested? (`/notes`, `/users/10`, etc.)
3. Which **function** should handle it?

---

## Basic Route Structure

In Express, route definition takes the following structure:

```javascript
app.METHOD(PATH, HANDLER);
```

- `app`: An instance of Express.
- `METHOD`: An HTTP request method in lowercase (`get`, `post`, `put`, `patch`, `delete`).
- `PATH`: The path on the server (`/`, `/notes`, `/notes/:id`).
- `HANDLER`: The callback function executed when the route matches, receiving `(req, res)`.

```javascript
// Example
app.get('/notes', (req, res) => {
  res.send('Get all notes');
});
```

---

## Route Parameters (`req.params`)

Route parameters are named URL segments used to capture values at specific positions in the URL. Captured values populate the `req.params` object.

```javascript
// Path with route parameter :id
app.get('/notes/:id', (req, res) => {
  const noteId = req.params.id;
  res.send(`Note ID: ${noteId}`);
});
```

When a client requests `GET /notes/42`, `req.params` contains `{ id: '42' }`.

---

## Query Parameters (`req.query`)

Query strings appear after a `?` in the URL and are separated by `&`. Express automatically parses them into `req.query`.

```javascript
// Request: GET /notes?category=work&limit=5
app.get('/notes', (req, res) => {
  const { category, limit } = req.query;
  res.json({ category, limit });
});
```

---

## Route Handlers

You can provide multiple callback functions that behave like middleware to handle a request:

```javascript
app.get('/dashboard', authMiddleware, (req, res) => {
  res.send('Dashboard data');
});
```

You can also chain multiple handlers or use `app.route()` to define multiple methods for the same path:

```javascript
app.route('/notes')
  .get((req, res) => {
    res.json(notes);
  })
  .post((req, res) => {
    res.status(201).json({ message: 'Note created' });
  });
```

---

## Modular Routing with `express.Router`

As an application grows, keeping all routes in one file becomes messy. `express.Router` allows you to create modular, mountable route handlers.

A router instance is a complete middleware and routing system (often referred to as a "mini-app").

### 1. Define routes in a router module (`routes/notes.js`)

```javascript
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Get all notes');
});

router.post('/', (req, res) => {
  res.send('Create a note');
});

router.get('/:id', (req, res) => {
  res.send(`Get note ${req.params.id}`);
});

module.exports = router;
```

### 2. Mount the router in the main app (`server.js`)

```javascript
const express = require('express');
const noteRoutes = require('./routes/notes');

const app = express();

// Mount noteRoutes at the '/notes' prefix
app.use('/notes', noteRoutes);

app.listen(3000);
```

Any request starting with `/notes` is delegated to `noteRoutes`:
- `GET /notes` -> matches `router.get('/')`
- `POST /notes` -> matches `router.post('/')`
- `GET /notes/5` -> matches `router.get('/:id')`

---

## 404 Route Handler (Catch-all)

In Express, route handlers are executed in the order they are defined. If no route matches the incoming request, a catch-all handler placed at the bottom handles the 404 response:

```javascript
// Place at the very end of your routes
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});
```
