const db = require("../models");
const Member = db.member;

exports.getMemberByMemberId = (req, res) =>  {
    Member.findAll({
        where: {
            id : parseInt(req.params.memberId)
        }
    })
    .then((records) => {
        res.status(200).send({success: true, data: records});
    })
    .catch(error => {
        console.log(error.message)
        res.status(404).send({success: false, message: error.message})
    });

};

exports.editMember = async (req, res) => {
    try {
        // Check if the new email, password, or phone number already exist
        const existingMember = await Member.findOne({
            where: {
                [db.Sequelize.Op.or]: [
                    { email: req.body.email, id: { [db.Sequelize.Op.not]: req.body.id }},
                ]
            }
        });

        if (existingMember) {
            let conflictMessage = "Email already exists.";
            res.status(409).json({ success: false, message: conflictMessage });
            return;
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

        if (Number(result) === 1) {
            res.status(200).send({ success: true, message: "Update successful" });
        } else {
            res.status(404).send({ success: false, message: "Update failed" });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ success: false, message: error.message });
    }
};