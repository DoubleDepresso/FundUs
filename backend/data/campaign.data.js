module.exports = {
    initial : function (Campaign) {
        Campaign.create({
            name: "Stop Poverty 1",
            hostId: 1,
            location: "Hanoi",
            type: "Money",
            available: true,
            description: "We are raising fund to help stop poverty",
            startDate: "2023-01-02",
            endDate: "2023-02-25",
            goal: 100000000,
        });
        Campaign.create({
            name: "Stop Poverty 4",
            hostId: 4,
            location: "Hanoi",
            type: "Money, Item",
            available: true,
            description: "We are raising fund to help stop poverty 2",
            startDate: "2023-01-01",
            endDate: "2025-02-02",
            goal: 1000000000,
        });
        Campaign.create({
            name: "Stop Poverty 2",
            hostId: 2,
            location: "Hanoi",
            type: "Money, Item",
            available: true,
            description: "We are raising fund to help stop poverty 2",
            startDate: "2023-01-01",
            endDate: "2025-02-02",
            goal: 1000000000,
        });
        Campaign.create({
            name: "Stop Poverty 2",
            hostId: 2,
            location: "Hanoi",
            type: "Money, Item",
            available: true,
            description: "We are raising fund to help stop poverty 2",
            startDate: "2023-01-01",
            endDate: "2025-02-02",
            goal: 1000000000,
        });
        Campaign.create({
            name: "Stop Poverty 3",
            hostId: 3,
            location: "Hanoi",
            type: "Money, Item",
            available: true,
            description: "We are raising fund to help stop poverty 2",
            startDate: "2023-01-01",
            endDate: "2025-02-02",
            goal: 1000000000,
        })
    }
}