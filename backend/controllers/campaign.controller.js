const db = require("../models");
const Campaign = db.campaign;

exports.createCampaign = (req, res) => {
    Campaign.create({
        name: req.body.name,
        hostId: req.body.hostId,
        location: req.body.location,
        type: req.body.type,
        available: req.body.available,
        description: req.body.description,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        goal: req.body.goal,
    })
    res.status(200).send({success: true, message: "Your campaign is created successfully!"})
    
};

exports.editCampaign = (req, res) => {
    Campaign.update({
        name: req.body.name,
        location: req.body.location,
        type: req.body.type,
        available: req.body.available,
        description: req.body.description,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        goal: req.body.goal,
    }, {
        where: {id : req.body.id}
    })
    .then(result => {
        if (result == 1) {
            res.status(200).send({success: true, message: "update successfully"})
        } else {
            res.status(404).send({"error": result})
        }
    });
};

exports.getCampaignByHostId = (req, res) =>  {
    Campaign.findAll({
        where: {
            hostId : req.params.hostId
        }
    })
    .then((records) => {
        res.status(200).send({records});
    })
    .catch(error => {
        res.status(404).send({success: false, message: error.message})
    });

};

exports.getCampaignByCampaignId = (req, res) =>  {
    Campaign.findAll({
        where: {
            id : parseInt(req.params.campaignId)
        }
    })
    .then((records) => {
        res.status(200).send({success: true, data: records});
    })
    .catch(error => {
        console.log(error.message)
        res.status(404).send({success: false, message: error.message})
    });

};