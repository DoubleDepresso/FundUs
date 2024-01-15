const { Op } = require('sequelize');

const db = require("../models");
const Campaign = db.campaign;
const Item = db.item;


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
        attributes: ["id", "name", "location", "type", "startDate", "endDate", "goal"],
        where: {
            hostId : req.params.hostId,
            available: true,
        }
    })
    .then((records) => {
        res.status(200).send({data: records});
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

exports.donateItem = (req, res) => {
    Item.create({
        name: req.body.name,
        type: req.body.type,
        condition: req.body.condition,
        pickupDate: req.body.pickupDate,
        pickupLocation: req.body.pickupLocation,
        pickupStatus: req.body.pickupStatus,
        description: req.body.description,
        memberId: req.body.memberId,
        campaignId: req.body.campaignId,
    })
    .catch(error => {
        console.log(error.message)
        res.status(404).send({success: false, message: error.message})
    });
    res.status(200).send({success: true, message: "Item is donated"})
}

exports.deleteCampaign = (req, res) => {
    Campaign.destroy({
        where: {
           id : parseInt(req.params.campaignId)
        }
    }).then(deleted => {
        res.status(200).send({success: true, message: `${deleted} is deleted!`})
    })
    .catch(err => {
        res.status(400).send({success: false, message: err.message})
    })
} 

exports.getSortedCampaign = (req, res) =>  {
    const { current = 0, sorting = '' } = req.query;

    const [field, direction] = sorting.split(',');
    const limit = 2;

    Campaign.findAll({
        order: [[field, direction]],
        offset: parseInt(current), 
        limit: parseInt(limit),
    })
    .then((records) => {
        res.status(200).send({ success: true, data: records });
    })
    .catch(error => {
        console.log(error.message)
        res.status(404).send({ success: false, message: error.message })
    });
};

exports.getKeywordSearch = (req, res) =>  {
    var { keyword = ''} = req.query;
    keyword = keyword.toLowerCase();

    Campaign.findAll({
        where: {
            available: true,
            }
        })
    .then((records) => {
        const keywordSearch = records.filter(record => 
            record.name.toLowerCase().includes(keyword) || 
            (record.description.toLowerCase().includes(keyword)));

        return keywordSearch;
    })
    .then((records) => {
        res.status(200).send({ success: true, data: records });
    })
    .catch(error => {
        console.log(error.message)
        res.status(404).send({ success: false, message: error.message })
    });
};

exports.getLocationSearch = (req, res) =>  {
    var { location = 'seed' } = req.query;
    location = location.toLowerCase();

    Campaign.findAll({
        where: {
            available: true,
            }
        })
    .then((records) => {
        const locationSeach = records.filter(record => 
            record.location.toLowerCase().includes(location));

        return locationSeach;
    })
    .then((records) => {
        res.status(200).send({ success: true, data: records });
    })
    .catch(error => {
        console.log(error.message)
        res.status(404).send({ success: false, message: error.message })
    });
};
