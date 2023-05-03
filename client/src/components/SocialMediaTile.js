import React from "react";
import { Link } from "react-router-dom";

const SocialMediaTile = (props) => {
  const { socialMedia } = props;

  return (
      <Link to={`/websites/${socialMedia.id}`} className="social-media-item">
        <img src="https://nostr.build/p/nb7149.jpeg" alt={socialMedia.name} />
        <p>{socialMedia.name}</p>
      </Link>
  );
};

export default SocialMediaTile;
