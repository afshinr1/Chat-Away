const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json("web/index");
});

/* For validation */
router.use("/auth", require("./auth"));
module.exports = router;
