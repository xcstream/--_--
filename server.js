var express = require('express')
var app = express()
var session = require('express-session')
var bodyParser = require("body-parser");
var serveStatic = require('serve-static')
var static = serveStatic('static' )
var lolistorage = require('lolistorage')

var store;
async function init(){
    store = await lolistorage.init()
    if (!store) {
        console.log('cannot init storage')
    }

    app.use(session({
        secret: 'abcd',
        resave: true,
        saveUninitialized: true,
        cookie: { secure: false ,maxAge: 1000*3600*24}
    }))

    app.use(bodyParser.json({ type: 'application/json' }))
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(static);
    app.listen(7000)
    console.log('http://localhost:7000')
}

init()