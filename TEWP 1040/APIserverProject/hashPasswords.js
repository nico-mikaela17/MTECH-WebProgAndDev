// hashPasswords.js
const bcrypt = require('bcrypt');

const generateHash = async (plainPassword) => {
  const saltRounds = 10;
  const hash = await bcrypt.hash(plainPassword, saltRounds);
  console.log(hash);
};

// Replace 'yourpassword' with the actual password you want to hash
generateHash('asdf');
