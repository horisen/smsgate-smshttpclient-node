"use strict";

const http = require('http');
const SMSGate = require("./../src/index.js");

const server = http.createServer((req, res) => {
    let gate = new SMSGate.Client('http://localhost:9000/bulk_server')
    switch (req.url) {
        case '/send':
        //send without dlr            
            gate.send({
                "type": "text",
                "auth": { "username": "testuser", "password": "testpassword" },
                "sender": "BulkTest",
                "receiver": "4179123456",
                "dcs": SMSGate.DCS_GSM,
                "text": "This is test message"
            }).then(response => {
                console.log("SMS sent", response);
                res.end("SMS sent" +  JSON.stringify(response));
            }).catch(error => {
                console.log("SMS error", error);
                res.end("SMS error" +  JSON.stringify(error));
            });        
            break;
        case '/send_dlr':
        //send with dlr
            gate.send({
                "type": "text",
                "auth": { "username": "testuser", "password": "testpassword" },
                "sender": "BulkTest",
                "receiver": "4179123456",
                "dcs": SMSGate.DCS_GSM,
                "text": "This is test message with expected DLR",
                "dlrUrl": "http://localhost:8000/dlr",
                "dlrMask": SMSGate.DLR_MASK_STANDARD
            }).then(response => {
                console.log("SMS sent", response);
                res.end("SMS sent" +  JSON.stringify(response));
            }).catch(error => {
                console.log("SMS error", error);
                res.end("SMS error" +  JSON.stringify(error));
            });        
            break;
        case '/dlr':
            //process DLR
            if (req.method != 'POST') {
                console.log("Invalid DLR request, expected POST, received: " + req.method);
                break;               
            }
            //gather request raw body string    
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });
            req.on('end', () => {
                try {
                    let dlr =JSON.parse(body);
                    console.log("DLR received", dlr);
                } catch (error) {
                    console.log("Invalid DLR request", error);
                }
                
            });        
            break;
        default:
        //index page
            res.end(`
            <!DOCTYPE html>
            <html>
                <head>
                    <title>Send SMS Examples</title>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                </head>
                <body>
                    <div>
                        <a href="/send">Send SMS</a><br>
                        <a href="/send_dlr">Send SMS with DLR</a> (watch console log for DLR updates)
                    </div>
                </body>
            </html>
            `);
            break;
    }
});
server.listen(8000);