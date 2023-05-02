import { User } from "../../models/index.js"

class UserSeeder {
    static async seed() {
        const usersData = [
            {
                email: "david@david.com",
                password: "123"
            },
            {
                email: "angelina@angelina.com",
                password: "123"
            },
            {
                email: "conor@conor.com",
                password: "123"
            },
            {
                email: "therese@therese.com",
                password: "123"
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