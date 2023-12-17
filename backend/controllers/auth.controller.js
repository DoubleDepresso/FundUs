const db = require("../models");
const config = require("../config/secretKey.config");

const Member = db.member;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signin = (req, res) => {
    console.log(req.body)
    Member.findOne({
        where: {
            username: req.body.username
        }
    })
    .then(member => {
        if (!member) {
            return res.status(404).send({ message: "User Not found." });
        }
        var passwordIsValid = (req.body.password === member.password); //use bcrypt to encrypt the passwords

        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: "Invalid Password!"
            });
        }

        const token = jwt.sign({ id: member.id }, config.secret,{
            algorithm: 'HS256',
            allowInsecureKeySizes: true,
            expiresIn: 86400, // 24 hours
        });

        res.status(200).send({
            id: member.id,
            name: member.name,
            address: member.address,
            phone: member.phone,
            email: member.email,
            created: member.created,
            updated: member.updated,
            accessToken: token
        });
    });
};