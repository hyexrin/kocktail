const router = require("express").Router(),
  productsController = require("../controllers/productsController"),
  cartController = require("../controllers/cartController");

router.get("/products", productsController.index, productsController.productsView);
router.get("/productsInsert", productsController.productsInsert);
router.post("/inserted", productsController.create, productsController.redirectView);

// products.ejs 에서 '장바구니' 버튼 누르면 DB cart collection에 저장
router.post("/cartInsert", cartController.create, cartController.redirectView);

module.exports = router;
