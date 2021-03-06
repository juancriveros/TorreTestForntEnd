const express = require('express');
const https = require('https');
const http = require('http');
const Router = express.Router();
require('https').globalAgent.options.ca = require('ssl-root-cas').create();
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0

Router.get('/', (req, res) => {
    
    let url = process.env.API_URL + '/opportunities/searchById?id=' + req.query.Id 

    console.log(url)

    https.get(url , (resp) => {
        let data = '';
    
        // A chunk of data has been received.
        resp.on('data', (chunk) => {
            data += chunk;
        });
    
        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            res.render('./profile/job', {
                isHome: true,
                data: JSON.parse(data)
            });
        });
    
        }).on("error", (err) => {
            console.log("Error: " + err);
            res.render('./profile/job', {
                isHome: true,
                
            });
        });
    
        
   

})


module.exports = Router;