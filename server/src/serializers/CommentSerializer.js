class CommentSerializer {
    static showCommentDetails(comment) {
        const allowedAttributes = ["id", "comment", "rating"]
        const serializedComment = {}
        for (const attribute of allowedAttributes) {
            serializedComment[attribute] = comment[attribute]
        }

        // I know we are not supposed to have notes but I need this one so I can remember to GET THE TOTAL at some point

        return serializedComment
    }
}

export default CommentSerializer