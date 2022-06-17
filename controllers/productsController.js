"use strict";

// orderController와 products 모델 불러오기
const orderController = require("./orderController");
const Products = require("../models/products"),
  // products 모델 
  getProductsParams = body => {
    return {
      category : body.category,
      code : body.code,
      name : body.name,
      price : body.price,
      discription : body.discription
      // img : body.file
    };
  };

// productsController.js 내용을 모듈로 exports
module.exports = {
    
  // products 값 find()해서 불러오기
  index: (req, res, next) => {
    Products.find()
      .then(products => {
        res.locals.products = products;
        next();
      })
      .catch(error => {
        console.log(`Error fetching products: ${error.message}`);
        next(error);
      });
  },

  productsView : (req, res) => {
    res.render("products", orderController.getCurrentDate);
  },

  // productsInsert 호출 시 서버 화면에 productsInserts.ejs 출력
  productsInsert: (req, res) => {
    res.render("productsInsert");
  },

  // productsList 호출 시 products 값 find()해서 불러오고 productsList.ejs에 상품 목록 전달
  productsList: (req, res, next) => {
    Products.find()
      .then(products => {
        res.locals.products = products;
        res.render("productsList");
        next();
      })
      .catch(error => {
        console.log(`Error fetching products: ${error.message}`);
        next(error);
      });
  
  },

  // productsSub 호출 시 전달 받은 productsId를 이용해 해당 값 productsSub에 전달 후 productsSub.ejs 출력
  productsSub: (req, res, next) => {
    let productsId = req.params.productsId;
    Products.findById(productsId)
      .then(products => {
        res.locals.products = products;
        res.render("productsSub");
        next();
      })
      .catch(error => {
        console.log(`Error fetching products by code: ${error.message}`);
        next(error);
      });
    
  },

  // create 호출 시 상품 정보 db에 저장 할 수 있도록 값 전달, img 파일의 경우 전달받은 파일의 파일명 값 전달
  create: (req, res, next) => {
    let productsParams = getProductsParams(req.body);
    productsParams.img = req.file.filename;
    Products.create(productsParams)
      .then(products => {
        res.locals.redirect = "/products";
        res.locals.products = products;
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
  },

  // show 호출 시 전달 받은 productsId를 이용해 해당 값 전달 후 findById로 해당 값 받아오기
  show: (req, res, next) => {
    let productsId = req.params.productsId;
    Products.findById(productsId)
      .then(products => {
        res.locals.products = products;
        next();
      })
      .catch(error => {
        console.log(`Error fetching products by code: ${error.message}`);
        next(error);
      });
  },

  // edit 호출 시 전달 받은 productsId를 이용해 찾은 상품 정보 edit 할 수 있는 products/edit.ejs 출력
  edit: (req, res, next) => {
    let productsId = req.params.productsId;
    Products.findById(productsId)
      .then(products => {
        res.render("products/edit", {
          products: products
        });
      })
      .catch(error => {
        console.log(`Error fetching products by code: ${error.message}`);
        next(error);
      });
  },

  // update 호출 시 전달 받은 productsId를 이용해 찾은 상품의 정보 update
  update: (req, res, next) => {
    let productsId = req.params.productsId,
      productsParams = getProductsParams(req.body);
    Products.findByIdAndUpdate(productsId, {
      $set: productsParams
    })
      .then(products => {
        res.locals.redirect = "/products";
        res.locals.products = products;
        next();
      })
      .catch(error => {
        console.log(`Error updating products by code: ${error.message}`);
        next(error);
      });
  },

  // delete 호출 시 전달 받은 productsId를 이용해 해당 상품의 정보 delete
  delete: (req, res, next) => {
    let productsId = req.params.productsId;
    Products.findByIdAndRemove(productsId)
      .then(() => {
        res.locals.redirect = "/products";
        next();
      })
      .catch(error => {
        console.log(`Error deleting products by code: ${error.message}`);
        next();
      });
  },

};
