# bcrypt & Password Hashing

## The Problem: Why Can't We Store Plain Passwords?

When a user signs up on a website, they give us a password like `mySecretPassword123`.

If we store this password directly in the database as **plain text**:
- If a hacker breaches the database, every single user's password is stolen instantly.
- Rogue employees or anyone with read access to the database can see everyone's passwords.
- Because people reuse the same password across multiple websites (Google, bank, shopping apps), a breach on one small website compromises the user's entire digital life.

Therefore: **Never store plain text passwords in a database.**

---

## What is a Hash?

A **hash function** is a mathematical algorithm that takes an input of any length (a word, a paragraph, or even an entire movie) and converts it into a scrambled, fixed-length string of characters called a **hash** (or **digest**).

### Real-World Analogy: The Fruit Blender 🍎🍌🍓

Think of a hash function like a kitchen blender:
- You put in an apple, banana, and strawberry (**input**).
- You blend them together into a smoothie (**hash output**).
- If you use the exact same fruits every time, you get the exact same smoothie (**deterministic**).
- But once you have the smoothie, can you turn it back into the original whole apple, banana, and strawberry? **No, it is impossible!** (**one-way**).

### Core Properties of Hashing

| Property | What it Means | Real-World Example |
| :--- | :--- | :--- |
| **One-Way (Irreversible)** | You cannot reverse or "decrypt" a hash back to the original text. | `hash("cat")` gives `77af...`, but you cannot calculate `cat` from `77af...`. |
| **Deterministic** | The same input always produces the exact same hash output. | `"hello"` hashed today, tomorrow, or 10 years from now gives the same hash. |
| **Fixed Output Length** | No matter how short or long the input is, the output size is always fixed. | Hashing the word `"hi"` or the entire *Harry Potter* series produces a 64-character hash in SHA-256. |
| **Avalanche Effect** | Changing just one character changes the entire output drastically. | `"cat"` and `"Cat"` produce completely different, unrecognizable hashes. |

### Hashing vs Encryption (Crucial Difference)

- **Encryption (Two-Way):** Information is locked using a secret key, and can be decrypted back to plain text using that key (e.g., sending messages on WhatsApp).
- **Hashing (One-Way):** Information is scrambled permanently. There is **no key** to undo it.

---

## Example: Fast Hashes (e.g., SHA-256)

Let's look at what SHA-256 does with simple text:

```text
Input:    "password123"
SHA-256:  ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f

Input:    "Password123" (Only changed 'p' to 'P')
SHA-256:  01ba4719c80b6fe911b091a7c05124b64eeece964e09c058ef8f9805daca546b
```

Notice how changing just one uppercase letter completely scrambles the output (the **avalanche effect**).

---

## Why Fast Hashes (MD5, SHA-256) Are Dangerous for Passwords

Algorithms like MD5, SHA-1, and SHA-256 were designed for **speed and data integrity** (e.g., checking if a 10 GB file downloaded without corruption, or verifying git commits).

Because they are fast, they are **terrible for passwords**:

### 1. Brute-Force Attacks on Modern GPUs
Modern graphics cards (GPUs) can calculate **billions of SHA-256 hashes per second**. An attacker who gets a leaked database can guess millions of passwords a second until they find a matching hash.

### 2. Rainbow Tables
A **rainbow table** is a massive, pre-computed lookup table containing millions of common passwords paired with their hashes.
- If the attacker sees hash `ef92b778bafe...` in your database, they look it up in their pre-made table and immediately know the password was `password123`.

### 3. Identical Passwords Look Identical
If User A and User B both choose `password123`:
```text
User A: hash("password123") -> 5e884898da28...
User B: hash("password123") -> 5e884898da28...
```
An attacker immediately knows both users share the exact same password.

---

## Enter bcrypt: The Solution

**bcrypt** is a password-hashing function designed by Niels Provos and David Mazières in 1999 specifically to fix these security flaws. It does two key things:

### 1. Salting (Prevents Rainbow Tables & Identical Hashes)

A **salt** is a cryptographically strong, random string generated uniquely for every single password before it is hashed.

