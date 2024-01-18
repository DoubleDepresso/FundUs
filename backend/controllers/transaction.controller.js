const db = require("../models");
const Transaction = db.transaction;
const Member = db.member;

exports.getTransactionByCampaignId = (req, res) => {
    Transaction.findAll({
        where: {
            campaignId: req.params.campaignId,
        },
        include: {
            model: Member,
            attribute: ["name"],
        }
    })
    .then((records) => {
        res.status(200).json({success: true, message: records.slice(0, 5)});
    })
    .catch(error => {
        console.log(error.message)
        res.status(404).send({success: false, message: error.message})
    });
}
