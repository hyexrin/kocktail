"use strict";

const mongoose = require("mongoose"),
  { Schema } = require("mongoose");

var productsSchema = new Schema(
  {
    category : {
        type : String,
        required : true
    },
    code : {
        type : String,
        required : true,
        unique : true
    },
    name : {
        type : String,
        required : true
    },
    price : {
        type : String,
        unique : true
    },
    discription : {
        type : String,
        unique : true
    },
    img : {
      type : String,
      data : Buffer
    }
    // path : {
    //   type : String,
    //   unique : true
    // }
  },
  {
    timestamps: true
  }
);


productsSchema.pre("save", function(next) {
  let product = this;
    next();
});

module.exports = mongoose.model("Products", productsSchema);
