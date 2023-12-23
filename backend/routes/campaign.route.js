const controller = require("../controllers/campaign.controller");
const express = require("express");
const router = express.Router();


router.use(function(req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});



router.post("/api/campaign/create-campaign", controller.createCampaign);

module.exports = router;