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
const torreSearchEmployees = require('./routes/web/searchemployees')
const torreUserProfile = require('./routes/web/userprofile')
const torreJobProfile = require('./routes/web/jobprofile')


const app = express();

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.engine('.hbs', exphbs({
    extname: '.hbs',
    defaultLayout: 'main',
    helpers: {
        each_limit: function (ary, max) {
            if (!ary || ary.length == 0)
                return "";

            var result = [];
            for (var i = 0; i < max && i < ary.length; ++i)
                result.push(ary[i].name);

            return result.join(' - ');
        },

        join_string: function (arrayString, max) {
            if (arrayString.length == 0)
                return "";

            var result = [];
            for (var i = 0; i < max && i < arrayString.length; ++i)
                result.push(arrayString[i]);

            return result.join(' - ');
        },

        getlink: function (nameLink, links) {

            var url = "";
            if (links.length > 0) {
                links.forEach(element => {
                    if (element.name == nameLink) {
                        let username = element.address.split('/');
                        url = username[username.length - 1];
                    }
                });
            }

            return url;

        },

        date_format: function (fromMonth, fromYear, toMonth, toYear) {
            if (toMonth != null)
                return fromMonth + " " + fromYear + " - " + toMonth + " " + toYear;
            else
                return fromMonth + " " + fromYear
        },

        check_picture: function (source) {
            if (source == null || source == "")
                return "/images/Default.jpg";
            else
                return source
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
app.use('/torre/searchemployees', torreSearchEmployees)
app.use('/torre/userprofile', torreUserProfile)
app.use('/torre/jobprofile', torreJobProfile)



app.use((req, res, next) => {
    const error = new Error('Not Found !');
    error.status = 400;
    next(error);
})

app.listen(process.env.PORT, function () {
    console.log("Express started: Port " + process.env.PORT);
})
