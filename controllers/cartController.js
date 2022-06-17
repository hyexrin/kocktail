const Cart = require("../models/cart"),
getCartParams = body => {
  return {
    userId : body.userId,
    productCode : body.productCode
  };
};


module.exports = {

  //cart collection에 데이터 저장 및 products.ejs로 redirect
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

  // redirect할 페이지를 받아와 redirect 하는 함수
  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath !== undefined) res.redirect(redirectPath);
    else next();
  },

  // 현재 로그인 된 id에 해당되는 cart목록을 cart에서 find()
  cart: (req, res, next) => {
    let userId = req.params.id;
    Cart.find({userId : {$eq : userId }})
      .then(carts => {
       res.locals.carts = carts;
       next();
     })
      .catch(error => {
        console.log(`Error : ${error.message}`);
        next(error);
      });
    }

};