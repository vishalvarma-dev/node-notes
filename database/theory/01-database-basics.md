# Part 1: Database Basics

## What is a Database?

A **database** is an organized collection of related data, stored electronically in a computer system.

A database is always managed by software called a **DBMS (Database Management System)**, which handles storing, finding, and protecting the data. Think of the database as the filing cabinet, and the DBMS as the person who manages it. (DBMS is covered in detail in Part 2.)

Throughout this part, we use one example: a **library** that stores information about its users and books.

---

## Building a Database, Step by Step

### Step 1 — Collection

A **collection** is simply a group of related data kept together.

The library needs to keep track of two things:

- **Users** — information about everyone who has a library membership.
- **Books** — information about every book the library owns.

### Step 2 — Organized

**Organized** means keeping each kind of data separate so it is easy to manage and find.

- `users` — stores user information.
- `books` — stores book information.


We do not mix users and books into one big list. Each type of data lives in its own group.


### Step 3 — Structured

**Structured** means storing data in a fixed format, using **rows** and **columns**, just like a spreadsheet.

#### `users` table

| id  | name  | age |
| --- | ----- | --- |
| 1   | Rahul | 22  |
| 2   | Amit  | 25  |

#### `books` table

| id    | name            | author         |
| ----- | --------------- | -------------- |
| 101   | Atomic Habits   | James Clear    |
| 102   | Harry Potter    | J.K. Rowling   |

Each table has:

- **Columns** — define what kind of information is stored. For example, `name` and `age` are columns in the `users` table.
- **Rows** — each row is one complete record. The row for Rahul is one row.

**Remember this hierarchy:**

```
Database
  └── Tables
        └── Rows
              └── Columns
```

---

## Data, Information, and Knowledge


These three words are often confused. Here is how they differ:

| Term            | Meaning                            | Library example                                                            |
| --------------- | ---------------------------------- | -------------------------------------------------------------------------- |
| **Data**        | Raw facts with no context          | `22`, `"Rahul"`, `101`                                                     |
| **Information** | Data placed in context             | "Rahul is 22 years old."                                                   |
| **Knowledge**   | Information used to make decisions | "Rahul is 22, likely a student — recommend student-friendly books to him." |

---

## Why Not Just Use Files?

Before databases existed, people stored data in spreadsheets or plain text files. This caused serious problems:

  | Problem | What it means |
  |----------------------|-------------------------------------------------------------------------------|
  | **Redundancy** | The same data is copied in many places. Rahul's details appear in every file. |
  | **Inconsistency** | One copy gets updated, the others do not. Now you have two different "Rahuls."|
  | **Difficult access** | Answering a new question means writing new code every time. |
  | **Concurrency** | Two people editing the same file at the same time can overwrite each other's work. |
  | **Security** | Hard to control who can see which parts of the data. |

A database solves all of these problems.

---

## Core Components of a Database System

  | Component | What it is |
  |--------------|----------------------------------------------------------------------------------------------|
  | **Data** | The actual records stored — names, ages, book titles, etc. |
  | **DBMS** | The software that creates, reads, updates, and deletes data, and enforces rules. |
  | **Metadata** | Data _about_ the data — for example, "the `users` table has three columns: `id`, `name`, `age`." This is stored in a **data dictionary** (also called a catalog). |
  | **Users** | Three kinds: end users (who use apps), developers (who build apps), and DBAs (who manage the database). |

> **Metadata example:** If the `users` table has columns `id`, `name`, and `age`, that column list is metadata. It describes the structure, not the actual user records.

---

## Key Terms

Each term is shown using the library tables above.

  | Term | Meaning | Library example |
  |-------------------------------|-----------------------------------------------------------|--------------------------------------------------|
  | **Table** (relation) | A grid of rows and columns storing one kind of thing. | The `users` table. |
  | **Row** (record, tuple) | One complete entry about a single item. | The row for Rahul. |
  | **Column** (field, attribute) | One property that every row in the table has. | `name` and `age` in the `users` table. |
  | **Schema** | The blueprint — decides which tables and columns exist. | "`users` has `id`, `name`, and `age`." |
  | **Instance** | The actual data stored at a given moment. | The two rows (Rahul, Amit) in `users` right now. |

**Simple way to remember:**

- The **schema** is the blank form (the structure).
- The **instance** is the filled-in form (the real data).

---

## Quick Check

1. In the `users` table, what is a row and what is a column?
1. What is the difference between a schema and an instance?
1. In the "Why Not Just Use Files?" table, what does **concurrency** mean in plain words?

Reply with **"next"** to continue to Part 2: DBMS and RDBMS (`02-dbms-and-rdbms.md`).
