const db = require("../models");
const Member = db.member;

exports.editMember = async (req, res) => {
    try {
        // Check if the new email, password, or phone number already exist
        const existingMember = await Member.findOne({
            where: {
                [db.Sequelize.Op.or]: [
                    { email: req.body.email, id: { [db.Sequelize.Op.not]: req.body.id } },
                    { password: req.body.password, id: { [db.Sequelize.Op.not]: req.body.id } },
                    { phone: req.body.phone, id: { [db.Sequelize.Op.not]: req.body.id } }
                ]
            }
        });

        if (existingMember) {
            let conflictMessage = "";
            if (existingMember.email === req.body.email) {
                conflictMessage += "Email already exists. ";
            }
            if (existingMember.password === req.body.password) {
                conflictMessage += "Password already exists. ";
            }
            if (existingMember.phone === req.body.phone) {
                conflictMessage += "Phone number already exists. ";
            }
            return res.status(400).send({ success: false, message: conflictMessage.trim() });
        }

        // Proceed with the update
        const result = await Member.update({
            name: req.body.name,
            password: req.body.password,
            address: req.body.address,
            phone: req.body.phone,
            email: req.body.email,
        }, {
            where: { id: req.body.id }
        });

        if (result == 1) {
            res.status(200).send({ success: true, message: "Update successful" });
        } else {
            res.status(404).send({ success: false, message: "Update failed" });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ success: false, message: error.message });
    }
};
