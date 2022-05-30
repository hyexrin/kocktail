"use strict";

const User = require("../models/user"),
  getUserParams = body => {
    return {
      nick : body.nick,
      pw : body.pw,
      name : body.name,
      phone : body.phone
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
  indexView: (req, res) => {
    res.render("login");
  },

  new: (req, res) => {
    res.render("join");
  },

  usersView : (req, res) => {
    res.render("users");
  },

  create: (req, res, next) => {
    let userParams = getUserParams(req.body);

    User.create(userParams)
      .then(user => {
        res.locals.redirect = "/users";
        res.locals.user = user;
        next();
      })
      .catch(error => {
        console.log(`Error saving user: ${error.message}`);
        next(error);
      });
  },

  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath !== undefined) res.redirect(redirectPath);
    else next();
  }

};
