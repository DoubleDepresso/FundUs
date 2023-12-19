module.exports = {
    initial : function (Campaign) {
        Campaign.create({
            name: "Stop Poverty",
            hostId: 1,
            location: "Hanoi",
            type: "Money",
            available: true,
            description: "We are raising fund to help stop poverty",
            startDate: "2023-01-02",
            endDate: "2023-02-25",
            goal: 100000000,
        })
    }
}