```text
Password:  "secret"
Salt:      "x7$9K!m2"
Input:     "secret" + "x7$9K!m2" -> bcrypt hash
```

Even if User A and User B have the same password (`"secret"`):
- User A gets random salt `sAlt1` $\rightarrow$ Hash: `$2b$10$abc...`
- User B gets random salt `sAlt2` $\rightarrow$ Hash: `$2b$10$xyz...`

**Why this matters:**
- **Rainbow tables are useless:** Attackers cannot use pre-computed tables because every password uses a unique random salt.
- **Identical passwords look different:** No two hashes in your database look the same, even if users picked the same password.

### 2. Adaptive Cost Factor (Deliberately Slow)

bcrypt is deliberately **slow**. It has a configurable **cost factor** (work factor, e.g., 10, 12, or 14 rounds).

- The cost factor determines how many iterations of hashing are performed ($2^{\text{cost}}$ rounds).
- A cost factor of `10` runs $2^{10} = 1024$ rounds.
- A cost factor of `12` runs $2^{12} = 4096$ rounds.

**Why being slow is a superpower:**
- When a human logs in once, waiting **100 milliseconds** is completely unnoticeable.
- But for a hacker trying to guess 1 billion passwords, waiting 100 milliseconds per guess means it would take **over 3 years** instead of a few seconds!
- As computers get faster in the future, you can simply increase the cost factor from 10 to 12 or 14 without rewriting the algorithm.

---

## Anatomy of a bcrypt Hash

When you hash a password with bcrypt, the output looks something like this:

```text
$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy
│  │  │                     │
│  │  │                     └─ Hashed Password (31 characters)
│  │  └─────────────────────── Salt (22 characters)
│  └────────────────────────── Cost Factor (10 = 2^10 = 1024 rounds)
└───────────────────────────── Algorithm Version ($2a$, $2b$, or $2y$)
```

> **Notice:** The salt and cost are stored **inside the hash string itself**. You don't need a separate column in your database to store the salt!

---

## How Authentication Works with bcrypt

Since hashes cannot be reversed, how does a user log in?

### Step 1: User Registration (Sign Up)
1. User enters: `username: "alice"`, `password: "supersecret"`.
2. Server generates a unique random salt and hashes `"supersecret"` using bcrypt.
3. Server saves:
   - `username`: `"alice"`
   - `password`: `"$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy"`

### Step 2: User Login
1. User enters: `username: "alice"`, `password: "supersecret"`.
2. Server finds `"alice"` in the database and retrieves her stored bcrypt string.
3. Server calls `bcrypt.compare("supersecret", storedHash)`.
4. bcrypt extracts the **salt** and **cost factor** from the stored hash, hashes the entered password with that same salt and cost, and checks if the outputs match.
5. If they match $\rightarrow$ Login Successful! ✅
6. If they do not match $\rightarrow$ Invalid Password! ❌

---

## Code Example in Node.js

Here is a practical example using the popular `bcrypt` npm package:

```javascript
const bcrypt = require('bcrypt');

async function demo() {
  const plainPassword = 'myPassword123';
  const saltRounds = 10; // 2^10 iterations (~100ms)

  // 1. Hashing (During User Registration)
  const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
  console.log('Stored in Database:', hashedPassword);

  // 2. Verification (During User Login)
  const userEnteredPass = 'myPassword123';
  const wrongPass = 'wrongPassword';

  const isMatch = await bcrypt.compare(userEnteredPass, hashedPassword);
  console.log('Correct password match?', isMatch); // true

  const isWrongMatch = await bcrypt.compare(wrongPass, hashedPassword);
  console.log('Wrong password match?', isWrongMatch); // false
}

demo();
```

---

## Summary Checklist

- **Never** store passwords in plain text.
- **Never** use fast hashing algorithms like MD5 or SHA-256 for passwords.
- **Always** use a dedicated password hashing algorithm with a salt and work factor like **bcrypt** (or Argon2).
- The salt prevents rainbow table attacks.
- The cost factor slows down brute-force attacks.
- Verification compares the hash of the entered password against the stored hash—passwords are never decrypted.
