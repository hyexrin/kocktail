"use strict";

// products 모델 객체 불러오기
const Products = require("../models/products");

// homeController.js 내용을 모듈로 exports
module.exports = {

  // /index 호출 시 화면에 index.ejs 출력, products 값 find()해서 불러오기
  index: (req, res, next) => {
    Products.find().limit(4)
      .then(products => {
        res.locals.products = products;
        res.render("index");
        next();
      })
      .catch(error => {
        console.log(`Error fetching products: ${error.message}`);
        next(error);
      });
    
  },
  
  // /admin/index 호출 시 서버 화면에 admin/index.ejs 출력
  adminIndex: (req, res) => {
    res.render("admin/index");
  }
};
