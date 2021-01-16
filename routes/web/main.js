const express = require('express');
const https = require('https');
const http = require('http');
const Router = express.Router();
require('https').globalAgent.options.ca = require('ssl-root-cas').create();
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0

Router.get('/', (req, res) => {

    var url = process.env.API_URL + '/home/summary'
    console.log(url)

    https.get( url, (resp) => {
    let data = '';

    // A chunk of data has been received.
    resp.on('data', (chunk) => {
        data += chunk;
    });

    // The whole response has been received. Print out the result.
    resp.on('end', () => {
        res.render('./main/home', {
            data: JSON.parse(data),
            isHome: false
        });
    });

    }).on("error", (err) => {
    console.log("Error: " + err);
    });


    

})


module.exports = Router;