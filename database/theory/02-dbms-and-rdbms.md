# Part 2: DBMS and RDBMS

We continue with the same library example from Part 1.

---

## Part A: What is a DBMS?

A **DBMS (Database Management System)** is the software that manages a database. You never touch the stored data directly — you always go through the DBMS.

**Simple way to think of it:** The DBMS is the librarian. You ask for a book, and the librarian finds it, keeps the shelves in order, and makes sure only allowed people can take certain books.

### How it works

```
You (or your app)
       |
       |  ask to read / add / change / delete data
       v
+-------------------+
|       DBMS        |   <-- the software (e.g. MySQL, MongoDB)
+-------------------+
       |
       v
+-------------------+
|     Database      |   <-- the actual stored data
+-------------------+
```

You never skip the DBMS and go straight to the database. The DBMS checks your request, enforces rules, and then carries it out.

### The four basic jobs — CRUD

| Job        | Meaning      | Library example                         |
|------------|--------------|-----------------------------------------|
| **Create** | Add new data | Register a new user                     |
| **Read**   | Find data    | Show all books by J.K. Rowling          |
| **Update** | Change data  | Update Rahul's age from 22 to 23        |
| **Delete** | Remove data  | Remove a user who cancelled membership  |

**Common DBMS software:** MySQL, PostgreSQL, Oracle, Microsoft SQL Server, MongoDB.

---

## Part B: What is an RDBMS?

An **RDBMS (Relational Database Management System)** is a DBMS that stores data in **tables** and links those tables together using **keys**.

- **DBMS** = any software that manages data.
- **RDBMS** = a DBMS where data lives in tables that are connected to each other.

**Simple rule:** every RDBMS is a DBMS, but not every DBMS is an RDBMS.

---

## Part C: The Library with Three Tables

To see why linked tables are useful, we will extend the library example from Part 1.

The library now needs to record **which user borrowed which book**. We add a third table called `loans`.

### The three tables

**`users` table**

| id | name  |
|----|-------|
| 1  | Rahul |
| 2  | Amit  |

**`books` table**

| id  | name          |
|-----|---------------|
| 101 | Atomic Habits |
| 102 | Harry Potter  |

**`loans` table**

| user_id | book_id | due_date   |
|---------|---------|------------|
| 1       | 101     | 05-11-2026 |
| 2       | 102     | 06-11-2026 |

---

## Part D: How to Read the Loans Table

The `loans` table does **not** repeat names. It stores only IDs. Here is exactly how to read it, step by step.

**Row 1 of `loans`:**

```
user_id = 1  |  book_id = 101  |  due_date = 05-11-2026
```

**Step 1 — Find the user:**
Look at `user_id = 1`. Go to the `users` table. Find the row where `id = 1`. That is **Rahul**.

```
loans.user_id = 1  ──────────────────────>  users.id = 1  →  Rahul
```

**Step 2 — Find the book:**
Look at `book_id = 101`. Go to the `books` table. Find the row where `id = 101`. That is **Atomic Habits**.

```
loans.book_id = 101  ─────────────────────>  books.id = 101  →  Atomic Habits
```

**Step 3 — Put it together:**
> **Rahul borrowed Atomic Habits, due on 05-11-2026.**

Do the same for Row 2:
> **Amit borrowed Harry Potter, due on 06-11-2026.**

---

## Part E: Why Store IDs Instead of Names?

You might wonder: why not just write the names directly in `loans`?

**If we stored names directly (the wrong way):**

| user_name | book_name     | due_date   |
|-----------|---------------|------------|
| Rahul     | Atomic Habits | 05-11-2026 |
| Rahul     | Atomic Habits | 12-11-2026 |

Now imagine Rahul changes his name to "Rahul Kumar." You would have to find and update **every single loan row** that contains "Rahul." If there are 200 loans, you update 200 rows — and if you miss one, the data becomes inconsistent.

**With IDs (the right way):**
Rahul's name is stored **once** in the `users` table (row with `id = 1`). All loans just point to `id = 1`. If Rahul's name changes, you update it in **one place**, and every loan automatically reflects the change.

---

## Part F: Keys — How the Tables Are Linked

| Key type        | What it is                                             | Example                                          |
|-----------------|--------------------------------------------------------|--------------------------------------------------|
| **Primary key** | The column that uniquely identifies each row in a table. No two rows can share the same value. | `id` in `users`. No two users have the same `id`. |
| **Foreign key** | A column that points to a primary key in another table. This is the link. | `user_id` in `loans` points to `id` in `users`. |

```
users.id (Primary Key)
    ^
    |
loans.user_id (Foreign Key)  ──>  users.id
loans.book_id (Foreign Key)  ──>  books.id
```

---

## Part G: DBMS vs RDBMS — Summary

|                      | DBMS                                        | RDBMS                        |
|----------------------|---------------------------------------------|------------------------------|
| **Stores data in**   | Any format (files, documents, key-values)   | Tables                       |
| **Links between data** | Not required                              | Built in, using keys         |
| **Example**          | MongoDB (documents), Redis (key-values)     | MySQL, PostgreSQL, Oracle    |

---

## Quick Check

1. Draw (or describe) the flow: who sits between you and the stored data?
2. In the `loans` table, what does the row `2 | 102 | 06-11-2026` mean? Write out all three steps.
3. Why does `loans` store `user_id` instead of the user's name?
4. Which column is the primary key in `books`? Which column in `loans` is a foreign key pointing to `books`?

Reply with **"next"** to continue to Part 3: Database Types (`03-database-types.md`).
