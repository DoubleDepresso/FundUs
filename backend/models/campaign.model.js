module.exports = (sequelize, Sequelize) => {
    const Campaign = sequelize.define("campaigns", {
        name: {
            type: Sequelize.STRING,
        },
        location:{ 
            type: Sequelize.STRING,
        },
        host: {
            type: Sequelize.STRING //should be memberID
        },
        type: {
            type: Sequelize.STRING
        },
        available: {
            type: Sequelize.BOOLEAN
        },
        description: {
            type: Sequelize.STRING
        },
        startDate: {
            type: Sequelize.DATE
        },
        endDate: {
            type: Sequelize.DATE
        },
        goal: {
            type: Sequelize.INT
        },
    },
    {
        tableName: "campaigns",
        timeStamps: true,
    });
    return Campaign
};