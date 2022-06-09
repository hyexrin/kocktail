const User = require("../models/user"),
  Cart = require("../controllers/cartController"),
  passport = require("passport"),
  getUserParams = body => {
    return {
      nick : body.nick,
      password : body.password,
      name : body.name,
      phone : body.phone
    };
  },
  getLoginParams = body => {
    return {
      nick : body.nick,
      password : body.password
    };
  };

  module.exports = {
    index: (req, res, next) => {
      User.find()
        .then(users => {
          res.locals.users = users;
          next();
        })
        .catch(error => {
          console.log(`Error fetching users: ${error.message}`);
          next(error);
        });
    },
    userView: (req, res) => {
      res.render("users");
    },
  
    join: (req, res) => {
      res.render("join");
    },
  
    joined: (req, res, next) => {
      if (req.skip) next();
      let newUser = new User(getUserParams(req.body));
      User.register(newUser, req.body.password, (e, user) => {
        if (user) {
          req.flash("success", `${user.Name}'s account created successfully!`);
          res.locals.redirect = "/users";
          next();
        } else {
          req.flash("error", `Failed to create user account because: ${e.message}.`);
          res.locals.redirect = "/join";
          next();
        }
      });
    },
  
    redirectView: (req, res, next) => {
      let redirectPath = res.locals.redirect;
      if (redirectPath !== undefined) res.redirect(redirectPath);
      else next();
    },
  
    myPage: (req, res, next) => {
      let userId = req.params.id;
      User.findById(userId)
        .then(user => {
          res.locals.user = user;
          next();
        })
        .catch(error => {
          console.log(`Error fetching user by ID: ${error.message}`);
          next(error);
        });
    },
  
    myPageView: (req, res) => {
      res.render("users/myPage" );
    },

  
    edit: (req, res, next) => {
      let userId = req.params.id;
      User.findById(userId)
        .then(user => {
          res.render("users/edit", {
            user: user
          });
        })
        .catch(error => {
          console.log(`Error fetching user by ID: ${error.message}`);
          next(error);
        });
    },
  
    update: (req, res, next) => {
      let userId = req.params.id,
        userParams = getUserParams(req.body);
  
      User.findByIdAndUpdate(userId, {
        $set: userParams
      })
        .then(user => {
          res.locals.redirect = "/users";
          res.locals.user = user;
          next();
        })
        .catch(error => {
          console.log(`Error updating user by ID: ${error.message}`);
          next(error);
        });
    },
  
    delete: (req, res, next) => {
      let userId = req.params.id;
      User.findByIdAndRemove(userId)
        .then(() => {
          res.locals.redirect = "/users";
          next();
        })
        .catch(error => {
          console.log(`Error deleting user by ID: ${error.message}`);
          next();
        });
    },
    login: (req, res) => {
      res.render("login");
    },
    validate: (req, res, next) => {
      req
        .check("phone", "phone number is invalid")
        .notEmpty()
        .isInt()
        .isLength({
          min: 11,
          max: 11
        })
        .equals(req.body.phone);
      req.check("password", "Password cannot be empty").notEmpty();
      req.getValidationResult().then(error => {
        if (!error.isEmpty()) {
          let messages = error.array().map(e => e.msg);
          req.skip = true;
          req.flash("error", messages.join(" and "));
          res.locals.redirect = "/join";
          next();
        } else {
          next();
        }
      });
    },
    authenticate: passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: "Failed to login.",
      successRedirect: "/",
      successFlash: "Logged in!"
    }),

    logout: (req, res, next) => {
      req.logout();
      req.flash("success", "You have been logged out!");
      res.locals.redirect = "/";
      next();
    }
  };
  