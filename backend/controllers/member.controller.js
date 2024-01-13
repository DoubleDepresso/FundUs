const db = require("../models");
const Member = db.member;

exports.editMember = (req, res) => {
    Member.update({
        name: req.body.name,
        password: req.body.password,
        address: req.body.address,
        phone: req.body.phone,
        email: req.body.email,
    }, {
        where: {id : req.body.id}
    })
    .then(result => {
        if (result == 1) {
            res.status(200).send({success: true, message: "update successfully"})
        } else {
            res.status(404).send({"error": result})
        }
    });
};

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