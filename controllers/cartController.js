const Cart = require("../models/cart"),
getCartParams = body => {
  return {
    userNick : body.userNick,
    productCode : body.productCode
  };
};


module.exports = {
  create: (req, res, next) => {
    let CartParams = getCartParams(req.body);

    Cart.create(CartParams)
      .then(cart => {
        res.locals.redirect = "/products";
        res.locals.cart = cart;
        next();
      })
      .catch(error => {
        console.log(`Error saving products: ${error.message}`);
        next(error);
      });
  },

  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath !== undefined) res.redirect(redirectPath);
    else next();
  }

};