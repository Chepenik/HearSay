/* eslint-disable no-console */
import { connection } from "../boot.js"
import WebsiteSeeder from "./seeders/WebsiteSeeder.js"

class Seeder {
  static async seed() {
    console.log("seeding websites...")
    await WebsiteSeeder.seed()

    console.log("Done!")
    await connection.destroy()
  }
}

export default Seeder