const db = require("../models");
const Item = db.item;
const Member = db.member;

exports.getItemsByCampaignId = (req, res) => {
    Item.findAll({
        where: {
            campaignId: req.params.campaignId,
        },
        include: [{
            model: Member,
            attributes: ["name"], // Specify the columns you want to retrieve from Table2
        }],
    })
    .then((records) => {
        res.status(200).json({success: true, message: records.slice(0, 5)});
    })
    .catch(error => {
        console.log(error.message)
        res.status(404).send({success: false, message: error.message})
    });
}