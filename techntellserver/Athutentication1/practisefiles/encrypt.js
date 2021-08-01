const crypto = require("crypto");
 function encryptWithPublickey(publicKey,message){
    const bufferMessage = Buffer.from(message,'utf-8');
    return crypto.publicEncrypt(publicKey, bufferMessage);
 }
 
 function encryptWithPrivateKey(privateKey,message){
     const bufferMessage= Buffer.from(message,"utf-8");
     return crypto.privateEncrypt(privateKey, bufferMessage);
 }
 module.exports.encryptWithPublickey= encryptWithPublickey;
 module.exports.encryptWithPrivateKey= encryptWithPrivateKey;