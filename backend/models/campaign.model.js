module.exports = (sequelize, Sequelize) => {
    const Campaign = sequelize.define("campaigns", {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        location:{ 
            type: Sequelize.STRING,
        },
        type: {
            type: Sequelize.STRING,
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
        goal: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
    },
    {
        tableName: "campaigns",
        timeStamps: true,
    });
    return Campaign
};