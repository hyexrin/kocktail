"use strict";
// mongoose 기능 사용
const mongoose = require("mongoose"),
  { Schema } = require("mongoose");


// products mongoDB에 저장될 schema 형식 지정
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

// Products 모델 exports

productsSchema.pre("save", function(next) {
  let product = this;
    next();
});

module.exports = mongoose.model("Products", productsSchema);
