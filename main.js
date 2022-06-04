const express = require("express"),
  layouts = require("express-ejs-layouts"),
  app = express(),
  router = require("./routes/index");
  mongoose = require("mongoose"),
  methodOverride = require("method-override"),
  passport = require('passport'),
  cookieParser = require("cookie-parser"),
  expressSession = require('express-session'),
  connectFlash = require("connect-flash"),
  User = require('./models/user');

const LocalStrategy = require('passport-local').Strategy;

mongoose.connect("mongodb://localhost:27017/kocktail",
  { useNewUrlParser: true }
);

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

app.use(
  methodOverride("_method", {
    methods: ["POST", "GET"]
  })
);

app.use(layouts);
app.use(express.static("public"));

app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(express.json());

// login을 위한 passport 사용 설정
app.use(cookieParser("kocktail"));
app.use(
  expressSession({
    secret : "kocktail",
    resave: false,
    saveUninitialized: false
  })
);

app.use(connectFlash());
app.use(passport.initialize());
app.use(passport.session());
// passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

passport.use(new LocalStrategy ({
  usernameField : 'nick',
  passwordField : 'pw'
}, (username, password, done) => {
  User.findOne({ username : username}, (err, user) => {
    if (err) { return done(err)}
    if (!user) {
      return done(null, false, {message : 'Incorrect username'});
    }
    if(!user.validPassword(password)) {
      return done(null, false, {message : 'Incorrect password.'});
    }
    return done(null, user);
  })
}));


app.use((req, res, next) => {
//  res.locals.loggedIn = req.isAuthenticated();
  res.locals.currentUser = req.user;
  res.locals.flashMessages = req.flash();
  next();
});


app.use("/", router);

app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});
