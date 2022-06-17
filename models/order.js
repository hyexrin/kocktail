const mongoose = require("mongoose"),
  { Schema } = require("mongoose");

// orders mongoDB에 저장될 schema 형식 지정
var orderSchema = new Schema (
    {
        date : {
            type:String
        },

        userId : {
            type:String
        },

        productCode : {
            type:String
        },

        state : {
            type:String
        }
    }
);

// orders 모델 exports
module.exports = mongoose.model("Order", orderSchema);