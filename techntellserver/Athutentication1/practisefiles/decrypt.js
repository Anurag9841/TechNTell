const crypto = require("crypto");
    function decryptWithPrivatekey(privateKey,encryptedMessage){
        return crypto.privateDecrypt(privateKey,encryptedMessage);
    }
    function decryptWithPublickey(publicKey,encryptedMessage){
        return crypto.publicDecrypt(publicKey,encryptedMessage);
    }
module.exports.decryptWithPrivatekey=decryptWithPrivatekey;
module.exports.decryptWithPublickey=decryptWithPublickey;
