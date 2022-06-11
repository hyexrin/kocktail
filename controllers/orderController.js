const Order = require("../models/order"),
  User = require("../models/user"),
  mongoose = require("mongoose"),
  getOrderParams = body => {
    return {
      date : getCurrentDate(),
      userId : body.userId,
      productCode : body.productCode,
      state : body.state
    };
  };

function getCurrentDate() {
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth();
  var today = date.getDate();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  return new Date(Date.UTC(year, month, today, hours,minutes));
}

module.exports = {

  index: (req, res, next) => {
    Order.find()
      .then(order => {
        res.locals.order = order;
        next();
      })
      .catch(error => {
        console.log(`Error fetching users: ${error.message}`);
        next(error);
      });
  },
  create: (req, res, next) => {
    let OrderParams = getOrderParams(req.body);

    Order.create( OrderParams )
      .then(order => {
        res.locals.redirect = "/products";
        res.locals.order = order;
        next();
      })
      .catch(error => {
        console.log(`Error saving products in the cart: ${error.message}`);
        next(error);
      });
  },

  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath !== undefined) res.redirect(redirectPath);
    else next();
  },


  order: (req, res, next) => {
    let userId = req.params.id;
    Order.find({userId : {$eq : userId }})
      .then(order => {
       res.locals.order = order;
       next();
     })
      .catch(error => {
        console.log(`Error : ${error.message}`);
        next(error);
      });
  },
      
  orderView: (req, res) => {
    res.render("admin/orders");
  },

  edit: (req, res, next) => {
    let OrderId = req.params.orderId;
    Order.findById(OrderId)
      .then(order => {
        res.render("admin/edit", {
          order : order
        });
      })
      .catch(error => {
        console.log(`Error fetching user by ID: ${error.message}`);
        next(error);
      });
  },

  update: (req, res, next) => {
    let OrderId = req.params.orderId
    orderParams = getOrderParams(req.body);

    Order.findByIdAndUpdate(OrderId, {
    $set: orderParams
   })
    .then(order => {
      res.locals.redirect = "/orders";
      res.locals.order = order;
      next();
    })
    .catch(error => {
      console.log(`Error updating user by ID: ${error.message}`);
      next(error);
    });
  },

  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath !== undefined) res.redirect(redirectPath);
    else next();
  }

};