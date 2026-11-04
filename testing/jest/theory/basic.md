# Jest — JavaScript Testing Framework

## 1. What is Jest?

**Jest** is a JavaScript testing framework used to write, execute, and manage automated tests.

It helps developers verify whether their JavaScript code behaves as expected.

Jest provides:

- A test runner to execute tests.
- Assertions to compare actual and expected results.
- Matchers to verify different types of values.
- Mocking to isolate dependencies.
- Setup and teardown hooks.
- Code coverage reports.

### Simple Example

Suppose we have a function:

```javascript
function add(a, b) {
  return a + b;
}
```

We want to verify that `add(5, 3)` returns `8`.

Using Jest:

```javascript
test("should add two numbers", () => {
  expect(add(5, 3)).toBe(8);
});
```

If the result is `8`, the test passes. Otherwise, Jest reports a failure.

---

## 2. Why Do We Need Jest?

Imagine we are developing a backend application with multiple utility functions:

- Calculate discounts.
- Validate user input.
- Calculate order totals.
- Format API responses.
- Check user permissions.

After modifying one function, we need to ensure that its existing behavior still works correctly.

Manually checking every function after each change is time-consuming.

**Jest automates these checks**, making it easier to detect bugs and prevent regressions.

### Benefits

1. Automated testing.
2. Faster regression checks.
3. Easier debugging.
4. Safer code refactoring.
5. Integration with CI/CD pipelines.
6. Built-in mocking and coverage support.

---

## 3. How Does Jest Work?

```text
JavaScript Function
        |
        v
Write a Test Case
        |
        v
Execute Jest
        |
        v
Run the Function
        |
        v
Compare Actual vs Expected
        |
        v
   ┌──────────────┐
   |              |
 PASS            FAIL
```

Jest executes test functions and evaluates their assertions.

If an assertion fails, Jest reports the failure and provides details about the expected and received values.

---

## 4. Installing Jest

For a Node.js project, install Jest as a development dependency:

```bash
npm install --save-dev jest
```

We use `--save-dev` because Jest is generally required during development and testing, not for running the production application.

### Configure package.json

For a CommonJS project:

```json
{
  "scripts": {
    "test": "jest"
  }
}
```

For a project using ES modules (`"type": "module"`), we can use Jest's experimental ESM support:

```json
{
  "type": "module",
  "scripts": {
    "test": "node --experimental-vm-modules node_modules/jest/bin/jest.js"
  }
}
```

This ESM configuration is suitable for our learning examples, but Jest's native ESM support is still experimental. The examples below use ES module syntax.

Run tests:

```bash
npm test
```

---

## 5. Writing Our First Jest Test

Create this structure:

```text
testing/
└── jest/
    ├── basics.md
    └── examples/
        ├── math.js
        └── math.test.js
```

### math.js

```javascript
export function add(a, b) {
  return a + b;
}

export function multiply(a, b) {
  return a * b;
}
```

### math.test.js

```javascript
import { test, expect } from "@jest/globals";
import { add, multiply } from "./math.js";

test("should add two numbers", () => {
  expect(add(5, 3)).toBe(8);
});

test("should multiply two numbers", () => {
  expect(multiply(4, 5)).toBe(20);
});
```

Run:

```bash
npm test
```

Expected output:

```text
PASS  testing/jest/examples/math.test.js

✓ should add two numbers
✓ should multiply two numbers

Test Suites: 1 passed, 1 total
Tests:       2 passed, 2 total
```

---

## 6. Understanding test(), expect(), and Matchers

Consider:

```javascript
test("should add two numbers", () => {
  expect(add(5, 3)).toBe(8);
});
```

### test()

The `test()` function defines an individual test case.

Syntax:

```javascript
test("description", () => {
  // Assertions
});
```

It accepts a description and a callback function containing the test logic.

### expect()

The `expect()` function creates an assertion object for a value.

```javascript
expect(add(5, 3));
```

Here, `add(5, 3)` is the actual result.

### Matchers

Matchers verify whether the actual result satisfies a particular condition.

```javascript
.toBe(8)
```

Here, `8` is the expected result.

**Formula:**

```text
test(description, callback)

expect(actualValue).matcher(expectedValue)
```

---

## 7. Common Jest Matchers

### A. toBe()

Used to compare primitive values using `Object.is()` semantics.

```javascript
test("checks numbers", () => {
  expect(10).toBe(10);
});
```

### B. toEqual()

Used for comparing the contents of arrays and objects.

```javascript
test("checks an object", () => {
  const user = {
    name: "Rahul",
    age: 25,
  };

  expect(user).toEqual({
    name: "Rahul",
    age: 25,
  });
});
```

### Difference Between toBe() and toEqual()

```javascript
const obj1 = { name: "Rahul" };
const obj2 = { name: "Rahul" };

expect(obj1).toBe(obj2); // FAIL
expect(obj1).toEqual(obj2); // PASS
```

Why?

Because `obj1` and `obj2` are different object references, even though their contents are equal.

### C. toBeTruthy() and toBeFalsy()

```javascript
test("checks truthy and falsy values", () => {
  expect(1).toBeTruthy();
  expect("").toBeFalsy();
  expect(null).toBeFalsy();
});
```

### D. toBeNull() and toBeUndefined()

```javascript
test("checks null and undefined", () => {
  expect(null).toBeNull();
  expect(undefined).toBeUndefined();
});
```

### E. toContain()

Used to verify whether an array or string contains a value.

```javascript
test("checks array contents", () => {
  const skills = ["React", "Node.js", "PostgreSQL"];

  expect(skills).toContain("Node.js");
});
```

### F. toHaveLength()

```javascript
test("checks array length", () => {
  const users = ["Rahul", "Amit"];

  expect(users).toHaveLength(2);
});
```

