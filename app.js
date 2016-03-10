// include and setup express
var express = require('express');
var bodyParser = require('body-parser');
var crypto = require('crypto');

// include express handlebars (templating engine)
var exphbs  = require('express-handlebars');

// specify the layout for our handlebars template
var hbs = exphbs.create({defaultLayout: 'main'});

// crethe the express app
var app = express();


//create mongoose
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/thenextspot');


var Article = require('./models/ArticleSchema');
var User = require('./models/UserSchema');


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
    usernameField: 'email',
    passwordField: 'password'
  },
  function(username, password, done) {
    console.log("passport");
    User.findOne({email:username}, function(err, user){
      if (err) { return done(err); }
      if(!user){return done(null, false)}
      if(!user.validPassword(password)){
        return done(null, false);
      }
      return done(null, user);
    });
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
  res.locals.scripts.push('js/about.js');
  res.render('about');
});

// respond to the get request with the register page
app.get('/register', function(req, res) {
  res.render('register');
});

// handle the posted registration data
app.post('/register', function(req, res, done) {
  var user = new User(req.body);
  user.save(function(err){
         if(err){
          console.log(err);
          res.redirect('/register?status=fail');
         }
         else {
          // req.session.user = user;
          // res.redirect('/dashboard');
          res.redirect('/login');
        };
     });
});

var isAuthenticated = function (req,res,next) {
   if (req.isAuthenticated()) return next();
   res.redirect('/login');
}

app.get('/dashboard',isAuthenticated, function (req, res) {
    res.locals.scripts.push('/js/dashboard.js');
    res.render('dashboard', { username:req.session.user.name,
      stuff: [{
        greeting: "Hello",
        subject: "World!"
    }]
    });
});

app.get('/login', function(req, res){
  res.render('login');
});

app.post('/login', passport.authenticate('local'), function(req, res){
  req.session.user = req.user;
  res.redirect('/dashboard');
});

app.get('/articles/:id',function(req,res){
   res.locals.scripts.push('/js/article.js');
   console.log("getArticles"+req.params.id);
   res.render('article',{"title":"test"});
});

app.post('/articles',function(req,res){
  var article = new Article(req.body);
       article.save(function(err){
         if(err) throw err;
         else  res.redirect('/dashboard');
     });
});
// the api (note that typically you would likely organize things a little differently to this)
app.use('/api', api);


// create the server based on express
var server = require('http').createServer(app);

// start the server
server.listen(1337, '127.0.0.1', function () {
  console.log('The Next XYZ is looking good! Open http://localhost:%d to begin.', 1337);
});