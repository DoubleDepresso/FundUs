
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
            verification: "002"
        });
        Member.create({
            name: "Que Trinh",
            username: "queTrinh",
            password: "123456789",
            address: "Wilfrid Laurier University",
            phone: "0900000000",
            email: "Q_u_e@gmeow",
            verification: "003"
        });
        Member.create({
            name: "Ciara Lycoris",
            username: "ciaraLycoris",
            password: "54321",
            address: "Wilfrid Laurier University",
            phone: "0900000000",
            email: "Cia-ra@gmeow",
            verification: "004"
        });
    }
}




