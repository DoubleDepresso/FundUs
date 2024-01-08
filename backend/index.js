const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser")
const db = require("./models")
const mysql = require('mysql2/promise');
const Member = db.member;
const Campaign = db.campaign;
const Transaction = db.transaction;
const memberData = require("./data/member.data");
const campaignData = require("./data/campaign.data")
const authRouter = require("./routes/auth.route");
const campaignRouter = require("./routes/campaign.route");

// Association
Member.hasMany(Campaign, {
    foreignKey: {
      name: "hostId",
      allowNull: false,
    },
});
Campaign.belongsTo(Member, {
    foreignKey: {
      name: "hostId",
      allowNull: false,
    },
});
Member.hasMany(Transaction, {
  foreignKey: {
    name: "memberId",
    allowNull: false,
  }
});
Transaction.belongsTo(Member, {
  foreignKey: {
    name: "memberId",
    allowNull: false,
  }
});
Campaign.hasMany(Transaction, {
  foreignKey: {
    name: "campaginId",
    allowNull: false,
  },
});
Transaction.belongsTo(Campaign, {
  foreignKey: {
    name: "campaginId",
    allowNull: false,
  },
});

// create database
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
          campaignData.initial(Campaign);
        });
      })
})


app.use(bodyParser.json());
app.use(cors());

app.use("/", authRouter);
app.use("/api/campaign", campaignRouter);

app.listen(2222, () => {
    console.log("Connected!")
});