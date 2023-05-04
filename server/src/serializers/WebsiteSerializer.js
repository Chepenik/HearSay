class WebsiteSerializer {
    static showDetails(website) {
        const allowedAttributes = ["id", "name", "url", "description"]

        let serializedWebsite = {}
        for (const attribute of allowedAttributes) {
            serializedWebsite[attribute] = website[attribute]
        }
        return serializedWebsite
    }
}

export default WebsiteSerializer