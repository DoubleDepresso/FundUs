const Member = require("./member.model");
const Campaign = require("./campaign.model");


module.exports = (sequelize, Sequelize) => {
    const Transaction = sequelize.define("transaction", {
        account: {
            type: Sequelize.STRING, 
        },
        amount:{ 
            type: Sequelize.INTEGER,
        },
        time: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
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
        tableName: "transactions",
        timeStamps: true,
    });
    return Transaction;
};