const { Op } = require('sequelize');

const db = require("../models");
const Campaign = db.campaign;
const Item = db.item;
const Transaction = db.transaction;
const Member = db.member;

exports.createCampaign = (req, res) => {
    Campaign.create({
        name: req.body.name,
        hostId: req.body.hostId,
        location: req.body.location,
        moneyDonation: req.body.includeMoney,
        physicalDonation: req.body.includeItem,
        available: req.body.available,
        description: req.body.description,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        moneyGoal: req.body.moneyGoal,
        physicalGoal: req.body.physicalGoal,
    }).then(() => {
        res.status(200).send({success: true, message: "Campaign is created"})
    })
    .catch(error => {
        res.status(404).send({success: false, message: error.message})
    })
    
};

exports.editCampaign = (req, res) => {
    Campaign.update({
        name: req.body.name,
        location: req.body.location,
        moneyDonation: req.body.includeMoney,
        physicalDonation: req.body.includeItem,
        available: req.body.available,
        description: req.body.description,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        moneyGoal: req.body.moneyGoal,
        physicalGoal: req.body.physicalGoal,
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
        attributes: ["id", "name", "location", "physicalDonation", "moneyDonation", "startDate", "endDate", "physicalGoal", "moneyGoal"],
        where: {
            hostId : req.params.hostId,
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
        },
        include: {
            model: Member,
            attribute: ["name"],
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
    const limit = 6;

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
    field = field || 'moneyGoal';

    const limit = 6;

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
        const startIndex = current * limit;
        const endIndex = startIndex + limit;

        // return campaign with in the current to endIndex
        const sortedCampaign = sortedSearch.slice(startIndex, endIndex);
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

exports.getFollowingCampaign = (req, res) =>  {
    const {memberId = '' } = req.query;

    if (memberId === '') {
        res.status(404).send({ success: false, message: 'Member ID is required'});
    };

    Promise.all([
        Transaction.findAll({
            where: {
                memberId: memberId,
            },
        }),
        Item.findAll({
            where: {
                memberId: memberId,
            },
        }),
    ])
    .then(([transaction, items]) => {
        res.status(200).send({
            success: true,
            transactionData: transaction,
            itemData: items,
        });
    })
    .catch(error => {
        console.log(error.message)
        res.status(404).send({ success: false, message: error.message })
    });
};
