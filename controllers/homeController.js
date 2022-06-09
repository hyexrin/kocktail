"use strict";

const Products = require("../models/products");

module.exports = {
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
  
  adminIndex: (req, res) => {
    res.render("admin/index");
  }
};
