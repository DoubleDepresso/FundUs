const controller = require("../controllers/auth.controller");
const express = require("express");
const router = express.Router();


router.use(function(req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});



router.post("/api/auth/signin", controller.signin);
router.post("/api/auth/signup", controller.signUp);


module.exports = router;