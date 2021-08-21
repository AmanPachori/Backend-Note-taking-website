const express = require("express");
const { signup, signIn } = require("../controllers/auth");
const router = express.Router();

router.get("/auth", (req, res) => {
  res.send("heelo");
});

router.post("/signup", signup);
router.post("/signin", signIn);

module.exports = router;
