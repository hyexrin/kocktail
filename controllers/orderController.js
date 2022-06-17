//orderController

const Order = require("../models/order"),
  getOrderParams = body => {
    return {
      date : getCurrentDate(),
      userId : body.userId,
      productCode : body.productCode,
      state : body.state
    };
  };

  // order collection의 date documents에 현시간을 저장하기 위한 함수
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

    // orders 값 find()해서 불러오기
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

  //order collection에 데이터 저장 및 products.ejs로 redirect
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

  // redirect할 페이지를 받아와 redirect 하는 함수
  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath !== undefined) res.redirect(redirectPath);
    else next();
  },

  // 현재 로그인 된 id에 해당되는 order목록을 orders에서 find()
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
      
  // admin이 order collection의 데이터를 확인할 수 있도록 /admin/orders.ejs로 render
  orderView: (req, res) => {
    res.render("admin/orders");
  },

  // admin 이 order 정보를 수정하기 위한 함수
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

  // admin이 edit에서 주문 정보를 수정한 것을 저장하기 위한 함수
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
  }

};