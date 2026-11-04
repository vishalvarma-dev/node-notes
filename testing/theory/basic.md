# Software Testing Basics (Node.js)

## 1. What is Software Testing?

**Software testing** is the process of verifying that an application works as expected and identifying bugs before they affect users.

In simple terms, testing helps us check whether our code produces the correct output for different inputs and scenarios.

### Example

Suppose we have a function that adds two numbers.

```javascript
function add(a, b) {
  return a + b;
}

add(5, 3); // Expected: 8
```

We need to verify that the function returns the expected result.

```javascript
const result = add(5, 3);

console.log(result === 8); // true
```

This is a simple example of manual verification.

In real-world applications, we use testing frameworks to automate these checks.

---

## 2. Why Do We Need Testing?

Imagine we are developing an e-commerce application.

It contains features such as:

- User registration and login
- Product listing
- Shopping cart
- Payment processing
- Order management

Suppose we modify the shopping cart logic.

That change might accidentally break the checkout process.

Without testing, we may discover the problem only after users encounter it.

### Benefits of Testing

1. **Detect bugs early:** Identify issues before deployment.
2. **Prevent regressions:** Ensure new changes do not break existing functionality.
3. **Improve code quality:** Encourage modular and maintainable code.
4. **Increase confidence:** Make refactoring and adding features safer.
5. **Reduce debugging time:** Catch unexpected behavior automatically.

**Important:** Testing reduces the risk of bugs, but it does not guarantee that an application is completely bug-free.

---

## 3. Types of Software Testing

There are three important testing levels developers should understand.

### A. Unit Testing

Unit testing verifies a small, isolated piece of code, such as a function.

**Example:**

```javascript
function multiply(a, b) {
  return a * b;
}
```

Using Jest:

```javascript
test("should multiply two numbers", () => {
  expect(multiply(4, 5)).toBe(20);
});
```

Here, we are testing only the `multiply()` function.

**Use cases:**

- Utility functions
- Data transformations
- Calculation logic
- Validation functions

### B. Integration Testing

Integration testing verifies whether multiple components work correctly together.

For example, an Express API may involve:

```text
HTTP Request
     |
     v
Express Route
     |
     v
Validation Middleware
     |
     v
Controller
     |
     v
HTTP Response
```

An integration test can verify that the route, middleware, and controller work together correctly.

**Example:**

```javascript
const response = await request(app).get("/api/users");

expect(response.statusCode).toBe(200);
```

Here, Supertest sends an HTTP request to the Express application.

If the endpoint also interacts with a real test database, the test can verify database integration as well.

**Use cases:**

- Express routes
- Authentication middleware
- API validation
- Database operations

### C. End-to-End (E2E) Testing

End-to-end testing verifies an entire user workflow from beginning to end.

**Example: User Login**

```text
User opens login page
        |
        v
Enters email and password
        |
        v
Clicks Login
        |
        v
Frontend sends API request
        |
        v
Backend validates credentials
        |
        v
User reaches dashboard
```

An E2E test verifies that the complete flow works correctly.

**Common tools:**

- Playwright
- Cypress

---

## 4. Difference Between Unit, Integration, and E2E Testing

| Feature      | Unit                    | Integration         | E2E                        |
| ------------ | ----------------------- | ------------------- | -------------------------- |
| Scope        | Individual function     | Multiple components | Complete workflow          |
| Speed        | Usually fast            | Moderate            | Usually slower             |
| Complexity   | Low                     | Medium              | High                       |
| Example      | Test password validator | Test login API      | Test login through browser |
| Common tools | Jest                    | Jest + Supertest    | Playwright, Cypress        |

---

## 5. Manual Testing vs Automated Testing

### Manual Testing

A developer manually executes test scenarios and verifies the results.

Example using Postman:

1. Open Postman.
2. Select the POST method.
3. Enter `/api/login`.
4. Provide email and password.
5. Send the request.
6. Verify the response.

### Automated Testing

We write code that executes test scenarios automatically.

Example using Jest and Supertest:

```javascript
test("should return 401 for invalid credentials", async () => {
  const response = await request(app).post("/api/login").send({
    email: "test@example.com",
    password: "wrong-password",
  });

  expect(response.statusCode).toBe(401);
});
```

This test assumes the application has a login endpoint that returns `401` for invalid credentials.

### Key Difference

| Manual Testing                  | Automated Testing               |
| ------------------------------- | ------------------------------- |
| Performed by a developer/tester | Executed by code                |
| Requires manual effort          | Can run repeatedly              |
| Useful for exploration          | Useful for regression checks    |
| Slower for repetitive scenarios | Faster for repetitive scenarios |

Both approaches are useful in real-world development.

---

## 6. What Are Jest, Supertest, and Postman?

### Jest

Jest is a JavaScript testing framework.

It provides:

- Test execution
- Assertions
- Mocking
- Test reports
- Setup and teardown hooks

Example:

```javascript
test("addition works", () => {
  expect(2 + 3).toBe(5);
});
```

### Supertest

Supertest is a Node.js library used to test HTTP endpoints.

It works well with Express applications.

Example:

```javascript
const response = await request(app).get("/api/users");

expect(response.statusCode).toBe(200);
```

Supertest sends the request, while Jest checks the result.

### Postman

Postman is an API development and testing tool.

It allows us to:

- Send GET, POST, PUT, PATCH, and DELETE requests
- Configure request headers
- Send JSON request bodies
- Test authentication
- Inspect status codes and responses
- Organize requests into collections
- Write API test scripts

---

## 7. What Should We Test in a REST API?

Consider a user registration endpoint:

`POST /api/register`

We should test different scenarios.

| Scenario                 | Expected Result           |
| ------------------------ | ------------------------- |
| Valid registration data  | 201 Created               |
| Missing required field   | 400 Bad Request           |
| Invalid email format     | 400 Bad Request           |
| Email already registered | 409 Conflict              |
| Unexpected server error  | 500 Internal Server Error |

These are example API response conventions. Actual status codes depend on the application's API contract.

Testing should cover both successful and unsuccessful scenarios.

---

## 8. Important Testing Terminology

**Test Case:** A specific scenario used to verify functionality.

**Assertion:** A condition that checks whether the actual result matches the expected result.

**Test Suite:** A collection of related test cases.

**Mock:** A simulated dependency used to isolate code during testing.

**Regression Testing:** Re-running tests to ensure existing functionality still works after code changes.

**Code Coverage:** A measurement of how much code was executed during testing. High coverage does not automatically mean high-quality tests.

---

## 9. Testing Best Practices

1. Write tests for both success and failure scenarios.
2. Keep tests independent of one another.
3. Use descriptive test names.
4. Avoid using production databases for testing.
5. Mock external dependencies when appropriate.
6. Test important business logic and edge cases.
7. Run automated tests before deployment.
8. Keep test data predictable and repeatable.

---

## 10. Summary

- Software testing verifies that code behaves as expected.
- Unit testing checks individual functions.
- Integration testing checks how components work together.
- E2E testing checks complete user workflows.
- Postman is useful for manual API testing.
- Jest is used to write and run automated JavaScript tests.
- Supertest helps test Express HTTP endpoints.
- Testing helps prevent regressions and improves confidence when changing code.

## Interview Questions

1. What is software testing, and why is it important?
2. What is the difference between unit testing and integration testing?
3. What is regression testing?
4. What is the difference between Jest and Supertest?
5. Can automated testing completely replace manual testing?
