const router = require("express").Router(),
  userRoutes = require("./userRoutes"),
  productRoutes = require("./productRoutes"),
  errorRoutes = require("./errorRoutes"),
  homeRoutes = require("./homeRoutes");

router.use("/", userRoutes);
router.use("/", productRoutes);
router.use("/", homeRoutes);
router.use("/", errorRoutes)

module.exports = router;
