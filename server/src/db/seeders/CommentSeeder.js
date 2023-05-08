import { Comment, Website } from "../../models/index.js"

class CommentSeeder {
    static async seed() {
        const websiteOne  = await Website.query().findOne({
            name: "Twitter"
        })
        const websiteTwo  = await Website.query().findOne({
            name: "Facebook"
        })
        const websiteThree  = await Website.query().findOne({
            name: "Instagram"
        })

        const commentsData = [
            {
                comment: "This is a great platform!",
                websiteId: websiteOne.id,
                userId: 1
            },
            {
                comment: "I don't like this platform.",
                websiteId: websiteTwo.id,
                userId: 2
            },
            {
                comment: "I have mixed feelings about this platform.",
                websiteId: websiteThree.id,
                userId: 3
            }
        ]

        for (const singleCommentData of commentsData) {
            const currentComment = await Comment.query().findOne({ comment: singleCommentData.comment })
            if (!currentComment) {
                await Comment.query().insert(singleCommentData)
            }
        }
    }
}

export default CommentSeeder
