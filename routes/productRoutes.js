const router = require("express").Router(),
  usersController = require("../controllers/usersController"),
  productsController = require("../controllers/productsController"),
  cartController = require("../controllers/cartController"),
  orderController = require("../controllers/orderController"),
  multer = require('multer'); 
  let  upload = multer({ dest : './public/img/'});

router.get("/products", productsController.index, productsController.productsView);
router.get("/productsInsert", productsController.productsInsert);
router.post("/inserted", upload.single('file'), productsController.create, productsController.redirectView);
router.get("/productsList", productsController.productsList);
router.get("/productsSub/:productsId", productsController.productsSub);
router.get("/products/:productsId/edit", productsController.edit);
router.put("/products/:productsId/update", productsController.update, productsController.redirectView);
router.delete("/products/:productsId/delete", productsController.delete, productsController.redirectView);

// products.ejs 에서 '장바구니' 버튼 누르면 DB cart collection에 저장
router.post("/productsSub/cartInsert", cartController.create, cartController.redirectView);
// products.ejs 에서 '구매하기' 버튼 누르면 DB order collection에 저장
router.post("/productsSub/ordered", orderController.create, orderController.redirectView);

// admin 페이지에서 주문 목록 조회하기
router.get("/orders", orderController.index, usersController.index, orderController.orderView);
// admin 페이지 주문 목록 수정하기
 router.get("/admin/:orderId/edit", orderController.edit);
 router.put("/admin/:orderId/update", orderController.update, orderController.redirectView);


module.exports = router;


