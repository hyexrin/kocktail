const router = require("express").Router(),
  productsController = require("../controllers/productsController");

router.get("/products", productsController.index, productsController.productsView);
router.get("/productsInsert", productsController.productsInsert);
router.post("/inserted", productsController.create, productsController.redirectView);

module.exports = router;
