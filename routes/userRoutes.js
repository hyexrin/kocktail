const router = require("express").Router();
const usersController = require("../controllers/usersController");

router.get("/login", usersController.login);
router.post("/login", usersController.authenticate);
router.get("/logout", usersController.logout, usersController.redirectView);
router.get("/join", usersController.join);
router.get("/users", usersController.index, usersController.usersView);
router.post("/joined", usersController.create, usersController.redirectView);

module.exports = router;