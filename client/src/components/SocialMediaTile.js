import React from "react";
import { Link } from "react-router-dom";

const SocialMediaTile = (props) => {
  const { socialMedia } = props;

  return (
    <div className="social-media-item">
      <Link to={`/${socialMedia.id}`}>
        <img src="https://nostr.build/p/nb7149.jpeg" alt={socialMedia.name} />
        <p>{socialMedia.name}</p>
      </Link>
    </div>
  );
};

export default SocialMediaTile;
