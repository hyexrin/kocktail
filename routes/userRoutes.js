const router = require("express").Router();
const usersController = require("../controllers/usersController");

router.get("/users", usersController.index, usersController.userView);

router.get("/join", usersController.join);
router.post("/joined", usersController.validate, usersController.joined, usersController.redirectView);

router.get("/login", usersController.login);
router.post("/login", usersController.authenticate);
router.get("/logout", usersController.logout, usersController.redirectView);

router.get("/users/:id", usersController.myPage, usersController.myPageView);
router.get("/users/:id/edit", usersController.edit);
router.put("/users/:id/update", usersController.update, usersController.redirectView);
router.delete("/users/:id/delete", usersController.delete, usersController.redirectView);

module.exports = router;