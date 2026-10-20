// ---------------------------------------------
// Ways to Import in CommonJS
// ---------------------------------------------

// 1. Import full module object (Multiple exports from math.js)
const math = require("./math");
console.log("1. math.add(2, 3) =", math.add(2, 3));
console.log("   math.multiply(2, 3) =", math.multiply(2, 3));

// 2. Destructure specific functions directly
const { add, multiply } = require("./math");
console.log("2. Destructured add(10, 5) =", add(10, 5));
console.log("   Destructured multiply(4, 2) =", multiply(4, 2));

// 3. Import a single function/class export (greet.js)
const greet = require("./greet");
console.log("3. greet('Vishal') =", greet("Vishal"));

// 4. Import property-by-property exports (logger.js)
const logger = require("./logger");
logger.info("Application initialized successfully");
logger.error("Sample error message");

// 5. Dynamic import() inside CommonJS (Promise-based)
// (Useful when you need to load an ES Module or load conditionally)
async function loadAsync() {
  const dynamicMath = await import("./math.js");
  console.log("5. Dynamic import() in CJS:", dynamicMath.default?.add ? dynamicMath.default.add(7, 3) : "loaded dynamically");
}
loadAsync();
