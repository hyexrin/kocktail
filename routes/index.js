const router = require("express").Router(),
  userRoutes = require("./userRoutes"),
  productRoutes = require("./productRoutes"),
  homeRoutes = require("./homeRoutes");

router.use("/", userRoutes);
router.use("/", productRoutes);
router.use("/", homeRoutes);

module.exports = router;
