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



router.post("/create-campaign", controller.createCampaign);
router.put("/edit-campaign", controller.editCampaign);
router.get("/get-campaign-by-hostId/:hostId", controller.getCampaignByHostId);
router.get("/get-campaign-by-campaignId/:campaignId", controller.getCampaignByCampaignId);

module.exports = router;