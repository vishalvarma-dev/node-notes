## What is middleware

Middleware is a function that runs between the incoming request and the final response. Each middleware can read or modify the request, read or modify the response, end the request-response cycle, or pass control to the next function with `next()`.

```text
                 Client (browser / app)
                   │
                   │  request
                   ▼
  ┌────────────────────────────────┐
  │ Middleware 1: auth             │  → if user is not allowed,
  │                                │    send 401 and stop
  └────────────────────────────────┘
                   │  next()
                   ▼
  ┌────────────────────────────────┐
  │ Middleware 2: CORS             │  → if domain is not allowed,
  │                                │    block it; otherwise next()
  └────────────────────────────────┘
                   │  next()
                   ▼
  ┌────────────────────────────────┐
  │ Route                          │  → res.send(), only reached
  │                                │    if all checks passed
  └────────────────────────────────┘
                   │
                   │  response
                   ▼
          Client gets the reply
```

If a middleware neither calls `next()` nor sends a response, the request stops there and hangs.t handles it.

## Middleware in Express

Express middleware functions take three arguments:

```javascript
function middleware(req, res, next) {
  // do something with req or res
  next(); // hand control to the next middleware
}
```

If a middleware neither calls `next()` nor sends a response, the request hangs.

### Example

```javascript
const express = require("express");
const app = express();

// Runs for every request
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  req.startTime = Date.now();
  next();
});

// Route handler, which ends the cycle by sending a response
app.get("/", (req, res) => {
  res.send(`Done in ${Date.now() - req.startTime}ms`);
});

app.listen(3000);
```

## Types of middleware

- **Application-level:** attached with `app.use()` or `app.get()`, and so on.
- **Router-level:** the same idea, attached to an `express.Router()` instance.
- **Built-in:** such as `express.json()` and `express.static()`.
- **Third-party:** such as `cors`, `helmet`, `morgan`, and `cookie-parser`.
- **Error-handling:** takes four arguments, `(err, req, res, next)`, and is registered after the routes.

```javascript
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong" });
});
```

## Scoping

```javascript
app.use("/api", authMiddleware); // only paths starting with /api
app.get("/admin", checkAdmin, adminHandler); // only this route
```

## Order matters

Middleware runs in the order it is registered. Placing `express.json()` after a route that reads `req.body` means the body will be `undefined` in that route.
