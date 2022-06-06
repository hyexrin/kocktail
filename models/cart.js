const mongoose = require("mongoose"),
  { Schema } = require("mongoose");

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

module.exports = mongoose.model("Cart", cartSchema);