class WebsiteSerializer {
    static async showDetails(website) {
        const allowedAttributes = ["id", "name", "url", "description"]

        let serializedWebsite = {}
        for (const attribute of allowedAttributes) {
            serializedWebsite[attribute] = website[attribute]
        }
        serializedWebsite.comments = await website.$relatedQuery("comments")
        return serializedWebsite
    }

    static getDetailsForList(website) {
        const allowedAttributes = ["id", "name", "url", "description"]

        let serializedWebsite = {}
        for (const attribute of allowedAttributes) {
            serializedWebsite[attribute] = website[attribute]
        }
        return serializedWebsite
    }
}

export default WebsiteSerializer