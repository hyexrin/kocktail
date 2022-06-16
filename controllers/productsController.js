"use strict";
const orderController = require("./orderController");
const Products = require("../models/products"),
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


module.exports = {
    
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

  productsInsert: (req, res) => {
    res.render("productsInsert");
  },

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

  productsSub: (req, res, next) => {
    console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@");
    console.log(req.params.productsId);
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

  create: (req, res, next) => {
    let productsParams = getProductsParams(req.body);
    productsParams.img = req.file.filename;
    console.log("#@#@#@#@#@#@#@##@#@#@#@#@##@#@");
    console.log(productsParams);
    console.log(productsParams.img);
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

  show: (req, res, next) => {
    let productsId = req.params.productsId;
    console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@");
    console.log(productsId);
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

  update: (req, res, next) => {
    let productsId = req.params.productsId,
      productsParams = getProductsParams(req.body);
    console.log("@@@@@@@@@@@@@@@@@@2#######@@@@@@@@@@@@@@@@@@@");
    console.log(productsParams);
    console.log(productsId);
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
