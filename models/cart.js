const mongoose = require("mongoose"),
  { Schema } = require("mongoose"),
  Products = require("./products"),
  User = require("./user");

var cartSchema = new Schema (
    {
        userNick : {
            type:String
        },

        productCode : {
            type:String,
            unique:true
        }
    }
);

module.exports = mongoose.model("Cart", cartSchema);