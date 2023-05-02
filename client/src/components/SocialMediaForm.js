import React, { useState } from "react";

const SocialMediaForm = ({ onAddSocialMedia }) => {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onAddSocialMedia({ name, url });
    setName("");
    setUrl("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h5>Add a new social site for people to review</h5>
      <div>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" value={name} onChange={(event) => setName(event.target.value)} />
      </div>
      <div>
        <label htmlFor="url">URL</label>
        <input type="text" id="url" value={url} onChange={(event) => setUrl(event.target.value)} />
      </div>
      <input type="submit" value="Add" />
    </form>
  );
};

export default SocialMediaForm;