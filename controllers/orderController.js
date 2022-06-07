const Order = require("../models/order"),
getOrderParams = body => {
  return {
    userId : body.userId,
    productCode : body.productCode,
    state : body.state
  };
};


module.exports = {
  create: (req, res, next) => {
    let OrderParams = getOrderParams(req.body);

    Order.create(OrderParams)
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
    }

};