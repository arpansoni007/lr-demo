/* ----------------------------- Main Entry File ---------------------------- */

const express = require('express');
const app = express();
const ejs = require('ejs');
const path = require('path');
const logger = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const routes = require('./routes/index');
const MongoStore = require('connect-mongo')(session);

/* --------------------------- Db Connection check -------------------------- */

mongoose.connect('mongodb://localhost/employeesCrud',{useMongoClient:true});

/* --------------------------- Connection instance -------------------------- */

let db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error:'));
db.once('open', ()=> {});

app.use(logger('dev'));

/* -------------------------- Session Variable set -------------------------- */
app.use(session({
    secret : 'test',
    resave : true,
    saveUninitialized : false,
    store : new MongoStore({
        mongooseConnection : db
    })

}));

/* -------------------------------- View Set -------------------------------- */
app.set('views',path.join(__dirname,'resources/views'));
app.set('view engine',ejs);

/* ------------------------------ Use Bodypaser ----------------------------- */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(express.static(__dirname+'/public'));

/* ----------------------------------- old ---------------------------------- */

// let index = require('./../demo-crud/routes/routes');



/* ------------------------- new in express above version 4 ------------------------- */

app.use('/',routes);
// app.get('/',(req,res,next) => { return res.render('employees/index.ejs'); });


/* ------------------------------- Catch error ------------------------------ */
app.use((req,res,next) =>{
    let err = new Error('Error occurred');
    err.status = 404;
    next(err);
});


/* ----------------------- Pass Error to Error Handler ---------------------- */

app.use((err,req,res,next) => {
    res.status(err.status || 500);
    res.send(err.message);
});



/* ------------------------------ Port Connect ------------------------------ */
app.listen(4500, () => {
    console.log('Node App running on port:4000');
});
