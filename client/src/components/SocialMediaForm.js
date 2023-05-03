import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const SocialMediaForm = () => {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const socialMedia = { name, url, description };
    const response = await fetch("/api/v1/websites", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(socialMedia),
    });
    if (response.ok) {
      setName("");
      setUrl("");
      setDescription("");
      history.push("/");
    } else {
      console.error("Failed to add social media:", response.statusText);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h5 className="form-title">Add a new social site for people to review</h5>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="url">URL</label>
          <input
            type="text"
            id="url"
            value={url}
            onChange={(event) => setUrl(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>
        <input className="submit-btn" type="submit" value="Add" />
      </form>
    </div>
  );
}

export default SocialMediaForm;
