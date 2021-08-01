const crypto = require("crypto");
const hash = crypto.createHash('sha256');
const fs = require('fs');
const encrypt = require("./encrypt");
const decrypt = require("./decrypt");
const myData= {
    fname: "Charchit",
    lname: "Dahal",
    socialSecurityNumber:"adgsdygsygihdghdskhgdgegkhjbdsytgegkjbakhdgfettbahgjbadtgo87etbakuyfgeytg"
};

const mydataString = JSON.stringify(myData);
hash.update(mydataString);
const hashData = hash.digest('hex');

const senderPrivateKey = fs.readFileSync(__dirname  + "/id_rsa_priv.pem","utf-8");
const signedMessage = encrypt.encryptWithPrivateKey(senderPrivateKey,hashData);
const packageData={
    algorithm:"sha256",
    originalData:myData,
    signedAndEncryptedData: signedMessage
};

module.exports.packageData = packageData;