const Order = require("../models/order"),
  User = require("../models/user"),
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
    res.render("orders");
  }

  // filtering : () => {
  //   const searchResult = [];
  //   let index = User._id.indexOf(Order.userId);
  //   while (index != -1) {
  //     searchResult.push(index);
  //     index = Order.indexOf(Order.userId, index + 1);
  //   }
  //   return searchResult;
  // }

};