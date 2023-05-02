import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const SocialMediaList = (props) => {
    const [socialMedia, setSocialMedia] = useState([]);

    const getSocialMedia = async () => {
        try {
            const response = await fetch("/api/v1/websites");
            const data = await response.json();
            setSocialMedia(data.websites);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getSocialMedia();
    }, []);

    const socialMediaItems = socialMedia.map((socialMedia) => {
        return (
            <div className="social-media-item" key={socialMedia.id}>
                <Link to={`/${socialMedia.id}`}>
                    <img src="https://nostr.build/p/nb7149.jpeg" alt={socialMedia.name} />
                    <p>{socialMedia.name}</p>
                </Link>
            </div>
        )
    })

    return (
        <div className="hearsay">
            <h5>Check out what other internet users have to say</h5>
            <div className="social-media-list">{socialMediaItems}</div>
        </div>
    )
}

export default SocialMediaList;
