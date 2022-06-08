"use strict";

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
    res.render("products");
  },

  productsInsert: (req, res) => {
    res.render("productsInsert");
  },

  productsList: (req, res) => {
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

  productsSub: (req, res) => {
        res.render("productsSub")
  },

  create: (req, res, next) => {
    let productsParams = getProductsParams(req.body);
    productsParams.img = req.file.filename;
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
    let productsCode = req.params.code;
    Products.findById(productsCode)
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
    let productsCode = req.params.code;
    User.findById(productsCode)
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
    let productsCode = req.params.code,
      productsParams = getProductsParams(req.body);

    Products.findByIdAndUpdate(productsCode, {
      $set: productsParams
    })
      .then(products => {
        res.locals.redirect = `/products/${productsCode}`;
        res.locals.products = products;
        next();
      })
      .catch(error => {
        console.log(`Error updating products by code: ${error.message}`);
        next(error);
      });
  },

  delete: (req, res, next) => {
    let productsCode = req.params.code;
    Products.findByIdAndRemove(productsCode)
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
