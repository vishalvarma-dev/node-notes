# Postman — API Testing Basics

## 1. What is Postman?

**Postman** is an API development and testing tool that allows developers to send HTTP requests to a server and inspect its responses without building a frontend.

For example, suppose we have created a login API using Express.js.

Normally, the frontend sends the user's email and password to the backend.

But what if our frontend is not ready?

We can use Postman to send requests directly to the backend and verify that the API works correctly.

---

## 2. Why Do We Need Postman?

While developing backend applications, we frequently need to verify:

- Whether an API endpoint is working.
- Whether the API accepts the correct request body.
- Whether authentication is working.
- Whether validation errors are handled correctly.
- Whether the server returns the expected status code.
- Whether the response contains the expected data.

Postman helps us test these scenarios independently of the frontend.

### Example: User Registration

Suppose our backend exposes:

`POST /api/register`

We can send:

```json
{
  "name": "Rahul",
  "email": "rahul@example.com",
  "password": "Password123"
}
```

Expected response:

```json
{
  "success": true,
  "message": "User registered successfully"
}
```

We can verify the response directly in Postman.

---

## 3. Understanding HTTP Requests

Before using Postman, we should understand the main parts of an HTTP request.

```text
HTTP Request
│
├── Method
│   └── GET, POST, PUT, PATCH, DELETE
│
├── URL
│   └── http://localhost:3000/api/users
│
├── Headers
│   └── Content-Type: application/json
│
├── Query Parameters
│   └── ?page=1&limit=10
│
└── Body
    └── JSON data
```

### Common HTTP Methods

| Method | Purpose                          |
| ------ | -------------------------------- |
| GET    | Retrieve data                    |
| POST   | Create data or perform an action |
| PUT    | Replace an existing resource     |
| PATCH  | Partially update a resource      |
| DELETE | Delete a resource                |

### Common HTTP Status Codes

| Status | Meaning               |
| ------ | --------------------- |
| 200    | OK                    |
| 201    | Created               |
| 204    | No Content            |
| 400    | Bad Request           |
| 401    | Unauthorized          |
| 403    | Forbidden             |
| 404    | Not Found             |
| 409    | Conflict              |
| 500    | Internal Server Error |

---

## 4. Installing Postman

Download Postman from:

https://www.postman.com/downloads/

You can use the Postman desktop application to test APIs running on your local machine.

---

## 5. Creating a Simple Express API

Let's create a small API that we can test using Postman.

Install Express:

```bash
npm install express
```

Create `app.js`:

```javascript
import express from "express";

const app = express();

app.use(express.json());

const users = [
  { id: 1, name: "Rahul" },
  { id: 2, name: "Amit" },
];

// GET API
app.get("/api/users", (req, res) => {
  res.status(200).json({
    success: true,
    users,
  });
});

// POST API
app.post("/api/users", (req, res) => {
  const { name } = req.body;

  if (typeof name !== "string" || !name.trim()) {
    return res.status(400).json({
      success: false,
      message: "Name is required",
    });
  }

  const user = {
    id: users.length + 1,
    name: name.trim(),
  };

  users.push(user);

  res.status(201).json({
    success: true,
    user,
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
```

Run:

```bash
node app.js
```

This example stores users in memory, so the data resets when the server restarts. It is intended only for learning.

---

## 6. Testing a GET API in Postman

**Step 1:** Open Postman.

**Step 2:** Create a new HTTP request.

**Step 3:** Select the GET method.

**Step 4:** Enter the URL:

```text
http://localhost:3000/api/users
```

**Step 5:** Click Send.

Expected response:

```json
{
  "success": true,
  "users": [
    { "id": 1, "name": "Rahul" },
    { "id": 2, "name": "Amit" }
  ]
}
```

Expected status: `200 OK`

---

## 7. Testing a POST API in Postman

Now let's create a new user.

**Step 1:** Select the POST method.

**Step 2:** Enter:

```text
http://localhost:3000/api/users
```

**Step 3:** Open the Body tab.

**Step 4:** Select raw and choose JSON.

**Step 5:** Enter:

```json
{
  "name": "Priya"
}
```

**Step 6:** Click Send.

Expected response:

```json
{
  "success": true,
  "user": {
    "id": 3,
    "name": "Priya"
  }
}
```

Expected status: `201 Created`

The ID assumes this is the first user created after starting the example server.

---

## 8. What Are Headers?

Headers provide additional information about an HTTP request or response.

### Content-Type

The `Content-Type` header describes the format of the request body.

Example:

```text
Content-Type: application/json
```

This tells the server that we are sending JSON data.

### Authorization

The `Authorization` header is commonly used to send authentication credentials.

Example:

```text
Authorization: Bearer YOUR_ACCESS_TOKEN
```

