const config = require("../config/db.config");


const Sequelize = require("sequelize");
const sequelize = new Sequelize({
    database: "FundUs",
    username: "root",
    password: "root",
    host: "localhost",
    dialect: "mysql",
});


const db = {}

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.member = require("../models/member.model.js")(sequelize, Sequelize);


module.exports = db;

// sequelize.authenticate().then(() => {
//     console.log("Connection is established!")
// }).catch((error) => {
//     console.error("Cannot connect to database. Error: ", error)
// });

// sequelize.sync().then(() => {
//     console.log("Tables are created.")
// }).catch((error) => {
//     console.error("Cannot create table. Error: ", error);
// })