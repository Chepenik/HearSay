import React from "react";

const UserProfile = ({ user }) => {
    return (
        <div>
            <h1>Welcome to HearSay!</h1>
            <p>Your email: {user.email}</p>
        </div>
    )
}

export default UserProfile