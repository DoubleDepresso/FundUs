module.exports = (sequelize, Sequelize) => {
    const Transaction = sequelize.define("transaction", {
        // account: {
        //     type: Sequelize.STRING, //should be memberID
        // },
        type:{ 
            type: Sequelize.STRING,
        },
        // campaignName:{ 
        //     type: Sequelize.STRING, // should be campaignID
        // },
        amount:{ 
            type: Sequelize.INTEGER,
        },
        date: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
    },
    {
        tableName: "transactions",
        timeStamps: true,
    });
    return Transaction;
};