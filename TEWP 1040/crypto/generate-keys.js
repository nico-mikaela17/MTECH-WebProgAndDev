const openpgp = require("openpgp");
const fs = require("fs");

generate();
async function generate() {
  const { privateKey, publicKey } = await openpgp.generateKey({
    type: "ecc", //Type of the key, default ECC
    curve: "curve25519",
    userIDs: [{ name: "Nicole", email: "mikaelafs17@gmail.com" }],
    passphrase: "oliver", //protects the private key
    format: "armored", //other options: binary
  });
  fs.writeFileSync("./keys/private.key", privateKey);
  fs.writeFileSync("./keys/public.key", publicKey);
  console.log("Keys generated and written to file...");
}
