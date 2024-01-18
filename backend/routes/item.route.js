const controller = require("../controllers/item.controller");
const express = require("express");
const router = express.Router();

router.get("/get-item-by-campaignId/:campaignId", controller.getItemsByCampaignId);


module.exports = router;