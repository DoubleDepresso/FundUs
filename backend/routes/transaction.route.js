const controller = require("../controllers/transaction.controller");
const express = require("express");
const router = express.Router();

router.get("/get-transaction-by-campaignId/:campaignId", controller.getTransactionByCampaignId);


module.exports = router;