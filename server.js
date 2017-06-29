var express = require('express')
var app = express()
var session = require('express-session')
var bodyParser = require("body-parser");
var serveStatic = require('serve-static')
var static = serveStatic('static' )
var lolistorage = require('lolistorage')
var store;

async function init_user() {
    var username = await store.getkv('username');
    var password = await store.getkv('password');
    if (!username || ! password) {
        await store.setkv('username','admin')
        await store.setkv('password','password')
        console.log('init user: admin/password')
    }
}

async function init(){
    store = await lolistorage.init()
    if (!store) {
        console.log('cannot init storage')
    }
    await init_user();
    app.use(session({
        secret: 'abcd',
        resave: true,
        saveUninitialized: true,
        cookie: { secure: false ,maxAge: 1000*3600*24}
    }))
    app.use(bodyParser.json({ type: 'application/json' }))
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(static);

    var http = require('http').Server(app);
    var io = require('socket.io')(http);

    io.on('connection', function(socket){
        console.log('a user connected' , socket.conn.id);
        socket.emit('resp', { msg: 'welcome'})
        socket.on('disconnect',function (u) {
            console.log('a user disconnected', u)
        })
    });

    io.on('api', function(ppap){
        console.log(ppap);
    });

    http.listen(7000)
    console.log('http://localhost:7000')
}
init()