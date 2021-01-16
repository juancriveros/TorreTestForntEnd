const express = require('express');
const https = require('https');
const http = require('http');
const Router = express.Router();
require('https').globalAgent.options.ca = require('ssl-root-cas').create();
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0

Router.get('/', (req, res) => {
    
    let url =  process.env.API_URL + '/opportunities/search?pageNumber=' + req.query.page + '&size=15&offset=' + req.query.offset

    if(req.query.name != undefined)
        url += '&name=' + req.query.name;

    if(req.query.placeBased != undefined)
        url += '&placeBased=' + req.query.placeBased

    if(req.query.status != undefined)
        url += '&status=' + req.query.status

    if(req.query.type != undefined)
        url += '&type=' + req.query.type

    if(req.query.currency != undefined)
        url += '&currency=' + req.query.currency

    if(req.query.periodicity != undefined)
        url += '&periodicity=' + req.query.periodicity

    if(req.query.amount != undefined)
        url += '&amount=' + req.query.amount

    if(req.query.skill != undefined)
        url += '&skill=' + req.query.skill

    

    https.get(url , (resp) => {
    let data = '';

    // A chunk of data has been received.
    resp.on('data', (chunk) => {
        data += chunk;
    });

    // The whole response has been received. Print out the result.
    resp.on('end', () => {
        console.log(resp.headers["x-offset"])
        res.render('./search/jobsearch', {
            data: JSON.parse(data),
            isHome: true,
            page: req.query.page ,
            name: req.query.name,
            offset: resp.headers["x-offset"]
        });
    });

    }).on("error", (err) => {
        console.log("Error: " + err);
        res.render('./search/jobsearch', {
            isHome: true
        });
    });

   

})


module.exports = Router;