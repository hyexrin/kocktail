const router = require("express").Router(),
  homeController = require("../controllers/homeController");
  
router.get("/", homeController.index);

// 관리자 로그인 시, admin/index.ejs로 이동
router.get("/admin/index", homeController.adminIndex);

module.exports = router;
