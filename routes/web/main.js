const express = require('express');
const https = require('https');
const http = require('http');
const Router = express.Router();
require('https').globalAgent.options.ca = require('ssl-root-cas').create();
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0

Router.get('/', (req, res) => {


    console.log("Ahora si")
    https.get('https://localhost:44317/home/summary', (resp) => {
    let data = '';

    // A chunk of data has been received.
    resp.on('data', (chunk) => {
        data += chunk;
    });

    // The whole response has been received. Print out the result.
    resp.on('end', () => {
        console.log("LLEGO");
        console.log(JSON.parse(data));
        res.render('./main/home', {
            data: JSON.parse(data)
        });
    });

    }).on("error", (err) => {
    console.log("Error: " + err);
    });


    

})


module.exports = Router;