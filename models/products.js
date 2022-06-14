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
        required : true     
    },
    discription : {
        type : String,
        unique : true
    },
    img : {
      type : String,
      data : Buffer
    }
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
