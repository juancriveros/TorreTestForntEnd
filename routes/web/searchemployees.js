const express = require('express');
const https = require('https');
const http = require('http');
const Router = express.Router();
require('https').globalAgent.options.ca = require('ssl-root-cas').create();
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0

Router.get('/', (req, res) => {
    
    let url =  process.env.API_URL + '/users/search?pageNumber=' + req.query.page + '&size=15&offset=' + req.query.offset

    if(req.query.name != undefined)
        url += '&name=' + req.query.name;

    if(req.query.remoter != undefined)
        url += '&remoter=' + req.query.remoter

    if(req.query.verified != undefined)
        url += '&verified=' + req.query.verified

    if(req.query.openTo != undefined)
        url += '&opento=' + req.query.openTo

    if(req.query.currency != undefined)
        url += '&currency=' + req.query.currency

    if(req.query.periodicity != undefined)
        url += '&periodicity=' + req.query.periodicity

    if(req.query.amount != undefined)
        url += '&amount=' + req.query.amount

    if(req.query.skill != undefined)
        url += '&skill=' + req.query.skill

    console.log(url)

    https.get(url , (resp) => {
    let data = '';

    // A chunk of data has been received.
    resp.on('data', (chunk) => {
        data += chunk;
    });

    // The whole response has been received. Print out the result.
    resp.on('end', () => {
        res.render('./search/employeessearch', {
            data: JSON.parse(data),
            isHome: true,
            page: req.query.page ,
            name: req.query.name,
            offset: resp.headers["x-offset"]
        });
    });

    }).on("error", (err) => {
        console.log("Error: " + err);
        res.render('./search/employeessearch', {
            isHome: true
        });
    });

   

})


module.exports = Router;