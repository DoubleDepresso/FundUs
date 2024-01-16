const { Op } = require('sequelize');

const db = require("../models");
const Campaign = db.campaign;
const Item = db.item;
const Transaction = db.transaction;

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
    }).then(() => {
        res.status(200).send({success: true, message: "Item is donated"})
    })
    .catch(error => {
        res.status(404).send({success: false, message: error.message})
    })
    
};

exports.editCampaign = (req, res) => {
    Campaign.update({
        name: req.body.name,
        location: req.body.location,
        type: req.body.type,
        available: false,
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
        attributes: ["id", "name", "location", "physicalDonation", "startDate", "endDate", "goal"],
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
    .then(() => {
        res.status(200).send({success: true, message: "Item is donated"})
    })
    .catch(error => {
        console.log(error.message)
        res.status(404).send({success: false, message: error.message})
    });
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
};

exports.donateMoney = (req, res) => {
    Transaction.create({
        account: req.body.account,
        amount: req.body.amount,
        memberId: req.body.memberId,
        campaignId: req.body.campaignId,
    }).then(() => {
        res.status(200).send({success: true, message: "Transaction is donated"})
    })
    .catch(error => {
        res.status(404).send({success: false, message: error.message})
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
        where: {
            available: true,
            }
    })
    .then((records) => {
        res.status(200).send({ success: true, data: records });
    })
    .catch(error => {
        console.log(error.message)
        res.status(404).send({ success: false, message: error.message })
    });
};

exports.getSearchResult = (req, res) =>  {
    const {current = 0, searchField = '' } = req.query;

    let [keyword, location, direction, field] = searchField.split(',');

    location = location.toLowerCase();
    keyword = keyword.toLowerCase();

    // Default values for direction and field
    direction = direction || 'DESC';
    field = field || 'goal';

    const limit = 2;

    Campaign.findAll({
        order: [[field, direction]],
        where: {
            available: true,
            }
        })
    .then((campaign) => {
        // add campaign with location to locationSearch
        const locationSearch = campaign.filter(record => 
            record.location.toLowerCase().includes(location));
            
        // add campaign with keyword to keywordSearch
        const keywordSearch = campaign.filter(record => 
            record.name.toLowerCase().includes(keyword) || 
            (record.description.toLowerCase().includes(keyword)));
    
        // if search by location then return locationSearch
        if (location.length > 0) {
            return locationSearch
        }

        // by default return keywordSearch
        return keywordSearch;
    })
    .then((sortedSearch) => {
        const endIndex = current + limit;

        // return campaign with in the current to endIndex
        const sortedCampaign = sortedSearch.slice(current, endIndex);
        return sortedCampaign;
    })
    .then((sortedCampaign) => {
        res.status(200).send({ success: true, data: sortedCampaign });
    })
    .catch(error => {
        console.log(error.message)
        res.status(404).send({ success: false, message: error.message })
    });
};
