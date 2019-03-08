# Node.js library for SMS Gate

*This library requires a minimum node.js version of 7*


## Installation

```bash
npm install smsgate
```

## Send SMS

```js
const SMSGate = require("smsgate");

//make sure to set the real sms gate url
let gate = new SMSGate.Client('http://localhost:9000/bulk_server')
gate.send({
    "type": "text",
    "auth": { "username": "testuser", "password": "testpassword" },
    "sender": "BulkTest",
    "receiver": "4179123456",
    "dcs": SMSGate.DCS_GSM,
    "text": "This is test message with expected DLR",
    "dlrUrl": "http://localhost:8000/dlr", //make sure to set your real webhook handler url
    "dlrMask": SMSGate.DLR_MASK_STANDARD
}).then(response => {
    console.log("SMS sent", response);
}).catch(error => {
    console.log("SMS error", error);
});
```

## Receive DLRs

```js
//depending if you are using a framework or not, it might vary
//in general raw body payload should be parsed into js object
let dlr =JSON.parse(body);
console.log("DLR received", dlr);
```

Check `examples` directory for more details.
To run examples locally run from the command line

```bash
cd examples
node index.js
```

and then open `http://localhost:8000/`
