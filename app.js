// include and setup express
var express = require('express');
var bodyParser = require('body-parser');

// include express handlebars (templating engine)
var exphbs  = require('express-handlebars');

// specify the layout for our handlebars template
var hbs = exphbs.create({defaultLayout: 'main'});

// crethe the express app
var app = express();


//create mongoose
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/thenextspot');
var Schema = mongoose.Schema;

//Create a Schema for articles
var ArticlesSchema = new Schema({
  title: String,
  summary: String,
  image: String,
  author: String,
  date: Date
});
mongoose.model('Article', ArticlesSchema);
var Article = mongoose.model('Article');



var api = require('./routes/api');

// setup handlebars
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// express middleware that parser the key-value pairs sent in the request body in the format of our choosing (e.g. json)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// setup our public directory (which will serve any file stored in the 'public' directory)
app.use(express.static('public'));

app.use(function (req, res, next) {
  res.locals.scripts = [];
  next();
});

//passport settings
var cookieParser = require('cookie-parser');
var session = require('express-session');
var flash = require('express-flash');
var passport = require('passport');

app.use(cookieParser());
app.use(session({ secret: 'keyboard cat' , resave: false, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());



var LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy({
    usernameField: 'name',
    passwordField: 'password'
  },
  function(username, password, done) {
  // findByUsername(username, function(err, user) {
  //       if (err) { return done(err); }
  //       if (!user) { return done(null, false); }
  //       if (user.password != password) { return done(null, false); }
  //       return done(null, user);
  //   });
  var user = {'name':username,'passport':password};
  return done(null,user);
  }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(user, done) {
    done(null, user);
});

// respond to the get request with the home page
app.get('/', function (req, res) {
  res.locals.scripts.push('js/home.js');
  res.render('home');
});

// respond to the get request with the about page
app.get('/about', function(req, res) {
  res.render('about');
});

// respond to the get request with the register page
app.get('/register', function(req, res) {
  res.render('register');
});

// handle the posted registration data
app.post('/register',  passport.authenticate('local'/*,
    { successRedirect: '/dashboard',
     failureRedirect: '/',
     failureFlash: true }*/), function(req, res) {
    // console.log(req.params.name);
  // get the data out of the request (req) object
  // store the user in memory here

  res.redirect('/dashboard');
});

// respond to the get request with dashboard page (and pass in some data into the template / note this will be rendered server-side)
app.get('/dashboard', function (req, res) {
  console.log(req.user.name);
    res.render('dashboard', { username:req.user.name,
    	stuff: [{
		    greeting: "Hello",
		    subject: "World!"
		}]
    });
});

app.get('/articles/:id',function(req,res){
   res.locals.scripts.push('/js/article.js');
   console.log("getArticles"+req.params.id);
   res.render('article',{"title":"test"});
});

// the api (note that typically you would likely organize things a little differently to this)
app.use('/api', api);


// create the server based on express
var server = require('http').createServer(app);

// start the server
server.listen(1337, '127.0.0.1', function () {
  console.log('The Next XYZ is looking good! Open http://localhost:%d to begin.', 1337);
});