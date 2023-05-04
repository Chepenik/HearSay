/* eslint-disable no-console */
import { connection } from "../boot.js"
import WebsiteSeeder from "./seeders/WebsiteSeeder.js"
import UserSeeder from "./seeders/UserSeeder.js"
import CommentSeeder from "./seeders/CommentSeeder.js"

class Seeder {
  static async seed() {
    console.log("seeding websites and users...")
    await WebsiteSeeder.seed()
    await UserSeeder.seed()

    console.log("seeding comments...")
    await CommentSeeder.seed()

    console.log("Done!")
    await connection.destroy()
  }
}

export default Seeder
