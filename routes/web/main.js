const express = require('express');
const https = require('https');
const http = require('http');
const Router = express.Router();


Router.get('/', (req, res) => {

    res.render('./main/home', {
        
    });

})


module.exports = Router;