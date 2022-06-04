const mongoose = require("mongoose"),
  { Schema } = require("mongoose"),
  passportLocalMongoose = require("passport-local-mongoose");

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

userSchema.methods.validPassword = (password) => {
  return (this.pw == password);
};

userSchema.plugin(passportLocalMongoose, {
  usernameField: "nick"
});

module.exports = mongoose.model("User", userSchema);
