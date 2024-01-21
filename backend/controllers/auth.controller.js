const db = require("../models");
const config = require("../config/secretKey.config");
const { Op } = require('sequelize'); //npm install sequelize

const Member = db.member;

var jwt = require("jsonwebtoken");

// Sign-in features
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
        var passwordIsValid = (req.body.password === member.password); 

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

// Sign-up features
exports.signUp = (req, res) => {
    //check if username, email and phone number already exists
    Member.findOne({
        where: {
            [Op.or]: [
                { username: req.body.username},
                { email: req.body.email},
                { phone: req.body.phone},
                { verification: req.body.verification}
            ]
        }
    })
    .then(member => {
        if (member) {
            // return field that input already exists
            if (member.username.toLowerCase() === req.body.username.toLowerCase()) {
                return res
                .status(409)
                .json({ field: "username" });

            } else if (member.email.toLowerCase() === req.body.email.toLowerCase()) {
                return res
                .status(409)
                .json({ field: "email" });

            } else if (member.phone === req.body.phone) {
                return res
                .status(409)
                .json({ field: "phone" });

            } else if (member.verification === req.body.verification) {
                return res
                .status(409)
                .json({ field: "verification" });
            }
        }

        try {
            // Create new user
            const input = req.body;
            Member.create({
                name: input.name,
                username: input.username,
                password: input.password,
                address: input.address,
                phone: input.phone,
                email: input.email,
                verification: input.verification
            })
        } catch (error) {
            console.error(error);
        }

        return res.status(200).send({ message: 'Sign up successful' }); 
    });
};