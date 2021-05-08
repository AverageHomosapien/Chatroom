// Require statements
const http = require("http"), // http module
  dt = require("./nodeModules"), // importing custom modules
  fs = require("fs"), // file system module
  url = require("url"), // url module
  mysql = require("mysql"), // sql module
  express = require("express"),
  mongoose = require("mongoose"),
  passport = require("passport"),
  bodyParser = require("body-parser"),
  LocalStrategy = require("passport-local"),
  passportLocalMongoose = require("passport-local-mongoose"),
  User = require("./models/user"),
  events = require("events");

// Events and port
const eventEmitter = new events.EventEmitter();
const hostname = '127.0.0.1';
const port = 3000;

// Setting up server
mongoose.set('useNewUrlParser', true),
mongoose.set('useFindAndModify', false),
mongoose.set('useCreateIndex', true),
mongoose.set('useUnifiedTopology', true),
mongoose.connect('mongodb://localhost/chatroom_app');

// Set up express app
var app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

app.use(require("express-session")({
  secret: "Rusty is POGGERS",
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// -------------
//    ROUTING
// -------------

// Index page
app.get('/', function (req, res){
  res.render("index");
});

// Room page
app.get('/room', isLoggedIn, function (req, res){
  res.render("room");
});

// User registration
app.post('/index', function (req, res){
  var username = req.body.username
  var password = req.body.password
  var email = req.body.email
  User.register(new User({ username : username}),
    password, email, function (err, user){
      if (err) {
        console.log(err);
        return res.render("index"); // don't know if I need to switch pages?
      }
      passport.authenticate("local")(
        req, res, function(){
          res.render("index");
        });
    });
});

// Handling logout
app.get("/logout", function(req, res){
  req.logout();
  res.redirect("/");
})

// Checking if logged in
function isLoggedIn(req, res, next){
  if (req.isAuthenticated()) return next();
  res.redirect("/index");
}


// -------------
//    EVENTS
// -------------
var eventScream = function() {
  console.log("I hear a scream")
}

var eventServerPort = function(){
  console.log(`Server running at http://${hostname}:${port}`);
}

// Event handlers
eventEmitter.on('scream', eventScream);
eventEmitter.on('serverStatus', eventServerPort)

// Events fired
eventEmitter.emit('serverStatus');
eventEmitter.emit('scream');

// Server initiated with routing
var server = http.createServer(function (req, res) {
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
