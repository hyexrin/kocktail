const mongoose = require("mongoose"),
  { Schema } = require("mongoose");

// carts mongoDB에 저장될 schema 형식 지정
var cartSchema = new Schema (
    {
        userId : {
            type:String
        },

        productCode : {
            type:String,
            unique:true
        }
    }
);

// carts 모델 exports
module.exports = mongoose.model("Cart", cartSchema);