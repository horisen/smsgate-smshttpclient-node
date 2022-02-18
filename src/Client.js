"use strict";

const http = require("http");
const https = require("https");
const url = require("url");

class Client {

    constructor(submitURL) {
        this.submitURL = submitURL;
    }

    httpClient() {
        if (this.submitURL.startsWith("https")) {
            return https;
        } else {
            return http;
        }
    }

    send(message) {

        let httpClient = this.httpClient()
        const data = JSON.stringify(message)
        const urlparams = url.parse(this.submitURL)

        const options = {
            hostname: urlparams.hostname,
            port: urlparams.port,
            path: urlparams.path,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            }
        }

        // Return new promise 
        return new Promise(function (resolve, reject) {
            const req = httpClient.request(options, (res) => {
                var body = '';
                //on each data update
                res.on('data', (d) => {
                    body += d;
                })
                //response done, data received completely.
                res.on('end', () => {                    
                    var status = res.statusCode;
                    if (status == 202 || status == 200 || status == 202) {
                        resolve(JSON.parse(body));
                    } else {
                        let err = {
                            code: 0,
                            message: "Unknown error"
                        };
                        try {
                            let errBody =  JSON.parse(body)
                            if (errBody['error']){
                                err = errBody.error
                            }
                        } catch (error) { 
                        }
                        reject(err);
                    }
                });
            })

            req.on('error', (error) => {
                reject({
                    code: 0,
                    message: error.toString()
                });
            })

            req.write(data);
            req.end();
        })
    }
}

module.exports = Client;