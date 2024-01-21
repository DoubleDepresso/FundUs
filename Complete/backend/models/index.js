const config = require("../config/db.config");

const Sequelize = require("sequelize");
require('dotenv').config();
const sequelize = new Sequelize(process.env.DATABASE_URL, {
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
