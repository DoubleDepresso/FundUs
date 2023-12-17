const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser")
const db = require("./models")
const mysql = require('mysql2/promise');
const Member = db.member;
const memberData = require("./data/member.data")
const authRouter = require("./routes/auth.route")

mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
}).then((connection) => {
    connection
      .query('CREATE DATABASE IF NOT EXISTS FundUs;')
      .then(() => {
        db.sequelize.sync({force: true}).then(() => {
          memberData.initial(Member);
        });
      })
})


app.use(bodyParser.json());
app.use(cors());

app.use("/", authRouter)

app.listen(2222, () => {
    console.log("Connected!")
});