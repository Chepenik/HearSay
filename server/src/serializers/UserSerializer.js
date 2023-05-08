class UserSerializer {
    static showDetails(user) {
            const allowedAttributes = ["id", "email", "username", "admin"]
            const serializedUser = {}
            for (const attribute of allowedAttributes) {
                serializedUser[attribute] = user[attribute]
            }
            return serializedUser
    }
}

export default UserSerializer