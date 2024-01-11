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
    },
    {
        tableName: "items",
        timeStamps: true,
    });
    return Item;
};