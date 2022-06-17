const router = require("express").Router();
const cartController = require("../controllers/cartController");
const usersController = require("../controllers/usersController");
const orderController = require("../controllers/orderController");

// users collection에서 회원 정보 목록 조회
router.get("/users", usersController.index, usersController.userView);
// login.ejs에서 join버튼 입력 시, 회원가입(join.ejs) 페이지로 이동
router.get("/join", usersController.join);
// join.ejs에서 회원가입 시, input 정보 post
router.post("/joined", usersController.validate, usersController.joined, usersController.redirectView);

// header의 login 버튼 입력 시, login.ejs로 이동
router.get("/login", usersController.login);
// login.ejs에서 login 버튼 입력 시, login
router.post("/login", usersController.authenticate, usersController.adminFilter);
//header의 logout 버튼 입력 시, logout
router.get("/logout", usersController.logout, usersController.redirectView);

// myPage를 장바구니 기능 겸용으로 사용
router.get("/users/:id", usersController.myPage, cartController.cart, orderController.order, usersController.myPageView);

// users에서 id의 정보 수정을 위해 edit.ejs로 이동
router.get("/users/:id/edit", usersController.edit);
// 정보 수정 시, db에 저장하기 위해 put
router.put("/users/:id/update", usersController.update, usersController.redirectView);
// user정보 삭제
router.delete("/users/:id/delete", usersController.delete, usersController.redirectView);

module.exports = router;