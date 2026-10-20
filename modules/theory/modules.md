# Node.js Module System: CommonJS and ES Modules

## 1. What is a Module?

A module is a file that contains variables, functions, classes, or other code that can be shared with other files. Other files use it through `import` or `require`.

Node.js supports two module systems:

1. **CommonJS (CJS)**: The default in Node.js. Uses `require` and `module.exports`.
2. **ES Modules (ESM)**: The official JavaScript standard. Uses `import` and `export`.

---

## 2. CommonJS (CJS)

### Step 1: Export from a file

There are three common ways to export.

**A. Multiple exports (an object)**

`math.js`:

```javascript
function add(a, b) {
  return a + b;
}

function multiply(a, b) {
  return a * b;
}

module.exports = { add, multiply };
```

**B. Single export (a function or class)**

`greet.js`:

```javascript
module.exports = function greet(name) {
  return `Hello, ${name}!`;
};
```

**C. Property-by-property export**

`logger.js`:

```javascript
module.exports.info = (msg) => console.log(`[INFO]: ${msg}`);
module.exports.error = (msg) => console.error(`[ERROR]: ${msg}`);
```

### Step 2: Import with `require()`

`main.js`:

```javascript
// 1. Import the whole object
const math = require("./math");
console.log(math.add(2, 3)); // 5
console.log(math.multiply(2, 3)); // 6

// 2. Destructure only what you need
const { add } = require("./math");
console.log(add(10, 5)); // 15

// 3. Import a single function
const greet = require("./greet");
console.log(greet("Vishal")); // Hello, Vishal!

// 4. Import property-by-property exports
const logger = require("./logger");
logger.info("Application started");
```

---

## 3. How Node Runs a CommonJS File

Before running a CommonJS file, Node wraps its code in a function, called the **module wrapper**:

```javascript
(function (exports, require, module, __filename, __dirname) {
  // Your module code runs here
});
```

Because of this wrapper:

- Variables stay inside the file and don't leak into the global scope.
- `module`, `exports`, `require`, `__filename`, and `__dirname` are available in every CommonJS file without being imported.

---

## 4. The `exports` vs `module.exports` Gotcha

`exports` is a reference to `module.exports`. Adding properties to it works:

```javascript
exports.add = (a, b) => a + b; // Works
```

But reassigning `exports` breaks the link, so nothing gets exported:

```javascript
exports = function greet() {}; // Broken: exports stays an empty object
module.exports = function greet() {}; // Correct
```

> **Rule of thumb:** Always use `module.exports` to avoid this bug.

---

## 5. Path Resolution Rules

| Written as                          | Where Node looks                               | Example                                   |
| :---------------------------------- | :--------------------------------------------- | :---------------------------------------- |
| **Relative path** (`./` or `../`)   | Relative to the current file                   | `require("./math")`                       |
| **Absolute path** (`/` or `C:\...`) | From the root of the filesystem                | `require("C:/app/config")`                |
| **Core built-in module**            | Node's standard library (no install needed)    | `require("fs")` or `require("node:http")` |
| **Third-party module**              | Inside `node_modules/`                         | `require("express")`                      |
| **Folder path**                     | `index.js` or `package.json` inside the folder | `require("./routes")`                     |

If you leave out the extension, Node tries `.js`, then `.json`, then `.node`.

---

## 6. CommonJS vs. ES Modules

| Feature                        | CommonJS (CJS)                   | ES Modules (ESM)                                        |
| :----------------------------- | :------------------------------- | :------------------------------------------------------ |
| **Import syntax**              | `const math = require("./math")` | `import math from "./math.js"`                          |
| **Export syntax**              | `module.exports = { add }`       | `export { add }` or `export default add`                |
| **Loading**                    | Synchronous, at runtime          | Asynchronous, resolved before the code runs             |
| **Extension in path**          | Optional (`require("./math")`)   | Required (`import "./math.js"`)                         |
| **Top-level `await`**          | Not supported                    | Supported                                               |
| **`__dirname` / `__filename`** | Available                        | Not available (use `import.meta.url`)                   |
| **How to enable**              | Default for `.js` files          | Add `"type": "module"` to `package.json`, or use `.mjs` |

---

## 7. Key Takeaways

1. **Caching:** A module runs once. Later `require()` calls return the cached result from `require.cache`.
2. **Encapsulation:** Keep helper variables inside the file, and export only what other files need.
3. **Explicit paths:** Writing the full file name, such as `./math.js`, makes the path clearer and helps when moving to ESM.
