const controller = require("../controllers/campaign.controller");
const express = require("express");
const router = express.Router();




router.post("/create-campaign", controller.createCampaign);
router.post("/donate-item", controller.donateItem);

router.put("/edit-campaign", controller.editCampaign);

router.get("/get-campaign-by-hostId/:hostId", controller.getCampaignByHostId);
router.get("/get-campaign-by-campaignId/:campaignId", controller.getCampaignByCampaignId);
router.get("/get-sorted-campaign", controller.getSortedCampaign);
router.get("/get-keyword-search", controller.getKeywordSearch);
router.get("/get-location-search", controller.getLocationSearch);



router.delete("/delete-campaign/:campaignId", controller.deleteCampaign);

module.exports = router;