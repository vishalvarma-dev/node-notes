# Part 3: Database Types

Not all databases store data in the same way. The type you choose depends on the kind of data you have and the questions you need to answer.

We use the same library example from Parts 1 and 2. For each type you will see:

1. **How the data looks** — a diagram or example.
2. **When to use it** — a real scenario.

---

## Type 1: Relational Database

### How the data looks

Data is stored in tables. Tables are linked by keys (exactly as shown in Part 2).

```
 users                    loans                         books
+----+-------+-----+    +---------+---------+----------+    +-----+---------------+
| id | name  | age |    | user_id | book_id | due_date |    | id  | name          |
+----+-------+-----+    +---------+---------+----------+    +-----+---------------+
| 1  | Rahul |  22 | <--| 1       | 101     | 05-11-26 |    | 101 | Atomic Habits |
| 2  | Amit  |  25 | <--| 2       | 102     | 06-11-26 |--> | 102 | Harry Potter  |
+----+-------+-----+    +---------+---------+----------+    +-----+---------------+
```

The arrows show the links: `loans.user_id` points to `users.id`, and `loans.book_id` points to `books.id`.

### When to use it

**Scenario:** The library must know exactly how many books each user has borrowed, and no loan record can ever be lost or wrong.

**Use relational when:** data has a clear, fixed structure and must stay accurate — for example, bank accounts, school records, or orders.

**Examples:** MySQL, PostgreSQL, Oracle, SQL Server.

---

## Type 2: Document Database

### What is a document?

Before we look at a document database, let's define two terms:

> **JSON** — a simple text format for storing data as labelled values, like this:
> `"name": "Rahul"`, `"age": 22`. It is the most common format used by document databases.

> **Document** — one complete record about one item, stored as a single unit in JSON format. Think of it as one paper file in a cabinet: everything about that person sits in one folder.

In a relational database, Rahul's data is split across three tables (`users`, `loans`, `books`). In a document database, everything about Rahul lives **inside one document**.

> **Collection** — a group of documents of the same kind. In a relational database this would be called a table. In a document database it is called a collection.

### How the data looks

Here is the library's **users collection**, where each user is one document:

```
Document 1 (Rahul)                      Document 2 (Amit)
+------------------------------------+  +------------------------------------+
| {                                  |  | {                                  |
|   "name": "Rahul",                 |  |   "name": "Amit",                  |
|   "age": 22,                       |  |   "age": 25,                       |
|   "loans": [                       |  |   "loans": [                       |
|     {                              |  |     {                              |
|       "book": "Atomic Habits",     |  |       "book": "Harry Potter",      |
|       "due": "05-11-2026"          |  |       "due": "06-11-2026"          |
|     }                              |  |     }                              |
|   ]                                |  |   ]                                |
| }                                  |  | }                                  |
+------------------------------------+  +------------------------------------+
```

Each document holds everything about one user. To see Rahul's name and loans, the database reads **one document** — no joining of separate tables needed.

### Same question, two databases

To make the difference clear, here is one question answered in both styles.

**Question 1: "Show me Rahul's profile with his loans."**

- **Relational:** read `users` for Rahul → read `loans` where `user_id = 1` → read `books` for each `book_id`. That is three separate table reads, joined together.
- **Document:** read Rahul's document. Done in one step.

**Question 2: "Which users borrowed Harry Potter?"**

- **Relational:** look in `loans` where `book_id = 102`, then look up the names. One straightforward query.
- **Document:** the database must open **every user's document** and check whether their loans list contains "Harry Potter." This works, but it is slow when there are millions of users.

**The trade-off:**

| Situation                                    | Better choice |
|----------------------------------------------|---------------|
| Reading one whole item (e.g., a profile page) | Document      |
| Searching across all items for a value        | Relational    |

### When to use it

**Scenario:** The library app shows a user profile page. It needs the name, age, and current loans all at once, and different users may have different fields (some have a phone number, others do not).

**Good fits for document data:** user profiles, product catalogs (each product has different specs), content pages, blog posts.

**Examples:** MongoDB, CouchDB.

---

## Type 3: Key-Value Database

### How the data looks

Every value is stored under a unique key. You give the key, and you instantly get the value back. There are no tables, no columns, no queries — just a key pointing directly to a value.

```
 KEY                     VALUE
+--------------------+   +---------------------------+
| session_user_1     |-->| Rahul logged in at 10:02  |
+--------------------+   +---------------------------+
| session_user_2     |-->| Amit logged in at 10:15   |
+--------------------+   +---------------------------+
| cart_user_1        |-->| [Atomic Habits]            |
+--------------------+   +---------------------------+
```

To find Rahul's session, you look up the key `session_user_1` directly. The database does not search through any other data — it goes straight to the value. This makes it extremely fast.

### When to use it

**Scenario:** The library website must check on every page load whether a visitor is logged in. It must do this in a few milliseconds, for thousands of users at the same time.

**Use key-value when:** you need very fast lookups by one known key — for example, login sessions, shopping carts, or caching frequently used results.

**Examples:** Redis, Amazon DynamoDB.

---

## Type 4: Graph Database

### How the data looks

Data is stored as **nodes** (the things) and **edges** (the connections between them).

- A **node** is one item — a person, a book, a city.
- An **edge** is a relationship between two nodes — "is friends with", "borrowed", "recommended".

```
 [Rahul] ---friend---> [Amit] ---borrowed---> [Harry Potter]
                                                     ^
                                                     |
                             recommended to Rahul ---+
```

Reading the diagram:
- Rahul is friends with Amit.
- Amit borrowed Harry Potter.
- So the library can recommend Harry Potter to Rahul.

### When to use it

**Scenario:** The library wants a "Readers like you also borrowed" feature. It needs to follow chains of friends and their books to find good recommendations.

**Use graph when:** the connections between things are the main question — for example, social networks, recommendation engines, or "friends of friends of friends."

**Examples:** Neo4j, Amazon Neptune.

---

## Comparing All Four Types

| Type           | Stores data as                  | Best at                              | Example           |
|----------------|---------------------------------|--------------------------------------|-------------------|
| **Relational** | Tables linked by keys           | Accurate, structured data            | MySQL, PostgreSQL |
| **Document**   | One complete document per item  | Reading a whole item; varied fields  | MongoDB           |
| **Key-Value**  | Key → value pairs               | Very fast lookups by one known key   | Redis             |
| **Graph**      | Nodes and edges (connections)   | Questions about relationships        | Neo4j             |

**Simple rule:**
- Fixed structure, must stay accurate → **Relational**
- Read whole items with different fields → **Document**
- Very fast lookups by one key → **Key-Value**
- Connections matter most → **Graph**

---

## Quick Check

1. In the document example, where is Rahul's loan information stored — in a separate table, or inside his document?
2. Why is "Show me Rahul's profile with his loans" easier with a document database?
3. Why is "Which users borrowed Harry Potter?" easier with a relational database?
4. Why is a key-value database better than a relational database for the login check on every page load?
5. Which type would best answer "Which books have my friends read?" — and why?

Reply with **"next"** to continue to Part 4: SQL vs NoSQL (`04-sql-vs-nosql.md`).
