require('dotenv').config();
const path = require('path')
const http = require('http');

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const hbsHelpers = require('./helpers/handlebars');

const torreRouter = require('./routes/web/main')
const torreSearchJobs = require('./routes/web/searchjobs')

const app = express();

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.engine('.hbs', exphbs({
    extname: '.hbs', 
    defaultLayout: 'main',
    helpers: {
        each_limit: function(ary, max, options) {
            if(!ary || ary.length == 0)
                return "";
        
            var result = [ ];
            for(var i = 0; i < max && i < ary.length; ++i)
                result.push(ary[i].name);

            return result.join(' - ');
        },

        next_page: function(page){
            return parseInt(page) + 1;
        },
        
        previous_page: function(page){

            let pageNumber = parseInt(page);

            if(pageNumber - 1 <= 0)
                return 1;
            else
                return pageNumber-1;
        }
    }
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
