const config = require("../config/db.config");

const Sequelize = require("sequelize");
const sequelize = new Sequelize({
    database: "FundUs",
    username: "rmit_student",
    password: "521kimma",
    host: "18.141.201.175",
    dialect: "mysql",
});


const db = {}

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.member = require("./member.model.js")(sequelize, Sequelize);
db.campaign = require("./campaign.model.js")(sequelize, Sequelize);
db.transaction = require("./transaction.model.js")(sequelize, Sequelize);
db.item = require("./item.model.js")(sequelize, Sequelize);

module.exports = db;
