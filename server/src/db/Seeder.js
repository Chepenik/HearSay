/* eslint-disable no-console */
import { connection } from "../boot.js"
import WebsiteSeeder from "./seeders/WebsiteSeeder.js"
import UserSeeder from "./seeders/UserSeeder.js"

class Seeder {
  static async seed() {
    console.log("seeding websites and users...")
    await WebsiteSeeder.seed()
    await UserSeeder.seed()

    console.log("Done!")
    await connection.destroy()
  }
}

export default Seeder