### G. toThrow()

Used to verify whether a function throws an error.

```javascript
function divide(a, b) {
  if (b === 0) {
    throw new Error("Cannot divide by zero");
  }

  return a / b;
}

test("throws an error for division by zero", () => {
  expect(() => divide(10, 0)).toThrow("Cannot divide by zero");
});
```

We pass a function to `expect()` so Jest can execute it and catch the error.

---

## 8. What Is describe()?

`describe()` groups related test cases into a test suite.

Example:

```javascript
import { describe, test, expect } from "@jest/globals";

describe("Math Operations", () => {
  test("should add two numbers", () => {
    expect(2 + 3).toBe(5);
  });

  test("should multiply two numbers", () => {
    expect(4 * 5).toBe(20);
  });
});
```

Benefits:

- Better organization.
- Easier debugging.
- Clearer test reports.
- Grouping related functionality.

---

## 9. Testing Asynchronous Functions

Node.js applications frequently use asynchronous operations such as API calls and database queries.

Jest supports testing promises using `async/await`.

### Example

```javascript
async function getUser() {
  return {
    id: 1,
    name: "Rahul",
  };
}

test("should return user data", async () => {
  const user = await getUser();

  expect(user).toEqual({
    id: 1,
    name: "Rahul",
  });
});
```

**Important:** Always return or await asynchronous work so Jest knows when the test has completed.

### Testing Rejected Promises

```javascript
async function getUserById(id) {
  if (!id) {
    throw new Error("User ID is required");
  }

  return { id };
}

test("should reject when ID is missing", async () => {
  await expect(getUserById(null)).rejects.toThrow("User ID is required");
});
```

---

## 10. What Are Setup and Teardown Hooks?

Sometimes tests require initial setup or cleanup.

Jest provides four commonly used hooks.

| Hook         | Purpose                             |
| ------------ | ----------------------------------- |
| beforeAll()  | Runs once before tests in its scope |
| beforeEach() | Runs before each test               |
| afterEach()  | Runs after each test                |
| afterAll()   | Runs once after tests in its scope  |

### Example

```javascript
import { describe, test, expect, beforeEach } from "@jest/globals";

let users;

describe("User Operations", () => {
  beforeEach(() => {
    users = [];
  });

  test("should add a user", () => {
    users.push("Rahul");

    expect(users).toHaveLength(1);
  });

  test("should start with an empty array", () => {
    expect(users).toHaveLength(0);
  });
});
```

`beforeEach()` resets the array before each test, helping keep tests independent.

---

## 11. What Is Mocking in Jest?

**Mocking** is the process of replacing a real dependency with a controlled, simulated implementation during testing.

Suppose a function depends on an external service.

We may not want to call that service every time we run our tests.

Instead, we can create a mock.

### Example

```javascript
import { jest, test, expect } from "@jest/globals";

const sendEmail = jest.fn();

test("should call email service", () => {
  sendEmail("rahul@example.com");

  expect(sendEmail).toHaveBeenCalledWith("rahul@example.com");
});
```

Here, `jest.fn()` creates a mock function.

We can check:

- Whether it was called.
- How many times it was called.
- Which arguments were passed.
- What value it returned.

Mocking is especially useful for testing functions that depend on external APIs, email services, payment gateways, and database operations.

---

## 12. What Is Code Coverage?

Code coverage measures how much of the application code is executed when tests run.

Run:

```bash
npm test -- --coverage
```

Jest can report several coverage metrics.

| Metric             | Meaning                                  |
| ------------------ | ---------------------------------------- |
| Statement coverage | Percentage of statements executed        |
| Branch coverage    | Percentage of decision branches executed |
| Function coverage  | Percentage of functions executed         |
| Line coverage      | Percentage of lines executed             |

**Important:** 100% code coverage does not guarantee that all bugs have been detected.

Tests must also verify correct behavior and meaningful edge cases.

---

## 13. Jest vs Postman vs Supertest

| Tool      | Responsibility                                                    |
| --------- | ----------------------------------------------------------------- |
| Postman   | Send and test API requests                                        |
| Jest      | Execute tests and verify assertions                               |
| Supertest | Send HTTP requests to Node.js applications during automated tests |

### Example Workflow

```text
Express Application
        |
        v
Supertest Sends HTTP Request
        |
        v
Express Processes Request
        |
        v
Supertest Receives Response
        |
        v
Jest Verifies Assertions
        |
        v
      PASS / FAIL
```

Jest and Supertest are frequently used together for automated Express API testing.

---

## 14. Best Practices

1. Write descriptive test names.
2. Keep individual tests focused on specific behavior.
3. Test successful and failure scenarios.
4. Keep tests independent.
5. Use `describe()` to organize related tests.
6. Use `beforeEach()` when repeated setup is needed.
7. Mock external dependencies when appropriate.
8. Always await asynchronous operations.
9. Avoid relying only on code coverage percentages.
10. Run tests regularly during development.

---

## 15. Summary

- Jest is a JavaScript testing framework.
- `test()` defines a test case.
- `expect()` creates an assertion.
- Matchers verify expected results.
- `describe()` groups related tests.
- Jest supports asynchronous testing.
- Hooks manage setup and cleanup.
- Mocking helps isolate dependencies.
- Coverage reports measure executed code.
- Jest and Supertest can be combined for API testing.

## Interview Questions

1. What is Jest, and why is it used?
2. What is the difference between `toBe()` and `toEqual()`?
3. What is the purpose of `describe()`?
4. What is mocking, and why do we need it?
5. How do you test asynchronous functions in Jest?
6. What is the difference between `beforeAll()` and `beforeEach()`?
7. What is code coverage?
8. How does Jest differ from Supertest?
