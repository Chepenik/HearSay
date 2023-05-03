import React, { useState, useEffect } from "react";
import SocialMediaTile from "./SocialMediaTile";

const SocialMediaList = () => {
  const [socialMediaSites, setSocialMediaSites] = useState([]);

  const fetchSocialMediaSites = async () => {
    try {
      const response = await fetch("/api/v1/websites");
      if (response.ok) {
        const data = await response.json();
        setSocialMediaSites(data.websites);
      } else {
        console.error("Failed to fetch social media sites:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching social media sites:", error);
    }
  };

  useEffect(() => {
    fetchSocialMediaSites();
  }, []);

  const socialMediaItems = socialMediaSites.map((socialMedia) => {
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