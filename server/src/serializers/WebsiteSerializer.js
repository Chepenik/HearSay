import CommentSerializer from "./CommentSerializer.js"

class WebsiteSerializer {
    static async showDetails(website) {
        const allowedAttributes = ["id", "name", "url", "description"]
        let serializedWebsite = {}
        for (const attribute of allowedAttributes) {
            serializedWebsite[attribute] = website[attribute]
        }
        const relatedComments = await website.$relatedQuery("comments")
        const serializedComments = relatedComments.map((comment) => CommentSerializer.showCommentDetails(comment))
        serializedWebsite.comments = serializedComments
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