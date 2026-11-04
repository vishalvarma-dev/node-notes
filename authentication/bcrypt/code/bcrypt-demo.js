const bcrypt = require("bcrypt");

async function main() {
  // 1. SIGNUP: hash the password once and store the result
  const password = "myPassword123";
  const storedHash = await bcrypt.hash(password, 12);
  console.log("Stored in database:", storedHash);

  // 2. Same password, hashed again: the output is different
  //    because each hash gets a new random salt
  const secondHash = await bcrypt.hash(password, 12);
  console.log("Hash again (different):", secondHash);

  // 3. LOGIN with the correct password
  const correct = await bcrypt.compare("myPassword123", storedHash);
  console.log("Login with correct password:", correct); // true

  // 4. LOGIN with a wrong password
  const wrong = await bcrypt.compare("myPassword124", storedHash);
  console.log("Login with wrong password:", wrong); // false
}

main();
