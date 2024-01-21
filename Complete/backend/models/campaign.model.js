const Member = require("./member.model");

module.exports = (sequelize, Sequelize) => {
    const Campaign = sequelize.define("campaigns", {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        location:{ 
            type: Sequelize.STRING,
        },
        physicalDonation: {
            type: Sequelize.BOOLEAN,
        },
        moneyDonation: {
            type: Sequelize.BOOLEAN,
        },
        available: {
            type: Sequelize.BOOLEAN,
        },
        description: {
            type: Sequelize.STRING,
        },
        startDate: {
            type: Sequelize.DATE,
        },
        endDate: {
            type: Sequelize.DATE,
        },
        moneyGoal: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        physicalGoal: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        hostId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: Member, 
                key: 'id', 
            },
        }
    },
    {
        tableName: "campaigns",
        timeStamps: true,
    });
    return Campaign
};