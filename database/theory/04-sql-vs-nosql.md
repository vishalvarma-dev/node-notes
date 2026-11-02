# Part 4: SQL vs NoSQL

Parts 2 and 3 introduced relational databases and other database types. This part explains the two big families that people always compare: **SQL** and **NoSQL**.

We continue with the same library example.

---

## Part A: What is SQL?

**SQL (Structured Query Language)** is the language you use to talk to a relational database. You use it to create tables and to search, add, change, and delete data.

Here is a real example — finding all books Rahul has borrowed:

```sql
-- Find all books Rahul has borrowed
SELECT books.name, loans.due_date
FROM loans
JOIN users ON loans.user_id = users.id
JOIN books ON loans.book_id = books.id
WHERE users.name = 'Rahul';
```

**Reading this query line by line:**

| Line                                   | What it does                                              |
|----------------------------------------|-----------------------------------------------------------|
| `SELECT books.name, loans.due_date`    | Show me the book name and the due date.                   |
| `FROM loans`                           | Start from the `loans` table.                             |
| `JOIN users ON loans.user_id = users.id` | Link `loans` to `users` by matching the user ID.        |
| `JOIN books ON loans.book_id = books.id` | Link `loans` to `books` by matching the book ID.        |
| `WHERE users.name = 'Rahul'`           | Only show results where the user's name is Rahul.         |

> **JOIN** = combining two tables by matching a shared ID. This is how the database follows the foreign key links from Part 2.

You do not need to memorize the syntax now. The key idea: SQL works with **tables**, and it connects them using **JOIN**.

**Examples of SQL databases:** MySQL, PostgreSQL, Oracle, SQL Server.

---

## Part B: What is NoSQL?

**NoSQL** stands for **"Not Only SQL."** It is a family of databases that do **not** store data in fixed, rigid tables. This family includes the document, key-value, and graph types from Part 3.

> Note: "Not Only SQL" is a retronym — the name was invented *after* these databases already existed, just to give the category a label. Do not over-think it.

**Simple way to think of it:**
- An SQL database is like a strict official form — every field is predefined, and you must fill them all in.
- A NoSQL database is like a flexible folder — each folder can hold different things in different shapes.

**Examples of NoSQL databases:** MongoDB (document), Redis (key-value), Neo4j (graph).

---

## Part C: The Key Differences

| Point                  | SQL (Relational)                                  | NoSQL                                                    |
|------------------------|---------------------------------------------------|----------------------------------------------------------|
| **Structure**          | Fixed tables and columns, defined in advance      | Flexible — items can have different fields               |
| **Relationships**      | Tables linked by keys, combined with JOIN         | Data often stored together, or linked in other ways      |
| **Query language**     | SQL — one standard language across all SQL DBs    | Varies by database (each has its own)                    |
| **Accuracy rules**     | Strict — every change must follow the rules       | Often more relaxed, to allow speed and scale             |
| **Growing the system** | Usually by upgrading to a bigger, more powerful server (vertical scaling) | Usually by adding more servers (horizontal scaling) |

### Schema: fixed vs flexible

- **SQL:** you define the structure first. For example, `loans` must have `user_id`, `book_id`, and `due_date`. Any data that does not fit that shape is rejected.
- **NoSQL:** no fixed structure required. One user document may have a phone number field, and another may not. Both are valid.

---

## Part D: Which One Fits the Library?

The library has two very different kinds of data, and they fit different families.

### Data 1: Book loans

- Every loan **must** have a user, a book, and a due date.
- A loan must never be lost, duplicated, or corrupted.
- The library must be able to answer "how many books is each user holding right now?"

**Best fit: SQL.** Accuracy and strict rules matter more than flexibility.

### Data 2: Reading activity logs

- Millions of small events every day: "Rahul opened Atomic Habits at 10:02," "Amit searched for Harry Potter."
- Each event may have different details — some events have a page number, others do not.
- Missing a few events is acceptable, but the system must handle massive volumes quickly.

**Best fit: NoSQL.** Flexibility and scale matter more than strict rules.

> **Real world:** Most production systems use **both**. SQL for the important records (loans, payments, accounts), and NoSQL for high-volume or flexible data (logs, sessions, caches).

---

## Part E: Quick Decision Guide

Ask these questions about your data:

| Question                                                                  | If yes, lean toward |
|---------------------------------------------------------------------------|---------------------|
| Does the data have a fixed structure that must not change?                | **SQL**             |
| Must every change follow strict rules (money, stock counts)?              | **SQL**             |
| Does the data change shape often, or do items have different fields?      | **NoSQL**           |
| Do you need to handle very large volumes by adding more servers?          | **NoSQL**           |

---

## Part F: Common Confusion

**"SQL" is used in two ways.** Strictly, SQL is just the language. The databases that use it are called relational databases. In everyday talk, people say "SQL database" to mean "relational database."

**NoSQL does not mean "no rules."** NoSQL databases still store and protect data. They just organize it differently.

**NoSQL is not always faster.** It depends on the kind of work you are doing. For the right task, each family can be very fast.

---

## Quick Check

1. What does JOIN do in a SQL query?
2. What is the difference between SQL (the language) and an SQL database?
3. Why are the book loans a better fit for SQL, and the reading logs a better fit for NoSQL?
4. A library wants to store user preferences, and each user may choose different settings. Which family fits better — and why?

Reply with **"next"** to continue to Part 5: Database Relationships (`05-database-relationships.md`).
