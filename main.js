const express = require("express"),
  layouts = require("express-ejs-layouts"),
  app = express(),
  router = express.Router(),
  homeController = require("./controllers/homeController"),
  usersController = require("./controllers/usersController.js"),
  mongoose = require("mongoose"),
  methodOverride = require("method-override");

// login을 위한 passport 사용 설정
const session = require('express-session');
const passport = require('passport');

mongoose.connect(
  "mongodb://localhost:27017/kocktail",
  { useNewUrlParser: true }
);

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

// login을 위한 passport 사용 설정
app.use(session({secret : true, resave : true, saveUninitialized : false}));
app.use(passport.initialize());
app.use(passport.session());
usersController();
//passportConfig();

router.use(
  methodOverride("_method", {
    methods: ["POST", "GET"]
  })
);

router.use(layouts);
router.use(express.static("public"));

router.use(
  express.urlencoded({
    extended: false
  })
);
router.use(express.json());

router.get("/", homeController.index);

router.get("/login", usersController.index, usersController.login);
router.get("/join", usersController.new);
router.get("/users", usersController.index, usersController.usersView);
router.post("/joined", usersController.create, usersController.redirectView);

// login을 위한 passport 사용 설정
router.post('/logined', passport.authenticate('local', {
  failureRedirect : '/'
}), (req, res) => {
  res.redirect('/');
});

app.use("/", router);

app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});
