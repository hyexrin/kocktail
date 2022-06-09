const mongoose = require("mongoose"),
  { Schema } = require("mongoose");

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

module.exports = mongoose.model("Order", orderSchema);