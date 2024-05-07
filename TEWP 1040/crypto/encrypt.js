const openpgp = require("openpgp");
const fs = require("fs");

const publicKeyArmored = fs.readFileSync("./keys/publicUse.key");

(async () => {
  const plainData = fs.readFileSync("./secret.txt");
  const encrypted = await openpgp.encrypt({
    message: await openpgp.createMessage({ text: plainData.toString() }),
    encryptionKeys: await openpgp.readKey({
      armoredKey: publicKeyArmored.toString(),
    }),
  });
  fs.writeFileSync("./encrypted-secret.txt", encrypted);
  console.log(`Data has been encrypted...`);
})();
