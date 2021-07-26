const fs= require('fs');
const encrypt = require('./encrypt');
const decrypt = require("./decrypt");

const publicKey = fs.readFileSync(__dirname + '/id_rsa_pub.pem', 'utf-8');
const privateKey = fs.readFileSync(__dirname + "/id_rsa_priv.pem", "utf-8");

const encryptMessage = encrypt.encryptWithPublickey(publicKey,"Sashwat is pandu");
const decryptMessage = decrypt.decryptWithPrivatekey(privateKey,encryptMessage);

console.log(encryptMessage.toString());
console.log(decryptMessage.toString());