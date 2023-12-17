
module.exports = {
    initial: function (Member) {
        Member.create({
            name: "Anna Brown",
            username: "annaBrown",
            password: "12345",
            address: "RMIT Vietnam",
            phone: "0900000000",
            email: "anna@gmeow",
            verification: "001"
        });
        Member.create({
            name: "Ciara Trinh",
            username: "CiaraTrinh",
            password: "12345",
            address: "Wilfrid Laurier University",
            phone: "0900000000",
            email: "ciara@gmeow",
            verification: "001"
        });
    }
}




