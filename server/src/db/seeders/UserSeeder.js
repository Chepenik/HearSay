import { User } from "../../models/index.js"

class UserSeeder {
    static async seed() {
        const usersData = [
            {
                email: "david@david.com",
                username: "david",
                password: "123",
                admin: true
            },
            {
                email: "angelina@angelina.com",
                username: "angelina",
                password: "123",
                admin: true
            },
            {
                email: "conor@conor.com",
                username: "conor",
                password: "123",
                admin: true
            },
            {
                email: "therese@therese.com",
                username: "therese",
                password: "123",
                admin: true
            },
            {
                email: "todd@todd.com",
                username: "todd",
                password: "123",
                admin: false
            }
        ]

        for (const singleUserData of usersData) {
            const currentUser = await User.query().findOne({email: singleUserData.email })
            if (!currentUser) {
                await User.query().insert(singleUserData)
            }
        }
    }
}

export default UserSeeder