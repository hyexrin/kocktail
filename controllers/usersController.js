const User = require("../models/user");

module.exports = {
    index : (req, res, next) => {
        User.find({})
            .then(users => {
                res.locals.users = users;
                next();
            })
            .catch(error => {
                console.log(`Error fetching users : ${error.message}`);
                next(error);
            });
    },

    indexView : (req, res) => {
        res.render("users/index");
    },

    saveUser : (req, res) => {
        let newUser = newUser({
            id : req.body.id,
            pw : req.body.pw,
            name : req.body.name,
            phone : req.body.phone
        });

        newUser
            .save()
            .then(result => {
                res.render("index");
            })
            .catch(error => {
                if (error) res.send(error);
            });
    }
};