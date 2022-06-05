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
  },
  {
    timestamps: true
  }
);


productsSchema.methods.getInfo = () => {
  return `Code : ${this.code} Name : ${this.name}`;
};

module.exports = mongoose.model("Products", productsSchema);
