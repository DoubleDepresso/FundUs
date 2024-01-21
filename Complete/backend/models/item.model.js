const Member = require("./member.model");
const Campaign = require("./campaign.model");

module.exports = (sequelize, Sequelize) => {
    const Item = sequelize.define("items", {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        type: {
            type: Sequelize.STRING,
        },
        condition: {
            type: Sequelize.STRING,
        },
        pickupDate: {
            type: Sequelize.DATE,
        },
        pickupLocation: {
            type: Sequelize.STRING,
        },
        pickupStatus: {
            type: Sequelize.BOOLEAN,
        },
        description: {
            type: Sequelize.STRING,
        },
        memberId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: Member,
                allowNull: false,
                key: "id",
            }
        },
        campaignId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: Campaign,
                allowNull: false,
                key: "id",
            }
        },
    },
    {
        tableName: "items",
        timeStamps: true,
    });
    return Item;
};