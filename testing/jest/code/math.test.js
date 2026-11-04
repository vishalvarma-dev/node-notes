const { test, expect, describe } = require("@jest/globals");
const { add, subtract, multiply, divide, isEven, factorial } = require("./math.js");

// ─────────────────────────────────────────────────────────────────
// describe() groups related tests together — like a folder for tests.
// test()     is a single test case.
// expect()   wraps the value you want to check.
// toBe()     checks strict equality  (like ===)
// toEqual()  checks deep equality    (for objects/arrays)
// toBeTruthy() / toBeFalsy() checks boolean-like values
// toThrow()  checks if a function throws an error
// ─────────────────────────────────────────────────────────────────


// ─────────────────────────────────────────────
// 1. add()
// ─────────────────────────────────────────────
describe("add()", () => {
  test("adds two positive numbers", () => {
    expect(add(2, 3)).toBe(5);
  });

  test("adds a positive and a negative number", () => {
    expect(add(10, -4)).toBe(6);
  });

  test("adds two negative numbers", () => {
    expect(add(-5, -3)).toBe(-8);
  });

  test("adding zero does not change the value", () => {
    expect(add(7, 0)).toBe(7);
  });
});


// ─────────────────────────────────────────────
// 2. subtract()
// ─────────────────────────────────────────────
describe("subtract()", () => {
  test("subtracts two numbers", () => {
    expect(subtract(10, 4)).toBe(6);
  });

  test("result is negative when second number is larger", () => {
    expect(subtract(3, 10)).toBe(-7);
  });

  test("subtracting zero returns the same number", () => {
    expect(subtract(5, 0)).toBe(5);
  });
});


// ─────────────────────────────────────────────
// 3. multiply()
// ─────────────────────────────────────────────
describe("multiply()", () => {
  test("multiplies two positive numbers", () => {
    expect(multiply(3, 4)).toBe(12);
  });

  test("multiplying by zero always returns zero", () => {
    expect(multiply(99, 0)).toBe(0);
  });

  test("multiplying two negative numbers gives a positive result", () => {
    expect(multiply(-3, -4)).toBe(12);
  });

  test("multiplying by one returns the same number", () => {
    expect(multiply(7, 1)).toBe(7);
  });
});


// ─────────────────────────────────────────────
// 4. divide()
// ─────────────────────────────────────────────
describe("divide()", () => {
  test("divides two numbers correctly", () => {
    expect(divide(10, 2)).toBe(5);
  });

  test("dividing by 1 returns the same number", () => {
    expect(divide(8, 1)).toBe(8);
  });

  test("throws an error when dividing by zero", () => {
    // We wrap in an arrow fn so Jest can catch the thrown error
    expect(() => divide(10, 0)).toThrow("Cannot divide by zero");
  });
});


// ─────────────────────────────────────────────
// 5. isEven()
// ─────────────────────────────────────────────
describe("isEven()", () => {
  test("returns true for an even number", () => {
    expect(isEven(4)).toBeTruthy();
  });

  test("returns false for an odd number", () => {
    expect(isEven(7)).toBeFalsy();
  });

  test("zero is considered even", () => {
    expect(isEven(0)).toBe(true);
  });
});


// ─────────────────────────────────────────────
// 6. factorial()
// ─────────────────────────────────────────────
describe("factorial()", () => {
  test("factorial of 0 is 1", () => {
    expect(factorial(0)).toBe(1);
  });

  test("factorial of 1 is 1", () => {
    expect(factorial(1)).toBe(1);
  });

  test("factorial of 5 is 120", () => {
    expect(factorial(5)).toBe(120);
  });

  test("throws an error for negative numbers", () => {
    expect(() => factorial(-1)).toThrow(
      "Factorial is not defined for negative numbers"
    );
  });
});
