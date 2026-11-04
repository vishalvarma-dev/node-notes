// ============================================================
// Zod Validation - Code Examples
// Run: node zod-demo.js
// Install: npm install zod
// ============================================================

const { z } = require("zod");

// ─────────────────────────────────────────────
// 1. Basic Primitives
// ─────────────────────────────────────────────

const nameSchema = z.string().min(2, "Name must be at least 2 characters");
const ageSchema = z.number().min(18, "Must be 18 or older");
const emailSchema = z.string().email("Invalid email address");

console.log("=== 1. Basic Primitives ===");
console.log(nameSchema.parse("Alice"));       // "Alice"
console.log(ageSchema.parse(25));             // 25
console.log(emailSchema.parse("a@b.com"));    // "a@b.com"


// ─────────────────────────────────────────────
// 2. Object Schema (User Registration)
// ─────────────────────────────────────────────

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  age: z.number().min(18, "Age must be at least 18"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

console.log("\n=== 2. Object Schema ===");

// ✅ Valid data
const validUser = {
  name: "Alice",
  email: "alice@example.com",
  age: 25,
  password: "securePass1",
};

const result = registerSchema.safeParse(validUser);
console.log("Valid user:", result.success, result.data);

// ❌ Invalid data
const invalidUser = {
  name: "A",              // too short
  email: "invalid-email", // not a valid email
  age: 15,                // under 18
  password: "123",        // too short
};

const failResult = registerSchema.safeParse(invalidUser);
console.log("\nInvalid user errors:");
if (!failResult.success) {
  failResult.error.errors.forEach((err) => {
    console.log(`  Field: ${err.path[0]} → ${err.message}`);
  });
}


// ─────────────────────────────────────────────
// 3. Optional & Default Fields
// ─────────────────────────────────────────────

const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  price: z.number().positive("Price must be positive"),
  stock: z.number().int().min(0).default(0),    // default value
  description: z.string().optional(),           // not required
});

console.log("\n=== 3. Optional & Default Fields ===");

const product = productSchema.parse({
  name: "Laptop",
  price: 49999,
  // stock and description are omitted
});
console.log("Parsed product:", product);
// stock defaults to 0, description is undefined


// ─────────────────────────────────────────────
// 4. Enums
// ─────────────────────────────────────────────

const orderSchema = z.object({
  item: z.string(),
  status: z.enum(["pending", "shipped", "delivered", "cancelled"]),
});

console.log("\n=== 4. Enums ===");

const goodOrder = orderSchema.safeParse({ item: "Phone", status: "shipped" });
console.log("Good order:", goodOrder.success);

const badOrder = orderSchema.safeParse({ item: "Phone", status: "flying" });
console.log("Bad order (invalid status):", badOrder.success);
if (!badOrder.success) {
  console.log(" →", badOrder.error.errors[0].message);
}


// ─────────────────────────────────────────────
// 5. Arrays
// ─────────────────────────────────────────────

const tagsSchema = z.array(z.string()).min(1, "At least one tag required");

console.log("\n=== 5. Arrays ===");
console.log(tagsSchema.parse(["nodejs", "zod", "validation"])); // valid
const emptyTagResult = tagsSchema.safeParse([]);
console.log("Empty tags error:", emptyTagResult.error?.errors[0].message);


// ─────────────────────────────────────────────
// 6. Custom Validation with .refine()
// ─────────────────────────────────────────────

const passwordConfirmSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // which field to attach the error to
  });

console.log("\n=== 6. Custom Validation (.refine) ===");

const matchResult = passwordConfirmSchema.safeParse({
  password: "mySecret1",
  confirmPassword: "mySecret1",
});
console.log("Passwords match:", matchResult.success);

const mismatchResult = passwordConfirmSchema.safeParse({
  password: "mySecret1",
  confirmPassword: "wrongPass",
});
console.log("Passwords mismatch:", mismatchResult.success);
if (!mismatchResult.success) {
  console.log(" →", mismatchResult.error.errors[0].message);
}


// ─────────────────────────────────────────────
// 7. Using Zod as Express Middleware
// ─────────────────────────────────────────────

// This is how you'd plug Zod into an Express route cleanly:

/*

const express = require("express");
const app = express();
app.use(express.json());

// Reusable middleware factory
function validate(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        success: false,
        errors: result.error.errors.map((e) => ({
          field: e.path[0],
          message: e.message,
        })),
      });
    }
    req.body = result.data; // replace body with clean, parsed data
    next();
  };
}

app.post("/register", validate(registerSchema), (req, res) => {
  // req.body is guaranteed to be valid here
  res.json({ success: true, user: req.body });
});

app.listen(3000, () => console.log("Server running on port 3000"));

*/

// Sample response when validation fails:
// POST /register  { name: "A", email: "bad", age: 10, password: "123" }
// Response 400:
// {
//   "success": false,
//   "errors": [
//     { "field": "name",     "message": "Name must be at least 2 characters" },
//     { "field": "email",    "message": "Invalid email address" },
//     { "field": "age",      "message": "Age must be at least 18" },
//     { "field": "password", "message": "Password must be at least 8 characters" }
//   ]
// }

