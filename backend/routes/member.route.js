const controller = require("../controllers/member.controller");
const express = require("express");
const router = express.Router();


router.put("/edit-member", controller.editMember);
router.get("/get-member-by-memberId/:memberId", controller.getMemberByMemberId);

module.exports = router;