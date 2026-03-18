const bcrypt = require("bcrypt");

async function hashPassword() {
  const pass1 = "admin123";
  const pass2 = "john123";

  const hash1 = await bcrypt.hash(pass1, 10);
  const hash2 = await bcrypt.hash(pass2, 10);

  console.log("admin hash:", hash1);
  console.log("john hash:", hash2);
}

hashPassword();