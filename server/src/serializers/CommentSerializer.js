class CommentSerializer {
    static showCommentDetails(comment) {
        const allowedAttributes = ["id", "comment"]
        const serializedComment = {}
        for (const attribute of allowedAttributes) {
            serializedComment[attribute] = comment[attribute]
        }
        return serializedComment
    }
}

export default CommentSerializer