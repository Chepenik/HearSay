import React, { useState, useEffect } from "react";
import SocialMediaTile from "./SocialMediaTile";

const SocialMediaList = (props) => {
  const [socialMedia, setSocialMedia] = useState([]);

  const getSocialMedia = async () => {
    try {
      const response = await fetch("/api/v1/websites");
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }
      const data = await response.json();
      setSocialMedia(data.websites);
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`);
    }
  };

  useEffect(() => {
    getSocialMedia();
  }, []);

  const socialMediaItems = socialMedia.map((socialMedia) => {
    return <SocialMediaTile key={socialMedia.id} socialMedia={socialMedia} />;
  });

  return (
    <div className="hearsay">
      <h1 className="hearsay">HearSay</h1>
      <h5>Check out what other internet users have to say</h5>
      <div className="social-media-list">{socialMediaItems}</div>
    </div>
  );
};

export default SocialMediaList;
