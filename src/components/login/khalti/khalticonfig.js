import myKey from "./khaltikey";
import axios from 'axios';
let config = {
    // replace this key with yours
    "publicKey": myKey.publictestkey,
    "productIdentity": "1234567890",
    "productName": "TECHNTELL",
    "productUrl": "http://localhost:3000",
    "eventHandler": {
        onSuccess (payload) {
            // hit merchant api for initiating verfication
            console.log(payload);
           

let data = {
    "token": payload.token,
    "amount": payload.amount
};

let config = {
    headers: {'Authorization':myKey.secretKey}
};

axios.get("https://khalti.com/api/v2/payment/verify/", data, config)
    .then(response => {
        console.log(response.data);
        alert("thank you for shopping");
    })
    .catch(error => {
        console.log(error);
        alert("thank you for shopping");
    });
        },
        // onError handler is optional
        onError (error) {
            // handle errors
            console.log(error);
        },
        onClose () {
            console.log('widget is closing');
        }
    },
    "paymentPreference": ["KHALTI", "EBANKING","MOBILE_BANKING", "CONNECT_IPS", "SCT"],
};
export default config;