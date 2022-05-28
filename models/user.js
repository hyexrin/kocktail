const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    id : {
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
        type : Number,
        unique : true
    }
});

userSchema.methods.getInfo = () => {
    return `ID : ${this.id} PW : ${this.pw} NAME : ${this.name} PHONE : ${this.phone}`;
};

userSchema.methods.findLocalUsers = () => {
    return this.model("User").find({ pw : this.pw }).exec();
};

module.exports = mongoose.model("User", userSchema);