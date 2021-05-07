const http = require('http'); // http module
const dt = require('./nodeModules') // importing custom modules
const fs = require('fs'); // file system module
const url = require('url'); // url module
const mysql = require('mysql'); // sql module
const express = require('express');
const events = require('events');

const eventEmitter = new events.EventEmitter();

const hostname = '127.0.0.1';
const port = 3000;
console.log(`Server running at http://${hostname}:${port}`);

var server = http.createServer(function (req, res) {
  eventEmitter.emit('switchPage');
  var q = url.parse(req.url, true);
  var filename = "." + q.pathname;
  fs.readFile(filename, function(err, data){
    if (err){
      res.writeHead(404, {'Content-Type': 'text/html'});
      return res.end("404 Not Found");
    }
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
  })
}).listen(3000);

var myEventHandler = function() {
  console.log("I hear a scream")
}

var switchedPageEvent = function(){
  console.log("Page switched");
}
// assign the event handler to an event
eventEmitter.on('switchPage', switchedPageEvent)
eventEmitter.on('scream', myEventHandler);

// fire the 'scream' event
eventEmitter.emit('scream');
