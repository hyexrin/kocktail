const mongoose = require("mongoose"),
  { Schema } = require("mongoose");

var orderSchema = new Schema (
    {
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