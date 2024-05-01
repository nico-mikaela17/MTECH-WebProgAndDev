//This app will take 2 command line arguments: encrypt or decrypt followed by a fileName.
//-able to encrypt a plain text,$node crypto.js encrypt aPlainText.txt
//-able to decrypt an encrypted file back to a plain text file.$node crypto.js decrypt encryptedFile.out
const crypto = require("crypto");
const fs = require("fs");
let control = process.argv[2];
const fileName = process.argv[3];

if (control === "encrypt") {
  encrypt(fileName);
} else if (control === "decrypt") {
  decrypt(fileName);
}

function encrypt(fileName) {
  const algorithm = "aes-192-cbc";
  const password = "uybUFUBHkjnhgyjFHBB552";
  // Use the async `crypto.scrypt()` instead.
  const key = crypto.scryptSync(password, "salt", 24);
  // The IV is usually passed along with the ciphertext.
  const iv = Buffer.alloc(16, 0); // Initialization vector.
  // input file
  const inFile = fs.createReadStream(fileName);
  // output file
  const outFile = fs.createWriteStream(fileName + ".out");
  // encrypt content
  const encrypt = crypto.createCipheriv(algorithm, key, iv);
  // start pipe
  inFile.pipe(encrypt).pipe(outFile);
}

function decrypt(fileName) {
  const algorithm = "aes-192-cbc";
  const password = "uybUFUBHkjnhgyjFHBB552";
  // Use the async `crypto.scrypt()` instead.
  const key = crypto.scryptSync(password, "salt", 24);
  // The IV is usually passed along with the ciphertext.
  const iv = Buffer.alloc(16, 0); // Initialization vector.
  // input file
  const inFile = fs.createReadStream(fileName);
  // output file
  const outFile = fs.createWriteStream(fileName + ".out");
  // decrypt content
  const decrypt = crypto.createDecipheriv(algorithm, key, iv);
  // start pipe
  inFile.pipe(decrypt).pipe(outFile);
}
