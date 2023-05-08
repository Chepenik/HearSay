import { Website } from '../../models/index.js';

class WebsiteSeeder {
    static async seed() {
        const websitesData = [
            {
                name: "Twitter",
                url: "https://twitter.com",
                description: "Social media for short messages",
                imageUrl: "Nick"
            },
            {
                name: "Facebook",
                url: "https://facebook.com",
                description: "Social media for long messages",
                imageUrl: "Nick"
            },
            {
                name: "Instagram",
                url: "https://instagram.com",
                description: "Social media for pictures",
                imageUrl: "Nick"
            }
        ]

        for (const singleWebsiteData of websitesData) {
            const currentWebsite = await Website.query().findOne({ name: singleWebsiteData.name })
            if (!currentWebsite) {
                await Website.query().insert(singleWebsiteData)
            }
        }
    }
}

export default WebsiteSeeder