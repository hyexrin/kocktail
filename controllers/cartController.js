const Cart = require("../models/cart"),
getCartParams = body => {
  return {
    userId : body.userId,
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
        console.log(`Error saving products in the cart: ${error.message}`);
        next(error);
      });
  },

  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath !== undefined) res.redirect(redirectPath);
    else next();
  },


  cart: (req, res, next) => {
    let userId = req.params.id;
    Cart.find({userId : {$eq : userId }})
      .then(carts => {
       res.locals.carts = carts;
       next();
       console.log(carts);
     })
      .catch(error => {
        console.log(`Error : ${error.message}`);
        next(error);
      });
    }

};