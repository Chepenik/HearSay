import React, { useState } from "react";
import { Redirect } from "react-router-dom";

const SocialMediaForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    url: "",
    description: "",
  });
  const [redirect, setRedirect] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch("/api/v1/websites", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (response.ok) {
      setFormData({
        name: "",
        url: "",
        description: "",
      });
      setRedirect(true);
    } else {
      console.error("Failed to add social media:", response.statusText);
    }
  };

  if (redirect) {
    return <Redirect to="/" />;
  }

  return (
    <form onSubmit={handleSubmit}>
      <h5>Add A New Social Site For People To Review</h5>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        id="name"
        name="name"
        value={formData.name}
        onChange={handleChange}
      />
      <label htmlFor="url">URL</label>
      <input
        type="text"
        id="url"
        name="url"
        value={formData.url}
        onChange={handleChange}
      />
      <label htmlFor="description">Description</label>
      <textarea
        id="description"
        name="description"
        value={formData.description}
        onChange={handleChange}
      />
      <input type="submit" value="Add" />
    </form>
  );
};

export default SocialMediaForm;
