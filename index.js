require('dotenv').config();
const path = require('path')
const http = require('http');

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');

const torreRouter = require('./routes/web/main')
const torreSearchJobs = require('./routes/web/searchjobs')

const app = express();

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.engine('.hbs', exphbs({
    extname: '.hbs', 
    defaultLayout: 'main'
}));

app.set('view engine', '.hbs');

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(__dirname + '/node_modules/jquery/dist'));
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use(express.static(__dirname + '/node_modules/@fortawesome/fontawesome-free'));

app.use('/torre', torreRouter)
app.use('/torre/searchjobs', torreSearchJobs)



app.use((req, res, next) => {
    const error = new Error('Not Found !');
    error.status = 400;
    next(error);
})

app.listen(process.env.PORT, function () {
    console.log("Express started: Port " + process.env.PORT);
})
