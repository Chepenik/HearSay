import React from "react";
import { BrowserRouter } from "react-router-dom";
import SocialMediaList from "./SocialMediaList";

const SocialMediaIndexPage = (props) => {
    return (
        <div className="grid-container">
                <SocialMediaList />
        </div>
    )
};

export default SocialMediaIndexPage;
