const router = require("express").Router(),
  productsController = require("../controllers/productsController"),
  cartController = require("../controllers/cartController"),
  orderController = require("../controllers/orderController"),
  multer = require('multer'); 
  let  upload = multer({ dest : './public/img/'});

router.get("/products", productsController.index, productsController.productsView);
router.get("/productsInsert", productsController.productsInsert);
router.post("/inserted", upload.single('file'), productsController.create, productsController.redirectView);

// products.ejs 에서 '장바구니' 버튼 누르면 DB cart collection에 저장
router.post("/cartInsert", cartController.create, cartController.redirectView);
// products.ejs 에서 '구매하기' 버튼 누르면 DB order collection에 저장
router.post("/ordered", orderController.create, orderController.redirectView);

module.exports = router;
