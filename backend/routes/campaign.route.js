const controller = require("../controllers/campaign.controller");
const express = require("express");
const router = express.Router();




router.post("/create-campaign", controller.createCampaign);
router.put("/edit-campaign", controller.editCampaign);
router.get("/get-ongoing-campaign", controller.getOngoingCampaign);
router.get("/get-campaign-by-hostId/:hostId", controller.getCampaignByHostId);
router.get("/get-campaign-by-campaignId/:campaignId", controller.getCampaignByCampaignId);
router.post("/donate-item", controller.donateItem);
router.delete("/delete-campaign/:campaignId", controller.deleteCampaign);
router.post("/donate-money", controller.donateMoney);


module.exports = router;