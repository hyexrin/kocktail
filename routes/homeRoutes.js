const router = require("express").Router(),
  homeController = require("../controllers/homeController");
  
router.get("/", homeController.index);
router.get("/admin/index", homeController.adminIndex);

module.exports = router;
