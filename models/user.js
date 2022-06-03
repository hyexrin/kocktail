"use strict";

const mongoose = require("mongoose"),
  { Schema } = require("mongoose");

var userSchema = new Schema(
  {
    nick : {
        type : String,
        required : true,
        unique : true
    },
    pw : {
        type : String,
        required : true
    },
    name : {
        type : String,
        required : true
    },
    phone : {
        type : String,
        unique : true
    }
  },
  {
    timestamps: true
  }
);


userSchema.pre("save", function(next) {
  let user = this;
    next();
});

module.exports = mongoose.model("User", userSchema);
