const mongoose = require("mongoose"),
  { Schema } = require("mongoose"),
  passportLocalMongoose = require("passport-local-mongoose");

// users mongoDB에 저장될 schema 형식 지정
var userSchema = new Schema(
  {
    nick: {
      type: String,
      required: true,
      lowercase: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    name: {
      type: String,
      trim: true
    },
    phone : {
      type : String,
      unique : true
    },
  },
  {
    timestamps: true
  }
);

userSchema.plugin(passportLocalMongoose, {
  usernameField: "nick"
});

userSchema.methods.getInfo = () => {
  return `NickName : ${this.nick} `;
};

// users 모델 exports
module.exports = mongoose.model("User", userSchema);
