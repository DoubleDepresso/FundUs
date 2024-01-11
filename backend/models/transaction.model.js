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
    },
    {
        tableName: "transactions",
        timeStamps: true,
    });
    return Transaction;
};