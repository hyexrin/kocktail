const router = require("express").Router(),
  productsController = require("../controllers/productsController"),
  cartController = require("../controllers/cartController");

router.get("/products", productsController.index, productsController.productsView);
router.get("/productsInsert", productsController.productsInsert);
router.post("/inserted", productsController.create, productsController.redirectView);

router.post("/cartInsert", cartController.create, cartController.redirectView);

module.exports = router;
