## What is HTTP

HTTP stands for **HyperText Transfer Protocol**. It is the set of rules that browsers, apps, and servers use to talk to each other on the web.

## What is a protocol

A protocol is a shared set of rules that two sides agree on so they can communicate.

Think of a language. When two people speak English, they understand each other because both know the grammar and vocabulary. They don't need to know how each other's brain works, only the agreed rules.

Computers work the same way. A client and a server can be built by different companies, in different languages, on different machines, and still talk to each other, as long as both follow the same protocol. A protocol defines:

- what a message looks like (its structure and order)
- what each part means (for example, `GET` means "fetch")
- how the conversation starts and ends
- how errors are reported (for example, `404` means "not found")

## The request and response cycle

HTTP works as a request and response cycle:

1. The **client** (a browser, a mobile app, or `curl`) sends a **request** to a server.
2. The **server** processes the request and sends back a **response**.

```text
  Client                         Server
    |                              |
    |  -- request ---------------? |
    |     GET /notes               |
    |                              |
    |  ?-------------- response -- |
    |     200 OK  [ ...notes... ]  |
```

HTTP is **stateless**: every request-response pair is completely independent. The server has no memory of the previous request. To keep a user logged in across requests, you attach **cookies**, **sessions**, or **tokens (JWT)** to the headers.

## What a request contains

- **Method:** what the client wants to do, such as `GET` or `POST`
- **URL / Path:** where it wants to do it. The full URL is `https://example.com/notes/42`; the path (or endpoint) is `/notes/42`. In Express, `req.url` gives the full path with query string, while `req.path` gives just the path.
- **Headers:** extra information, such as `Content-Type: application/json`
- **Body:** optional data, such as a new note's content (usually empty for `GET`)

## What a response contains

- **Status code:** the result, such as `200 OK` or `404 Not Found`
- **Headers:** metadata, such as `Content-Type`
- **Body:** the data itself, such as HTML or JSON

## HTTP methods

| Method | Purpose |
| :--- | :--- |
| `GET` | Fetch data. No body is sent. |
| `POST` | Create new data. Sends data in the body. |
| `PUT` | Replace an existing item entirely. |
| `PATCH` | Update part of an existing item. |
| `DELETE` | Remove data. |

## Status codes

| Range | Meaning | Common examples |
| :--- | :--- | :--- |
| `2xx` | Success | `200 OK`, `201 Created` |
| `3xx` | Redirection | `301 Moved Permanently` |
| `4xx` | Client error (you sent something wrong) | `400 Bad Request`, `401 Unauthorized`, `404 Not Found` |
| `5xx` | Server error (the server crashed or failed) | `500 Internal Server Error` |

## Real-world example

When you open `https://example.com/about` in your browser, it sends:

```text
GET /about HTTP/1.1
Host: example.com
Accept: text/html
```

The server replies:

```text
HTTP/1.1 200 OK
Content-Type: text/html

<html>
  <body>
    <h1>About us</h1>
  </body>
</html>
```

The browser sees `200 OK` and HTML content, so it renders the page.

## Why it matters for Express

When you write `app.get('/notes', handler)`, Express maps the HTTP cycle directly to your code:

```javascript
// When a GET request arrives at the path '/notes'...
app.get('/notes', (req, res) => {
  // req (Request) holds everything the client sent: method, path, headers, body
  console.log(req.headers);       // request headers
  console.log(req.params);        // URL params  e.g. /notes/:id
  console.log(req.query);         // query string e.g. /notes?done=true
  console.log(req.body);          // request body (POST / PATCH)

  // res (Response) lets you build and send the reply
  res.status(200).json({ message: 'Here are your notes' });
});
```

- `app.get(...)` listens for the HTTP **method** (`GET`).
- `'/notes'` matches the URL **path**.
- `req` gives you everything the client sent (headers, body, params).
- `res` gives you the tools to set the **status code** and **response body**.
