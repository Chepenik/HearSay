import { Comment } from "../../models/index.js"

class CommentSeeder {
    static async seed() {
        const commentsData = [
            {
                comment: "This is a great platform!",
                websiteId: 1,
                userId: 1
            },
            {
                comment: "I don't like this platform.",
                websiteId: 2,
                userId: 2
            },
            {
                comment: "I have mixed feelings about this platform.",
                websiteId: 3,
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
