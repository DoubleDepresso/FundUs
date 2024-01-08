module.exports = (sequelize, Sequelize) => {
    const Member = sequelize.define("members", {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        username: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        address: {
            type: Sequelize.STRING
        },
        phone: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        verification: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
    },
    {
        tableName: "members", 
        timeStamps: true,
    });
  
    return Member;
  };