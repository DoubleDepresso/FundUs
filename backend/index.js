const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser")
const db = require("./models");
const Member = db.member;
const Campaign = db.campaign;
const Transaction = db.transaction;
const Item = db.item;
const authRouter = require("./routes/auth.route");
const campaignRouter = require("./routes/campaign.route");
const memberRouter = require("./routes/member.route");
const transactionRouter = require("./routes/transaction.route");
const itemRouter = require("./routes/item.route");

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
    name: "campaignId",
    allowNull: false,
  },
});
Transaction.belongsTo(Campaign, {
  foreignKey: {
    name: "campaignId",
    allowNull: false,
  },
});
Campaign.hasMany(Item, {
  foreignKey: {
    name: "campaignId",
    allowNull: false,
  }
});
Item.belongsTo(Campaign, {
  foreignKey: {
    name: "campaignId",
    allowNull: false,
  }
});
Member.hasMany(Item, {
  foreignKey: {
    name: "memberId",
    allowNull: false,
  }
});
Item.belongsTo(Member, {
  foreignKey: {
    name: "memberId",
    allowNull: false,
  }
});
// connect to database
db.sequelize.sync({force: false}).then(() => {
  console.log("Connect to database!")
});
app.use(bodyParser.json());
app.use(cors());

app.use("/", authRouter);
app.use("/api/campaign", campaignRouter);
app.use("/api/member", memberRouter);
app.use("/api/transaction", transactionRouter);
app.use("/api/item/", itemRouter);


app.listen(2222, () => {
    console.log("Connected!")
});