In Postman, we can configure this using the Authorization tab and selecting Bearer Token.

The backend must verify the token before allowing access to protected resources.

---

## 9. Query Parameters vs Path Parameters

### Query Parameters

Query parameters are commonly used for filtering, searching, sorting, and pagination.

Example:

```text
GET /api/users?page=1&limit=10
```

In Express:

```javascript
app.get("/api/users", (req, res) => {
  const { page, limit } = req.query;

  res.json({ page, limit });
});
```

Query parameter values are received as strings unless we explicitly convert them.

### Path Parameters

Path parameters identify a specific resource.

Example:

```text
GET /api/users/5
```

In Express:

```javascript
app.get("/api/users/:id", (req, res) => {
  const { id } = req.params;

  res.json({ userId: id });
});
```

### Difference

| Query Parameters         | Path Parameters                  |
| ------------------------ | -------------------------------- |
| `?page=1`                | `/users/5`                       |
| Often used for filtering | Often used to identify resources |
| Access using `req.query` | Access using `req.params`        |

---

## 10. What Are Collections in Postman?

A **collection** is a group of saved API requests.

For example:

```text
User Management API
│
├── GET All Users
├── GET User By ID
├── POST Create User
├── PATCH Update User
└── DELETE User
```

Collections help organize requests and make it easier to reuse and share API testing workflows.

---

## 11. What Are Postman Environment Variables?

Environment variables allow us to store reusable values such as:

- Base URLs
- Access tokens
- Test user IDs

For example, create a variable:

```text
baseUrl = http://localhost:3000
```

Instead of writing:

```text
http://localhost:3000/api/users
```

We can write:

```text
{{baseUrl}}/api/users
```

This is useful when switching between development, staging, and production environments.

Avoid sharing sensitive tokens or passwords in exported environments or collections.

---

## 12. Writing Automated Assertions in Postman

Postman also supports automated tests using JavaScript.

Open a request's **Scripts → Post-response** section and add:

```javascript
pm.test("Status code is 200", function () {
  pm.response.to.have.status(200);
});
```

This verifies that the API returns status code `200`.

### Validate Response Body

```javascript
pm.test("Response contains users", function () {
  const response = pm.response.json();

  pm.expect(response.success).to.eql(true);
  pm.expect(response.users).to.be.an("array");
});
```

These tests are suitable for the GET `/api/users` request.

### Validate Response Time

```javascript
pm.test("Response time is below 500ms", function () {
  pm.expect(pm.response.responseTime).to.be.below(500);
});
```

Response-time assertions can be useful for basic checks, but results depend on network conditions and server performance. They are not a substitute for dedicated load testing.

---

## 13. Testing Error Scenarios

We should not test only successful responses.

For example, send a POST request with an empty body:

```json
{}
```

Expected response:

```json
{
  "success": false,
  "message": "Name is required"
}
```

Expected status: `400 Bad Request`

We can write a Postman test:

```javascript
pm.test("Should reject missing name", function () {
  pm.response.to.have.status(400);

  const response = pm.response.json();

  pm.expect(response.success).to.eql(false);
  pm.expect(response.message).to.eql("Name is required");
});
```

Testing failure scenarios helps verify that APIs handle invalid requests correctly.

---

## 14. Postman vs Jest vs Supertest

| Tool      | Main Purpose                                     |
| --------- | ------------------------------------------------ |
| Postman   | API development, manual and scripted API testing |
| Jest      | JavaScript test runner, assertions and mocking   |
| Supertest | HTTP testing for Node.js applications            |

**Postman** is useful when developing and exploring APIs.

**Jest + Supertest** is useful when writing automated API tests that run as part of the project's test suite or CI/CD pipeline.

These tools complement each other rather than replacing one another.

---

## 15. Best Practices

1. Organize API requests using collections.
2. Use environment variables for base URLs.
3. Verify HTTP status codes.
4. Check response body structures.
5. Test successful and unsuccessful scenarios.
6. Verify authentication and authorization.
7. Avoid exposing sensitive credentials.
8. Keep test data separate from production data.
9. Automate frequently repeated checks.
10. Include API tests in your development workflow.

---

## 16. Summary

- Postman allows developers to test APIs without a frontend.
- HTTP requests contain methods, URLs, headers, and sometimes bodies.
- Query parameters are accessed using `req.query`.
- Path parameters are accessed using `req.params`.
- Collections organize API requests.
- Environment variables make requests reusable.
- Postman supports automated assertions using JavaScript.
- Testing should include both successful and error scenarios.

## Interview Questions

1. What is Postman, and why do developers use it?
2. What is the difference between request headers and request bodies?
3. What is the difference between query parameters and path parameters?
4. How do you test an authenticated API in Postman?
5. Can we write automated tests using Postman?
6. What is the difference between Postman and Supertest?
